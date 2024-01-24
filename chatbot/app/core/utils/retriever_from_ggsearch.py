from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from gg_search import GoogleSearch
import re
from nltk.tokenize import sent_tokenize
from stopwordsiso import stopwords
import string

def retrieve_documents(query, documents, vectorizer, tfidf_matrix, stop_words):
    preprocessed_query = preprocess_text(query, stop_words)
    query_vector = vectorizer.transform([preprocessed_query])
    cosine_similarities = cosine_similarity(query_vector, tfidf_matrix).flatten()
    document_indices = cosine_similarities.argsort()[::-1]
    top_k = 3
    top_documents = [documents[i] for i in document_indices[:top_k]]
    return top_documents

def retrieve_sentences(query, documents, vectorizer, tfidf_matrix, stop_words):
    preprocessed_query = preprocess_text(query, stop_words)
    query_vector = vectorizer.transform(preprocessed_query)
    cosine_similarities = cosine_similarity(query_vector, tfidf_matrix).flatten()
    sentence_indices = cosine_similarities.argsort()[::-1]
    top_k = 5
    top_sentences = [documents[i] for i in sentence_indices[:top_k]]
    return top_sentences


def preprocess_text(text, stop_words):
    sentences = sent_tokenize(text)
    translator = str.maketrans("", "", string.punctuation)
    preprocessed_sentences = [sentence.translate(translator).lower() for sentence in sentences]
    preprocessed_sentences = [' '.join([word for word in sentence.split() if word not in stop_words]) for sentence in preprocessed_sentences]
    return preprocessed_sentences

def main():
    gg_search = GoogleSearch()
    user_query = "ai la nguoi giau nhat vietnam?"
    links,documents = gg_search.search(user_query)
    documents = [re.sub(r'\n+', ' ', document) for document in documents]
    stop_words_vietnamese = set(stopwords('vi'))
    all_documents = ' '.join(documents)
    documents_sentences = sent_tokenize(all_documents)
    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform(documents_sentences)
    top_k_sentences = retrieve_sentences(user_query, documents_sentences, vectorizer, tfidf_matrix, stop_words_vietnamese)
    top_k_documents = retrieve_documents(user_query, documents, vectorizer, tfidf_matrix, stop_words_vietnamese)
    print("Top retrieved sentences:")
    for idx, doc in enumerate(top_k_sentences, 1):
        print(f"{idx}. {doc}")
    print("Top retrieved documents:")
    for idx, doc in enumerate(top_k_documents, 1):
        print(f"{idx}. {doc}")
if __name__ == "__main__":
    main()