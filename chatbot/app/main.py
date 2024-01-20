from app.adapters.controllers import app
from app.config import DevelopmentConfig, ProductionConfig

if __name__ == '__main__':
    # Load the appropriate configuration based on the environment
    app.config.from_object(DevelopmentConfig if app.config['DEBUG'] else ProductionConfig)
    app.run(debug=app.config['DEBUG'])
