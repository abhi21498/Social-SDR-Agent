class Intent:
    def __init__(self):
        self.intents = []

    def register(self, intent: str):
        self.intents.append(intent)