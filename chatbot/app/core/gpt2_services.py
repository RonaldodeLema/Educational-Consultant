from transformers import GPT2LMHeadModel, GPT2Tokenizer
from app.config import Config

class GPT2Service:
    def __init__(self):
        self.model = GPT2LMHeadModel.from_pretrained(Config.GPT2_MODEL_NAME)
        self.tokenizer = GPT2Tokenizer.from_pretrained(Config.GPT2_MODEL_NAME)

    def generate_text(self, input_text):
        input_ids = self.tokenizer.encode(input_text, return_tensors='pt')
        output = self.model.generate(input_ids, max_length=100, num_return_sequences=1)
        generated_text = self.tokenizer.decode(output[0], skip_special_tokens=True)
        return generated_text
