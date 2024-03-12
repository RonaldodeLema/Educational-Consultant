from app.core.utils.retriever import RetrievalQA
from app.core.utils.models import BiLSTMReader
from transformers import AutoTokenizer, AutoModelForQuestionAnswering, GPT2LMHeadModel, GPT2Tokenizer
from app.config import Config

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

def processing_predicted_answer(answer):
    if("</s>" in answer or "<s>" in answer):
        answer = answer.replace("</s>","").replace("<s>","").replace("<pad>","").strip()
    return answer

class QABiLSTM:
    def __init__(self, vocab_size, embedding_dim, hidden_size, max_seq_length):
        self.reader = BiLSTMReader(vocab_size, embedding_dim, hidden_size, max_seq_length)
        state_dict = torch.load(Config.BILSTM_PATH, map_location=torch.device('cpu'))
        self.reader.load_state_dict(state_dict)
        # Set the model to evaluation mode
        self.reader.eval()

        # Initialize the tokenizer
        self.tokenizer = AutoTokenizer.from_pretrained(Config.BERT_NAME)
    
    def question_answering(self, query, context):
        # Tokenize the input using the tokenizer
        inputs = self.tokenizer(query, context, return_tensors='pt', max_length=self.reader.max_seq_length, padding='max_length', truncation=True)

        # Forward pass through the reader model
        with torch.no_grad():
            start_pred, end_pred = self.reader(inputs['input_ids'], inputs['attention_mask'])

        start_index = torch.argmax(start_pred)
        end_index = torch.argmax(end_pred)
        start_index_int = start_index.item()
        end_index_int = end_index.item()

        answer_span = inputs['input_ids'][0][start_index:end_index + 1]
        

        # Convert the answer span back to tokens using the tokenizer
        predicted_answer = self.tokenizer.decode(answer_span)
        return start_index_int,end_index_int,processing_predicted_answer(predicted_answer)

class QAPhoBert:
    def __init__(self):
        self.tokenizer = AutoTokenizer.from_pretrained(Config.PHOBERT_PATH)
        self.model = AutoModelForQuestionAnswering.from_pretrained(Config.PHOBERT_PATH)
    def question_answering(self, question, context):
        encoded = self.tokenizer(question, context, return_tensors="pt", padding=True, truncation=True)
        self.model.eval()
        with torch.no_grad():
            outputs = self.model(**encoded)

        start_logits = outputs.start_logits
        end_logits = outputs.end_logits

        start_idx = torch.argmax(start_logits)
        end_idx = torch.argmax(end_logits) + 1
        start_index_int = start_idx.item()
        end_index_int = end_idx.item()
        answer_tokens = encoded["input_ids"][0][start_idx:end_idx]
        answer = self.tokenizer.convert_tokens_to_string(self.tokenizer.convert_ids_to_tokens(answer_tokens))
        return start_index_int,end_index_int,processing_predicted_answer(answer)
    
class QAGPT2:
    def __init__(self):
        self.tokenizer = GPT2Tokenizer.from_pretrained(Config.GPT2_PATH)
        self.model = GPT2LMHeadModel.from_pretrained(Config.GPT2_PATH)

    def generator_answer(self, question):
        input_ids = self.tokenizer.encode(question, return_tensors="pt")
        max_length = Config.MAX_LENGTH
        output = self.model.generate(input_ids,pad_token_id=self.tokenizer.eos_token_id,
                                   do_sample=True,
                                   max_length=max_length,
                                   min_length=max_length,
                                   top_k=40,
                                   num_beams=5,
                                   early_stopping=True,
                                   no_repeat_ngram_size=2,
                                   num_return_sequences=3)
        answer = self.tokenizer.decode(output[0], skip_special_tokens=True)
        return answer