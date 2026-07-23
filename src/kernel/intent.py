class Intent:
    """Registry of intents expressed by the system."""
    def __init__(self):
        self.intents = []  # list of dicts: {"text": str, "timestamp": str}

    def register(self, intent_text: str):
        """Register a new intent."""
        import datetime
        self.intents.append({
            "text": intent_text,
            "timestamp": datetime.datetime.now(datetime.timezone.utc).isoformat()
        })

    def list(self):
        """Return a copy of the intents list."""
        return list(self.intents)

    def clear(self):
        """Clear all intents (used for testing)."""
        self.intents.clear()