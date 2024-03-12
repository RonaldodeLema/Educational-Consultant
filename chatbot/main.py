from app.adapters.controllers import app
from app.config import DevelopmentConfig, ProductionConfig
from flask_cors import CORS
from app.core.utils.retriever import RetrievalQA

if __name__ == '__main__':
    app.config.from_object(DevelopmentConfig if app.config['DEBUG'] else ProductionConfig)
    CORS(app, resources={r"/api/*": {"origins": ["http://localhost:1119", "http://localhost:4000"]}}), 
    app.run(debug=app.config['DEBUG'],host='0.0.0.0')