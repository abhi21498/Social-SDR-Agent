class ReasoningEngine:
    """Very simple reasoning step – in a real system this would plug in a rule engine or ML model."""
    def __init__(self):
        pass

    def infer(self, intent, assumptions, evidence):
        """
        Produce a list of candidate decisions.
        For now we just return a single generic candidate based on the latest intent.
        """
        candidates = []
        if intent.intents:
            latest = intent.intents[-1]["text"]
            candidates.append({
                "action": "process_intent",
                "description": f"Process intent: {latest}",
                "confidence": 0.8,
                "source": "intent"
            })
        # could also look at evidence, etc.
        return candidates