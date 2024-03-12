from app.core.qa_services import QAGPT2, QABiLSTM, QAPhoBert, QuestionAnsweringSystem
from app.config import Config
from app.core.utils.finetuning import FineTuningReader, FineTuningRetrieval
from transformers import pipeline
import os

from app.core.utils.retriever import RetrievalQA
class QAUseCase:
    def __init__(self,organization_name="default"):
         self.organization_name = organization_name

    def execute(self, question):
        self.reader_path = Config.MODEL_PATH+self.organization_name+"/" + self.organization_name + '_reader_model.pth'
        self.retriever_path = Config.MODEL_PATH+self.organization_name+"/" + self.organization_name + '_retriever.pkl'
        self.questionAswering = QuestionAnsweringSystem(self.retriever_path, self.reader_path, Config.VOCAB_SIZE, Config.EMBEDDING_DIM, Config.HIDDEN_SIZE, Config.MAX_SEQ_LENGTH)

        return self.questionAswering.answer_question(question)
    
    def executev2(self, question, mode_retriever, mode_reader):
        if mode_retriever == "tfidf":
            self.retriever = RetrievalQA.load_model(Config.TFIDF_PATH)
        else:
            self.retriever = RetrievalQA.load_model(Config.BM25_PATH)
        context = self.retriever.retrieve_context(question)

        if mode_reader == "bilstm":
            self.QASystem = QABiLSTM(Config.VOCAB_SIZE, Config.EMBEDDING_DIM, Config.HIDDEN_SIZE, Config.MAX_SEQ_LENGTH)
            start,end,answer = self.QASystem.question_answering(question, context)
            return {
                'answer': answer,
                'start': start,
                'end': end,
                'score': self.retriever.calculate_similarity_score(question,context),
            }
        elif mode_reader == "phobert":
            self.QASystem = QAPhoBert()
            start,end,answer = self.QASystem.question_answering(question, context)
            return {
                'answer': answer,
                'start': start,
                'end': end,
                'score': self.retriever.calculate_similarity_score(question,context),

            }
        
        elif mode_reader == "gpt2":
            self.QASystem = QAGPT2()
            return {
                'answer': self.QASystem.generator_answer(question),
                'start': "None",
                'end': "None",
                'score': self.retriever.calculate_similarity_score(question,self.QASystem.generator_answer(question))
            }

        else:
            vimrc_qa = pipeline(task="question-answering", model=Config.VIMRC_NAME,username = Config.USERNAME, token=Config.TOKEN)
            return vimrc_qa(question, context)

    
    def fine_tuning(self, new_df):
        os.makedirs(Config.MODEL_PATH+self.organization_name +"/" , exist_ok=True)
        self.fineTuningReader = FineTuningReader(self.organization_name)
        self.fineTuningRetriever = FineTuningRetrieval(self.organization_name)
        self.fineTuningReader.fine_tune(new_df)
        self.fineTuningRetriever.fine_tune(new_df)