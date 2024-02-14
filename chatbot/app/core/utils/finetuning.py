import pandas as pd
from app.core.utils.retriever import RetrievalQA
from app.core.utils.models import BiLSTMReader
from app.config import Config
from transformers import AutoTokenizer
from torch.utils.data import DataLoader,Dataset
import torch
class FineTuningRetrieval:
    def __init__(self, organization_name):
        self.loaded_model = RetrievalQA.load_model(Config.RETRIEVER_PATH)
        self.organization_name = organization_name

    def fine_tune(self, new_df):
        self.loaded_model.update_model(new_df.question.tolist(), new_df.context.tolist())
        self.loaded_model.save_model(Config.MODEL_PATH + self.organization_name + '_retriever.pkl')
        return 'Fine-tuning successful'
    
class FineTuningReader:
    def __init__(self, organization_name):
        self.load_model = BiLSTMReader(Config.VOCAB_SIZE, Config.EMBEDDING_DIM, Config.HIDDEN_SIZE, Config.MAX_SEQ_LENGTH)
        self.organization_name = organization_name

        state_dict = torch.load(Config.READER_PATH, map_location=torch.device('cpu'))
        self.load_model.load_state_dict(state_dict)
        self.load_model.eval()
        self.tokenizer = AutoTokenizer.from_pretrained('vinai/phobert-base')

    def fine_tune(self, new_data_df,num_epochs=25, batch_size=64, lr=0.001):
        train_dataset = QADataset(new_data_df.question.tolist(), new_data_df.context.tolist(), new_data_df.answer.tolist(), self.tokenizer, Config.MAX_LENGTH)

        train_dataloader = DataLoader(train_dataset, batch_size=batch_size, shuffle=True)
        criterion = torch.nn.CrossEntropyLoss()
        optimizer = torch.optim.Adam(self.load_model.parameters(), lr=0.001)

        device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        self.load_model.to(device)

        for epoch in range(num_epochs):
            for batch in train_dataloader:
                input_ids, attention_mask, start_positions, end_positions = [tensor.to(device) for tensor in batch]
                # Forward pass
                start_pred, end_pred = self.load_model(input_ids, attention_mask)
                # Compute the loss
                start_loss = criterion(start_pred, start_positions)
                end_loss = criterion(end_pred, end_positions)
                total_loss = start_loss + end_loss

                # Backward pass
                optimizer.zero_grad()
                total_loss.backward()
                optimizer.step()
            print(f'Epoch {epoch + 1}/{num_epochs}, Loss: {total_loss.item()}')

        # Save the trained model if needed
        torch.save(self.load_model.state_dict(), Config.MODEL_PATH+self.organization_name+"/" + self.organization_name + '_reader_model.pth')

        return 'Fine-tuning successful'
    

class QADataset(Dataset):
    def __init__(self, questions, contexts, answers, tokenizer, max_length):
        self.questions = questions
        self.contexts = contexts
        self.answers = answers
        self.tokenizer = tokenizer
        self.max_length = max_length

    def __len__(self):
        return len(self.questions)

    def __getitem__(self, idx):
        question = self.questions[idx]
        context = self.contexts[idx]
        answer = self.answers[idx]

        # Tokenize question and context
        inputs = self.tokenizer(question, context, return_tensors='pt', max_length=self.max_length, padding='max_length', truncation=True)

        # Extract start and end positions of the answer span
        start_token_id = self.tokenizer(answer, return_tensors='pt')['input_ids'][0][1].item()
        end_token_id = self.tokenizer(answer, return_tensors='pt')['input_ids'][0][-2].item()

        input_ids = inputs['input_ids'].squeeze().tolist()

        # Check if start_token_id and end_token_id are in the tokenized input
        if start_token_id in input_ids and end_token_id in input_ids:
            start_position = torch.tensor([input_ids.index(start_token_id)])
            end_position = torch.tensor([input_ids.index(end_token_id)])
        else:
            # Handle the case where start or end tokens are not present in the input
            start_position = torch.tensor([0])
            end_position = torch.tensor([len(input_ids) - 1])

        return inputs['input_ids'].squeeze(), inputs['attention_mask'].squeeze(), start_position, end_position
