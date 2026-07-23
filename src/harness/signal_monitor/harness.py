import time
import hashlib
from typing import List, Dict, Any
from src.wiring.event_bus import publish

def get_signals() -> List[Dict[str, Any]]:
    """
    Retrieve a list of signal events from monitored sources.
    For MVP, returns a static mock signal.
    """
    mock_signal = {
        "id": "sig_001",
        "source": "twitter",
        "author": "example_user",
        "content": "Just hired 5 new engineers, looking for more! #hiring",
        "timestamp": "2026-07-19T12:00:00Z",
        "score": 0.85,
        "tags": ["hiring", "engineering"]
    }
    # Publish the signal event
    publish("signal_monitor", mock_signal)
    return [mock_signal]

__all__ = ["get_signals"]