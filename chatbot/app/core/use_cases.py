from app.core.qa_services import QuestionAnsweringSystem
from app.config import Config

class QAUseCase:
    def __init__(self):
        self.questionAswering = QuestionAnsweringSystem(Config.RETRIEVER_PATH, Config.READER_PATH, Config.VOCAB_SIZE, Config.EMBEDDING_DIM, Config.HIDDEN_SIZE, Config.MAX_SEQ_LENGTH)

    def execute(self, question):
        return self.questionAswering.answer_question(question)
