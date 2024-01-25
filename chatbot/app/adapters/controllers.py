from flask import Flask, request, jsonify, g
from app.core.use_cases import QAUseCase
from app.config import Config
from functools import wraps
from pymongo import MongoClient
from werkzeug.security import generate_password_hash, check_password_hash
import secrets
from datetime import datetime, timedelta

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

    if get_db()['users'].find_one({'username': username}):
        return jsonify({'message': 'Username is already taken'}), 400

    hashed_password = generate_password_hash(password, method='pbkdf2:sha256')
    api_key = secrets.token_urlsafe(32)

    db = get_db()
    db['users'].insert_one({'username': username, 'password': hashed_password, 'api_key': api_key})

    return jsonify({'message': 'User registered successfully', 'api_key': api_key}), 201

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
    if rate_limit_exceeded(g.user['username'], 'word_generation_limits', timedelta(hours=1), 70):
        return jsonify({'message': 'Word generation limit exceeded in 1 hour'}), 429

    use_case = QAUseCase()
    answer = use_case.execute(question)

    user_id_str = str(g.user.get('_id')) if g.user.get('_id') else None

    # Count the number of words in the generated answer
    print(answer['predicted_answer'])
    word_count = len(answer['predicted_answer'].split())

    # Increase the word count in the word generation limit
    update_word_limit(g.user['username'], 'word_generation_limits', word_count)

    return jsonify({'answer': answer, 'user': {'_id': user_id_str}})

if __name__ == '__main__':
    app.run(debug=app.config['DEBUG'])
