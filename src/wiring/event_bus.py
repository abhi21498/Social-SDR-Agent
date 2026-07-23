"""
Simple event bus (publish-subscribe) for wiring harness outputs to logging/subscribers.
"""
from typing import Callable, Dict, List
import threading

# Import kernel components for logging subscribers
from src.kernel.knowledge_updater import KnowledgeUpdater
from src.kernel.evidence import EvidenceLog

class EventBus:
    def __init__(self):
        self._subscribers: Dict[str, List[Callable]] = {}
        self._lock = threading.RLock()

    def subscribe(self, topic: str, callback: Callable[[dict], None]) -> None:
        """Subscribe a callback to a topic."""
        with self._lock:
            if topic not in self._subscribers:
                self._subscribers[topic] = []
            self._subscribers[topic].append(callback)

    def publish(self, topic: str, data: dict) -> None:
        """Publish data to a topic; all subscribed callbacks are invoked."""
        with self._lock:
            subscribers = self._subscribers.get(topic, []).copy()  # copy to avoid modification during iteration
        for callback in subscribers:
            try:
                callback(data)
            except Exception as e:
                # In a real system, we might log this error
                print(f"Error in event bus subscriber for topic {topic}: {e}")

# Global event bus instance
event_bus = EventBus()

def publish(topic: str, data: dict) -> None:
    """Convenience function to publish to the global event bus."""
    event_bus.publish(topic, data)

def subscribe(topic: str, callback: Callable[[dict], None]) -> None:
    """Convenience function to subscribe to the global event bus."""
    event_bus.subscribe(topic, callback)

# --- Logging Subscribers ---
# We'll create a single KnowledgeUpdater and EvidenceLog instance to reuse.
_knowledge_updater = KnowledgeUpdater(log_path="knowledge.log")
_evidence_log = EvidenceLog(path="evidence.log")

def _knowledge_logger(data: dict) -> None:
    """Log the data as a decision to the knowledge log."""
    # We'll treat the data as a decision record; add a timestamp if not present.
    if "timestamp" not in data:
        from datetime import datetime, timezone
        data = dict(data)  # copy to avoid mutating original
        data["timestamp"] = datetime.now(timezone.utc).isoformat()
    _knowledge_updater.record(data, context={"source": "event_bus"})

def _evidence_logger(data: dict) -> None:
    """Log the data as an evidence entry."""
    # We'll add a type field to indicate it's a harness output.
    enriched = dict(data)
    enriched.setdefault("type", "harness_output")
    _evidence_log.add("harness_output", enriched)

# Subscribe the loggers to the topics we know about.
# We'll use a list of topics; we can expand as we add more harnesses.
KNOWN_TOPICS = [
    "signal_monitor",
    "prospect_identification",
    "research",
    "outreach_generation",
    "human_review",
    "conversation_management",
    "feedback_learning",
    "governance",
]

for topic in KNOWN_TOPICS:
    subscribe(topic, _knowledge_logger)
    subscribe(topic, _evidence_logger)

__all__ = ["EventBus", "publish", "subscribe"]