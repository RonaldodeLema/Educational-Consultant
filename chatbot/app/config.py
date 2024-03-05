class Config:
    DEBUG = False
    RETRIEVER_PATH = './app/models/default/default_retriever.pkl'
    MODEL_PATH = './app/models/'
    READER_PATH = './app/models/default/defaut_reader_model.pth'

    VOCAB_SIZE = 64001
    EMBEDDING_DIM = 256
    HIDDEN_SIZE = 128
    MAX_SEQ_LENGTH = 64
    MAX_LENGTH = 64
    MONGO_URI = 'mongodb+srv://vanthao000009:h5xEp5fXFWdQlqow@clusterapikey.cdjupaf.mongodb.net/?retryWrites=true&w=majority'
    MONGO_DB = 'clusterapikey'


    TFIDF_PATH = './app/models/tfidf_retriever.pkl'
    BM25_PATH = './app/models/bm25_retriever.pkl'

    BILSTM_PATH = './app/models/bilstm_reader.pth'
    PHOBERT_PATH = './app/models/phobert-finetune'
    GPT2_PATH = './app/models/gpt-2'
    VIMRC_PATH = './app/models/vimrc'

    BERT_NAME = 'vinai/phobert-base'
    GPT2_NAME = 'NlpHUST/gpt2-vietnamese'
    VIMRC_NAME = 'nguyenvulebinh/vi-mrc-base'

    USERNAME = 'fiveace'
    TOKEN = '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'
class DevelopmentConfig(Config):
    DEBUG = True

class ProductionConfig(Config):
    DEBUG = False