import json
import os
from datetime import datetime, timezone
from src.wiring.event_bus import publish

def process_outcome(outcome: dict) -> dict:
    """
    Process an outcome event (e.g., meeting booked, no response, spam complaint).
    Publishes the outcome to the event bus for logging and returns a processing result.
    """
    # Validate required fields
    required = ["prospect_id", "outcome_type"]
    for field in required:
        if field not in outcome:
            raise ValueError(f"Missing required field: {field}")
    
    # Prepare the decision record to log
    decision_record = {
        "outcome_type": outcome["outcome_type"],
        "prospect_id": outcome["prospect_id"],
        "details": outcome.get("outcome_details", {}),
        "related_ids": {
            "signal_id": outcome.get("signal_id"),
            "research_id": outcome.get("research_id"),
            "draft_id": outcome.get("draft_id")
        },
        "timestamp": datetime.now(timezone.utc).isoformat()
    }
    
    # Publish to event bus (subscribers will handle logging to knowledge and evidence)
    publish("feedback_learning", decision_record)
    
    # In a more advanced system, we would update scoring weights or prompt templates here.
    # For MVP, we just log via event bus.
    
    return {
        "status": "processed",
        "outcome_type": outcome["outcome_type"],
        "logged_at": decision_record["timestamp"]
    }

__all__ = ["process_outcome"]