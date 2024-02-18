from flask import Flask, request, jsonify, g
from app.core.use_cases import QAUseCase
from app.config import Config
from functools import wraps
from pymongo import MongoClient
from werkzeug.security import generate_password_hash, check_password_hash
import secrets
from datetime import datetime, timedelta
import pandas as pd
import os
from flask_cors import CORS
app = Flask(__name__)
app.config.from_object(Config)

def get_db():
    if 'db' not in g:
        client = MongoClient(app.config['MONGO_URI'])
        g.db = client[app.config['MONGO_DB']]
    return g.db

def get_user_from_token(token):
    db = get_db()
    user_data = db['users'].find_one({'api_key': token})
    return user_data

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'message': 'Token is missing'}), 401

        user = get_user_from_token(token)
        if not user:
            return jsonify({'message': 'Token is invalid'}), 401

        g.user = user
        return f(*args, **kwargs)

    return decorated

def authenticate_user(username, password):
    db = get_db()
    existing_user = db['users'].find_one({'username': username})
    if not existing_user or not check_password_hash(existing_user['password'], password):
        return None  # User not found or incorrect password

    return existing_user['api_key']

def rate_limit_exceeded(username, limit_collection, limit_duration, max_limit):
    db = get_db()
    limit_time = datetime.utcnow() - limit_duration
    record = db[limit_collection].find_one({
        'username': username,
        'timestamp': {'$gt': limit_time}
    })

    if record:
        # Check if the timestamp is more than 1 hour ago
        if record['timestamp'] < (datetime.utcnow() - timedelta(hours=1)):
            # If more than 1 hour ago, reset word_count to 0
            db[limit_collection].update_one(
                {'_id': record['_id']},
                {'$set': {'word_count': 0, 'timestamp': datetime.utcnow()}}
            )
            return False
        else:
            # Check if word_count exceeds the max_limit
            return record['word_count'] >= max_limit
    else:
        return False

def update_word_limit(username, limit_collection, word_count):
    db = get_db()
    existing_record = db[limit_collection].find_one({'username': username})
    
    if existing_record:
        # If the record exists, update the word count and timestamp
        new_word_count = existing_record['word_count'] + word_count
        db[limit_collection].update_one(
            {'_id': existing_record['_id']},
            {'$set': {'word_count': new_word_count, 'timestamp': datetime.utcnow()}}
        )
    else:
        # If the record does not exist, insert a new record
        db[limit_collection].insert_one({'username': username, 'timestamp': datetime.utcnow(), 'word_count': word_count})

@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    repassword = data.get('repassword')

    # Check if the passwords match
    if password != repassword:
        return jsonify({'message': 'Passwords do not match'}), 400

    # Check if the username is already taken
    if get_db()['users'].find_one({'username': username}):
        return jsonify({'message': 'Username is already taken'}), 400

    hashed_password = generate_password_hash(password, method='pbkdf2:sha256')
    api_key = secrets.token_urlsafe(32)

    db = get_db()
    db['users'].insert_one({'username': username, 'password': hashed_password, 'api_key': api_key})

    return jsonify({'message': 'User registered successfully'}), 200


@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    db = get_db()
    user = db['users'].find_one({'username': username})

    if user and check_password_hash(user['password'], password):

        return jsonify({'message': 'Login successful', 'user': {
            'username': user['username'],
            'api_key': user['api_key'],
            'full_name': user.get('full_name', ''),
            'email': user.get('email', ''),
            'phone': user.get('phone', ''),
            'address': user.get('address', '')
        }}), 200
    else:
        return jsonify({'message': 'Invalid credentials'}), 401

@token_required
@app.route('/api/update_profile', methods=['PUT'])
def update_profile():
    data = request.get_json()
    username = data.get('username')
    api_key = data.get('api_key')

    # Verify the user with the provided username and API key
    user = get_db()['users'].find_one({'username': username, 'api_key': api_key})

    if not user:
        return jsonify({'message': 'Invalid credentials'}), 401

    # Update additional user profile information
    full_name = data.get('full_name')
    email = data.get('email')
    phone = data.get('phone')
    address = data.get('address')

    update_data = {}

    if full_name:
        update_data['full_name'] = full_name
    if email:
        update_data['email'] = email
    if phone:
        update_data['phone'] = phone
    if address:
        update_data['address'] = address

    get_db()['users'].update_one({'username': username, 'api_key': api_key}, {'$set': update_data})

    return jsonify({'message': 'Profile updated successfully',
                    'status_code':200}), 200

@app.route('/api/get-api-key', methods=['POST'])
def get_api_key():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    api_key = authenticate_user(username, password)
    if api_key:
        return jsonify({'api_key': api_key}), 200
    else:
        return jsonify({'message': 'Invalid credentials'}), 401
    
@app.route('/api/qa-system', methods=['POST'])
@token_required
def qa():
    data = request.get_json()
    question = data.get('question', '')

    # Check if the word generation limit is exceeded for the current user
    if rate_limit_exceeded(g.user['username'], 'word_generation_limits', timedelta(hours=1), 10000):
        return jsonify({'message': 'Word generation limit exceeded in 1 hour'}), 429
    
    model_path = Config.MODEL_PATH + g.user['username']
    org_name = "default"
    if os.path.exists(model_path):
        org_name = g.user['username']

    use_case = QAUseCase(organization_name=org_name)
    answer = use_case.execute(question)

    # Count the number of words in the generated answer
    word_count = len(answer['predicted_answer'].split())

    # Increase the word count in the word generation limit
    update_word_limit(g.user['username'], 'word_generation_limits', word_count)

    # Save the question, answer, and context in MongoDB
    record_qa(question, answer['predicted_answer'], answer.get('context', ''), g.user['username'], answer.get('score', 0))

    return jsonify({'answer': {
        'predicted_answer': answer['predicted_answer'],
        'score': answer.get('score', 0)
    }})

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in {'csv'}

@app.route('/api/fine-tune', methods=['POST'])
@token_required
def fine_tune():
    if 'data_csv' not in request.files:
        return jsonify({'message': 'No file part'}), 400

    file = request.files['data_csv']

    if file.filename == '':
        return jsonify({'message': 'No selected file'}), 400

    if file and allowed_file(file.filename):
        df = pd.read_csv(file, encoding='utf-8')
        required_columns = ['question', 'answer', 'context']
        if all(col in df.columns for col in required_columns):
            use_case = QAUseCase(organization_name=g.user['username'])
            message = use_case.fine_tuning(df)
            return jsonify({'message': message}), 200
        else:
            return jsonify({'message': "five csv has the required columns: 'question', 'answer', 'context'"}), 400
    else:
        return jsonify({'message': 'Invalid file type'}), 400


def record_qa(question, answer, context, username, score):
    db = get_db()
    qa_collection = db['qa_records']

    qa_record = {
        'username': username,
        'question': question,
        'answer': answer,
        'context': context,
        'score': score,
        'timestamp': datetime.utcnow()
    }

    qa_collection.insert_one(qa_record)
