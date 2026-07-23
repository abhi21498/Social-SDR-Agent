class DecisionMaker:
    """Select the best candidate or escalate to human."""
    def __init__(self, confidence_threshold: float = 0.6):
        self.confidence_threshold = confidence_threshold

    def decide(self, candidates):
        """
        Choose the candidate with highest confidence.
        If none meet the threshold, return a defer-to-human decision.
        """
        if not candidates:
            return {
                "action": "defer_to_human",
                "reason": "no_candidates",
                "confidence": 0.0
            }
        # sort by confidence descending
        sorted_cands = sorted(candidates, key=lambda c: c.get("confidence", 0), reverse=True)
        best = sorted_cands[0]
        if best.get("confidence", 0) < self.confidence_threshold:
            return {
                "action": "defer_to_human",
                "reason": "low_confidence",
                "confidence": best.get("confidence", 0)
            }
        return {
            "action": best.get("action", "unknown"),
            "description": best.get("description", ""),
            "confidence": best.get("confidence", 0),
            "source": best.get("source", "")
        }