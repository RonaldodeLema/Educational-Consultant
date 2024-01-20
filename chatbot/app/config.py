class Config:
    DEBUG = False
    GPT2_MODEL_NAME = "/home/vanthao/WebstormProjects/dacntt2-fiveace/chatbot/app/models/gpt-2"  # Specify the name or path of your pre-trained model

class DevelopmentConfig(Config):
    DEBUG = True

class ProductionConfig(Config):
    DEBUG = False
    # Add production configurations if needed
