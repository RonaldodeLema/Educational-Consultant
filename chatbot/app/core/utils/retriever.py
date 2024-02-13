
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import pickle
import numpy as np

class RetrievalQA:
    def __init__(self, questions, contexts, model_type='tfidf'):
        self.questions = questions
        self.contexts = contexts
        self.model_type = model_type

        if self.model_type == 'tfidf':
            self.vectorizer = TfidfVectorizer()
            self.question_embeddings = self.vectorizer.fit_transform(self.questions)
    def _encode_questions(self):
        question_inputs = self.tokenizer(self.questions, padding=True, truncation=True, return_tensors="pt", max_length=512)
        question_outputs = self.bert_model(**question_inputs)
        self.question_embeddings = question_outputs['last_hidden_state'][:, 0, :].detach().numpy()

    def retrieve_context(self, query):
        query_embedding = None

        if self.model_type == 'tfidf':
            query_embedding = self.vectorizer.transform([query])

        similarities = cosine_similarity(query_embedding, self.question_embeddings).flatten()
        most_similar_index = np.argmax(similarities)

        return self.contexts[most_similar_index]
    
    def score_question(self, input_question):
        input_question_embedding = self.vectorizer.transform([input_question])

        similarities = cosine_similarity(input_question_embedding, self.question_embeddings).flatten()
        max_similarity = np.max(similarities)

        return max_similarity

    def _check_similarity(self, new_question_embedding):
        similarities = cosine_similarity(new_question_embedding, self.question_embeddings).flatten()
        max_similarity = np.max(similarities)
        return max_similarity, np.argmax(similarities)

    def update_model(self, new_questions, new_contexts, similarity_threshold=0.8):
        if self.model_type == 'tfidf':
            for new_question, new_context in zip(new_questions, new_contexts):
                new_question_embedding = self.vectorizer.transform([new_question])

                max_similarity, most_similar_index = self._check_similarity(new_question_embedding)

                if max_similarity >= similarity_threshold:
                    # If similarity is high, overwrite the existing question and context
                    self.questions[most_similar_index] = new_question
                    self.contexts[most_similar_index] = new_context
                else:
                    # If similarity is low, add the new question and context
                    self.questions.append(new_question)
                    self.contexts.append(new_context)

            self.question_embeddings = self.vectorizer.fit_transform(self.questions)

    def save_model(self, filename):
        with open(filename, 'wb') as file:
            pickle.dump(self, file)

    @classmethod
    def load_model(cls, filename):
        with open(filename, 'rb') as file:
            model = pickle.load(file)
        return model