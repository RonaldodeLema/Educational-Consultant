from app.core.gpt2_services import GPT2Service

class GenerateTextUseCase:
    def __init__(self):
        self.gpt2_service = GPT2Service()

    def execute(self, input_text):
        # Additional business logic can be added here if needed
        return self.gpt2_service.generate_text(input_text)
