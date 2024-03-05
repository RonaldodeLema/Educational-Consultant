
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import pickle
import numpy as np
from rank_bm25 import BM25Okapi
from underthesea import word_tokenize

class RetrievalQA:
    def __init__(self, questions, contexts, model_type='tfidf'):
        self.questions = questions
        self.contexts = contexts
        self.model_type = model_type

        if self.model_type == 'tfidf':
            self.vectorizer = TfidfVectorizer()
            self.question_embeddings = self.vectorizer.fit_transform(self.questions)

        elif self.model_type == 'bm25':
            self.tokenized_docs = [word_tokenize(doc) for doc in contexts]
            self.bm25 = BM25Okapi(self.tokenized_docs)

    def retrieve_context(self, query):
        query_embedding = None
        if self.model_type == 'tfidf':
            query_embedding = self.vectorizer.transform([query])
            similarities = cosine_similarity(query_embedding, self.question_embeddings).flatten()
            most_similar_index = np.argmax(similarities)
            return self.contexts[most_similar_index]

        elif self.model_type == 'bm25':
            tokenized_query = word_tokenize(query)
            scores = self.bm25.get_scores(tokenized_query)
            most_similar_index = np.argmax(scores)
            return self.contexts[most_similar_index]

    def score_question(self, input_question):
        if self.model_type == 'tfidf':
            input_question_embedding = self.vectorizer.transform([input_question])
            similarities = cosine_similarity(input_question_embedding, self.question_embeddings).flatten()
            max_similarity = np.max(similarities)
            return max_similarity
        elif self.model_type == 'bm25':
            tokenized_input_question = word_tokenize(input_question)
            scores = self.bm25.get_scores(tokenized_input_question)
            max_similarity = np.max(scores)
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
                    self.questions[most_similar_index] = new_question
                    self.contexts[most_similar_index] = new_context
                else:
                    self.questions.append(new_question)
                    self.contexts.append(new_context)

            self.question_embeddings = self.vectorizer.fit_transform(self.questions)
        elif self.model_type == 'bm25':
            for new_question, new_context in zip(new_questions, new_contexts):
                self.questions.append(new_question)
                self.contexts.append(new_context)

            self.tokenized_docs = [word_tokenize(doc) for doc in self.contexts]
            self.bm25 = BM25Okapi(self.tokenized_docs)
    

    def calculate_similarity_score(self, question, context):
        if self.model_type == 'tfidf':
            query_embedding = self.vectorizer.transform([question])
            context_embedding = self.vectorizer.transform([context])
            similarity = cosine_similarity(query_embedding, context_embedding).flatten()[0]
            return similarity

        elif self.model_type == 'bm25':
            tokenized_query = word_tokenize(question)
            tokenized_context = word_tokenize(context)
            score = BM25Okapi([tokenized_context]).get_scores(tokenized_query)[0]
            return score

    def save_model(self, filename):
        with open(filename, 'wb') as file:
            pickle.dump(self, file)

    @classmethod
    def load_model(cls, filename):
        with open(filename, 'rb') as file:
            model = pickle.load(file)
        return model