class Config:
    DEBUG = False
    GPT2_MODEL_NAME = "/home/vanthao/WebstormProjects/dacntt2-fiveace/chatbot/app/models/gpt-2"  # Specify the name or path of your pre-trained model
    VinAI_MODEL_NAME = "vinai/phobert-base-v2"
    RETRIEVER_PATH = 'app/models/retriever-reader/retriever_tfidf.pkl'
    READER_PATH = 'app/models/retriever-reader/bilstm_reader_model.pth'
    VOCAB_SIZE = 30522
    EMBEDDING_DIM = 256
    HIDDEN_SIZE = 128
    MAX_SEQ_LENGTH = 64

class DevelopmentConfig(Config):
    DEBUG = True

class ProductionConfig(Config):
    DEBUG = False
    # Add production configurations if needed
