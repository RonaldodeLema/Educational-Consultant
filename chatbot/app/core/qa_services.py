from app.core.utils.retriever import RetrievalQA
from app.core.utils.models import BiLSTMReader
from transformers import AutoTokenizer

import torch

class QuestionAnsweringSystem:
    def __init__(self, retriever_path, reader_path, vocab_size, embedding_dim, hidden_size, max_seq_length):
        self.retriever = RetrievalQA.load_model(retriever_path)
        self.reader = BiLSTMReader(vocab_size, embedding_dim, hidden_size, max_seq_length)

        # Load the saved state dictionary into the reader model
        state_dict = torch.load(reader_path, map_location=torch.device('cpu'))
        self.reader.load_state_dict(state_dict)

        # Set the model to evaluation mode
        self.reader.eval()

        # Initialize the tokenizer
        self.tokenizer = AutoTokenizer.from_pretrained('vinai/phobert-base')

    def answer_question(self, query):
        # Retrieve context using the retriever
        retrieved_context = self.retriever.retrieve_context(query)

        # Tokenize the input using the tokenizer
        inputs = self.tokenizer(query, retrieved_context, return_tensors='pt', max_length=self.reader.max_seq_length, padding='max_length', truncation=True)

        # Forward pass through the reader model
        with torch.no_grad():
            start_pred, end_pred = self.reader(inputs['input_ids'], inputs['attention_mask'])

        start_index = torch.argmax(start_pred)
        end_index = torch.argmax(end_pred)

        # Extract the answer span from the input_ids
        answer_span = inputs['input_ids'][0][start_index:end_index + 1]

        # Convert the answer span back to tokens using the tokenizer
        predicted_answer = self.tokenizer.decode(answer_span)
        scores = self.retriever.score_question(query)

        answer = predicted_answer
        if("</s>" in predicted_answer or "<s>" in predicted_answer):
            answer = predicted_answer.replace(query.replace("?",""),"").replace("</s>","").replace("<s>","").replace("<pad>","").replace("?","").strip()

        return {
            'predicted_answer': answer,
            'context': retrieved_context,
            'score': scores
        }
