from flask import Flask, request, jsonify
from app.core.use_cases import GenerateTextUseCase
from app.config import Config

app = Flask(__name__)
app.config.from_object(Config)

@app.route('/generate_text', methods=['POST'])
def generate_text():
    data = request.get_json()
    input_text = data.get('input_text', '')

    # Use case interaction
    use_case = GenerateTextUseCase()
    generated_text = use_case.execute(input_text)

    return jsonify({'generated_text': generated_text})

if __name__ == '__main__':
    app.run(debug=app.config['DEBUG'])
