import torch

class BiLSTMReader(torch.nn.Module):
    def __init__(self, vocab_size, embedding_dim, hidden_size, max_seq_length):
        super(BiLSTMReader, self).__init__()
        self.max_seq_length = max_seq_length

        # Word Embeddings
        self.embedding_layer = torch.nn.Embedding(vocab_size, embedding_dim)

        # Bidirectional LSTM
        self.bilstm_layer = torch.nn.LSTM(embedding_dim, hidden_size, bidirectional=True, batch_first=True)

        # Question Encoder
        self.question_encoder = torch.nn.Linear(embedding_dim, embedding_dim)

        # Answer Span Prediction
        self.start_pred_layer = torch.nn.Linear(hidden_size * 2, 1)
        self.end_pred_layer = torch.nn.Linear(hidden_size * 2, 1)

    def forward(self, context, question):
        # Word Embeddings for Context
        context_emb = self.embedding_layer(context)

        # Bidirectional LSTM on Context
        context_lstm, _ = self.bilstm_layer(context_emb)

        # Weighted Sum for Question
        question_emb = self.embedding_layer(question)
        question_weight = torch.sum(question_emb, dim=1)
        question_weight = question_weight.unsqueeze(1)
        question_encoded = torch.sum(question_emb * question_weight, dim=1)
        question_encoded = self.question_encoder(question_encoded)

        # Start and End Prediction
        start_pred = self.start_pred_layer(context_lstm)
        end_pred = self.end_pred_layer(context_lstm)

        return start_pred, end_pred