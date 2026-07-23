def generate_outreach(prospect: dict, research: dict, icp: dict, tone: str) -> str:
    """
    Generate an outreach draft using a simple template.
    In a real system, this would call an LLM.
    """
    company = prospect.get("company_name", "the company")
    industry = prospect.get("industry", "your industry")
    # Use research summary if available
    insight = research.get("summary", "recent achievements")
    # Simple template based on tone
    if tone.lower() == "professional":
        template = f"Dear {company} team,\n\nI was impressed by {company}'s work in {industry}, particularly {insight}. I believe our solutions could help accelerate your goals. Let's schedule a brief call to discuss potential synergies.\n\nBest regards,\n[Your Name]"
    elif tone.lower() == "casual":
        template = f"Hey {company} team,\n\nLoved seeing your progress on {insight}. Would love to chat about how we can support your next steps.\n\nCheers,\n[Your Name]"
    else:
        # default
        template = f"Hello {company},\n\nYour work in {industry} ({insight}) caught my attention. Let's connect.\n\nThanks,\n[Your Name]"
    result = template
    # Publish the generated draft
    from src.wiring.event_bus import publish
    publish("outreach_generation", {
        "prospect_id": prospect.get("prospect_id"),
        "draft": result
    })
    return result