from flask import Flask, current_app, g
from pymongo import MongoClient

class Config:
    DEBUG = False
    RETRIEVER_PATH = 'app/models/default/default_retriever.pkl'
    MODEL_PATH = 'app/models/'
    READER_PATH = 'app/models/default/defau;t_reader_model.pth'
    VOCAB_SIZE = 64001
    EMBEDDING_DIM = 256
    HIDDEN_SIZE = 128
    MAX_SEQ_LENGTH = 64
    MAX_LENGTH = 64
    MONGO_URI = 'mongodb+srv://vanthao000009:h5xEp5fXFWdQlqow@clusterapikey.cdjupaf.mongodb.net/?retryWrites=true&w=majority'
    MONGO_DB = 'clusterapikey'

class DevelopmentConfig(Config):
    DEBUG = True

class ProductionConfig(Config):
    DEBUG = False