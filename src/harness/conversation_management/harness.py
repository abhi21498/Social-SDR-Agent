from datetime import datetime, timezone
from typing import Dict, Any
from src.wiring.event_bus import publish

def process_reply(thread: dict, reply_text: str) -> dict:
    """
    Append a prospect reply to the conversation thread and update metadata.
    Returns the updated thread (modifies in place and also returns).
    """
    # Ensure messages list exists
    if "messages" not in thread:
        thread["messages"] = []
    # Determine sender: if the last message is from system, reply is from prospect
    # Simple heuristic: alternate
    last_sender = thread["messages"][-1]["sender"] if thread["messages"] else "system"
    sender = "prospect" if last_sender == "system" else "system"
    reply_msg = {
        "sender": sender,
        "text": reply_text,
        "timestamp": datetime.now(timezone.utc).isoformat()
    }
    thread["messages"].append(reply_msg)
    thread["last_updated"] = reply_msg["timestamp"]
    # Update status based on content (simple keyword detection)
    text_lower = reply_text.lower()
    if any(word in text_lower for word in ["interested", "yes", "meeting", "call", "demo"]):
        thread["status"] = "interested"
    elif any(word in text_lower for word in ["not", "no", "stop", "unsubscribe"]):
        thread["status"] = "not_interested"
    else:
        thread["status"] = "replied"
    # Publish the updated thread
    publish("conversation_management", {
        "thread_id": thread.get("thread_id"),
        "updated_thread": thread
    })
    return thread

def check_for_followup(thread: dict, current_time_str: str) -> bool:
    """
    Determine if a follow‑up should be triggered based on last response time.
    Returns True if current time is past next_follow_up_at and no recent reply.
    """
    # If there's been a reply within the last N days, maybe adjust?\n    # Simple: compare current_time with next_follow_up_at\n    try:\n        current = datetime.fromisoformat(current_time_str.replace('Z', '+00:00'))\n        next_follow = datetime.fromisoformat(thread["next_follow_up_at"].replace('Z', '+00:00'))\n        return current >= next_follow\n    except Exception:\n        # If parsing fails, assume no follow-up needed\n        return False