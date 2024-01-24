from flask import Flask, request, jsonify
from app.core.use_cases import QAUseCase
from app.config import Config
app = Flask(__name__)
app.config.from_object(Config)

@app.route('/api/qa-system', methods=['POST'])
def qa():
    data = request.get_json()
    input_text = data.get('question', '')
    use_case = QAUseCase()
    answer = use_case.execute(input_text)
    return jsonify({'answer:': answer})
if __name__ == '__main__':
    app.run(debug=app.config['DEBUG'])
