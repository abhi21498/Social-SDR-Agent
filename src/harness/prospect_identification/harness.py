def score_signal(signal: dict) -> dict:
    """
    Score a signal to produce a prospect candidate.
    Simple heuristic: combine signal score with keyword-based ICP fit.
    Returns a dict representing a ProspectCandidate.
    """
    # Extract base signal score (0-1)
    base_score = float(signal.get('score', 0.0))
    # Determine ICP fit based on keywords in content
    content = signal.get('content', '').lower()
    icp_keywords = ['series a', 'series b', 'funding', 'investment', 'round', 'capital']
    icp_hits = sum(1 for kw in icp_keywords if kw in content)
    # Normalize icp_fit to 0-1 range (max 5 keywords)
    icp_fit = min(icp_hits / 5.0, 1.0)
    # Combine: weighted average (70% signal, 30% ICP)
    priority_score = 0.7 * base_score + 0.3 * icp_fit
    # Build prospect candidate
    prospect = {
        "prospect_id": f"pros_{signal['id']}",
        "signal_id": signal['id'],
        "priority_score": round(priority_score, 3),
        "icp_fit": round(icp_fit, 3),
        "reasoning": f"Signal score {base_score:.2f}, ICP fit {icp_fit:.2f} based on keywords: {[kw for kw in icp_keywords if kw in content]}"
    }
    # Publish the prospect candidate
    from src.wiring.event_bus import publish
    publish("prospect_identification", prospect)
    return prospect