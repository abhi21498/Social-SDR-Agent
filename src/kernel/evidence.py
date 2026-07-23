import json
import os
from datetime import datetime, timezone

class EvidenceLog:
    """Append‑only log of observations (signals, outcomes, etc.)."""
    def __init__(self, path: str = "evidence.log"):
        self.path = path
        # ensure directory exists
        os.makedirs(os.path.dirname(path) or '.', exist_ok=True)

    def add(self, ev_type: str, data: dict):
        """Add an evidence entry."""
        entry = {
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "type": ev_type,
            "data": data
        }
        with open(self.path, 'a') as f:
            f.write(json.dumps(entry) + "\n")

    def get_all(self):
        """Return all entries as a list of dicts."""
        if not os.path.exists(self.path):
            return []
        with open(self.path, 'r') as f:
            lines = f.readlines()
        return [json.loads(line.strip()) for line in lines if line.strip()]

    def clear(self):
        """Clear the log file (mainly for testing)."""
        if os.path.exists(self.path):
            open(self.path, 'w').close()