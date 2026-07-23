import json
import os
from datetime import datetime, timezone

class KnowledgeUpdater:
    """Persist decisions and update internal knowledge (simple file‑based log)."""
    def __init__(self, log_path: str = "knowledge.log"):
        self.log_path = log_path
        os.makedirs(os.path.dirname(log_path) or '.', exist_ok=True)

    def record(self, decision: dict, context: dict = None):
        """Append a JSON line with timestamp, decision, and optional context."""
        entry = {
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "decision": decision,
            "context": context or {}
        }
        with open(self.log_path, 'a') as f:
            f.write(json.dumps(entry) + "\n")

    def get_recent(self, limit: int = 10):
        """Return the most recent `limit` entries."""
        if not os.path.exists(self.log_path):
            return []
        with open(self.log_path, 'r') as f:
            lines = f.readlines()
        return [json.loads(line.strip()) for line in lines[-limit:]]

    def clear(self):
        """Erase the log (mainly for testing)."""
        if os.path.exists(self.path):
            open(self.path, 'w').close()