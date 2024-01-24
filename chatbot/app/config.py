class Config:
    DEBUG = False
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
