from app.adapters.controllers import app
from app.config import DevelopmentConfig, ProductionConfig
from app.core.utils.retriever import RetrievalQA

if __name__ == "__main__":
    app.config.from_object(
        DevelopmentConfig if app.config["DEBUG"] else ProductionConfig
    )
    app.run(debug=app.config["DEBUG"])
