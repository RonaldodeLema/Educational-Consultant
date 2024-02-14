from app.core.qa_services import QuestionAnsweringSystem
from app.config import Config
from app.core.utils.finetuning import FineTuningReader, FineTuningRetrieval
import pandas as pd
import os
class QAUseCase:
    def __init__(self,organization_name="default"):
        self.reader_path = Config.MODEL_PATH+organization_name+"/" + organization_name + '_reader_model.pth'
        self.retriever_path = Config.MODEL_PATH+organization_name+"/" + organization_name + '_retriever.pkl'
        self.questionAswering = QuestionAnsweringSystem(self.retriever_path, self.reader_path, Config.VOCAB_SIZE, Config.EMBEDDING_DIM, Config.HIDDEN_SIZE, Config.MAX_SEQ_LENGTH)
        self.organization_name = organization_name

    def execute(self, question):
        return self.questionAswering.answer_question(question)
    
    def fine_tuning(self, data_csv):
        os.makedirs(Config.MODEL_PATH+self.organization_name, exist_ok=True)
        new_df = pd.read_csv(data_csv)
        self.fineTuningReader = FineTuningReader(self.organization_name)
        self.fineTuningRetriever = FineTuningRetrieval(self.organization_name)
        self.fineTuningReader.fine_tune(new_df)
        self.fineTuningRetriever.fine_tune(new_df)