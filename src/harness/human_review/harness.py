def review_draft(draft: dict, decision: str = "approve", edited_text: str = None, reason: str = "") -> dict:
    """
    Simulate human review of an outreach draft.
    Parameters:
        draft: dict with at least 'content' key.
        decision: one of 'approve', 'edit', 'reject'.
        edited_text: if decision is 'edit', the edited version.
        reason: optional reason for reject or edit.
    Returns a ReviewDecision dict.
    """
    if decision not in ("approve", "edit", "reject"):
        raise ValueError("decision must be 'approve', 'edit', or 'reject'")
    result = {
        "action": decision,
        "final_text": draft.get("content", ""),
        "reason": reason if reason else decision
    }
    if decision == "edit":
        if edited_text is not None:
            result["final_text"] = edited_text
        else:
            # If no edited text provided, keep original (or could raise)
            pass
    # For reject, keep original content as final_text (what would be rejected)
    # Publish the review decision
    from src.wiring.event_bus import publish
    publish("human_review", {
        "decision": result,
        "draft_id": draft.get("id")
    })
    return result