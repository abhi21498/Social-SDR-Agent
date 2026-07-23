import re
from typing import Dict, Any
from src.wiring.event_bus import publish

# Simple regex patterns for PII detection (email and phone number)
EMAIL_PATTERN = re.compile(r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}')
PHONE_PATTERN = re.compile(r'\\b\\d{3}[-.]?\\d{3}[-.]?\\d{4}\\b')

def check_action(action: Dict[str, Any]) -> Dict[str, Any]:
    """
    Evaluate an action against governance policies.
    Returns a dict with keys: 'allowed' (bool), 'reason' (str), and optionally 'action' (the original action).
    Policies:
      1. No outbound message containing PII (email, phone) unless consent is true.
      2. If the action requires explicit approval (metadata.requires_approval == True), then metadata.approved must be True.
      3. Rate limiting and other policies can be added later.
    """
    # Default to allowed
    allowed = True
    reasons = []

    # Extract relevant fields
    action_type = action.get("type", "")
    content = action.get("content", "")
    metadata = action.get("metadata", {})

    # Policy 1: PII check for outbound messages
    if action_type in ("send_outreach", "update_prospect"):  # extend as needed
        # Check for email
        if EMAIL_PATTERN.search(content):
            if not metadata.get("consent", False):
                allowed = False
                reasons.append("PII (email) detected without consent")
        # Check for phone number
        if PHONE_PATTERN.search(content):
            if not metadata.get("consent", False):
                allowed = False
                reasons.append("PII (phone number) detected without consent")

    # Policy 2: Required approval
    if metadata.get("requires_approval", False):
        if not metadata.get("approved", False):
            allowed = False
            reasons.append("Required approval not granted")

    # If any policy denied, set allowed to false and combine reasons
    if not allowed:
        reason = "; ".join(reasons)
    else:
        reason = "Action complies with policies"

    result = {
        "allowed": allowed,
        "reason": reason,
        "action": action  # echo back for convenience
    }
    # Publish the governance decision
    publish("governance", result)
    return result

__all__ = ["check_action"]