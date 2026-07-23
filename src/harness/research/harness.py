def enrich_prospect(prospect: dict) -> dict:
    """
    Enrich a prospect with additional research data.
    For MVP, returns a static research pack with dummy data.
    """
    # Simulate fetching from internal knowledge base and web search
    research_data = {
        "company_name": "Example Corp",
        "industry": "Software",
        "employee_count": 150,
        "recent_news": "Launched new AI product",
        "tech_stack": ["Python", "React", "AWS"]
    }
    sources = ["internal_kb://company/ExampleCorp", "web://news.example.com/article"]
    # Confidence based on availability of data (dummy)
    confidence = 0.85
    summary = f"{research_data['company_name']} is a {research_data['industry']} company with {research_data['employee_count']} employees."
    result = {
        "prospect_id": prospect["prospect_id"],
        "research_data": research_data,
        "sources": sources,
        "confidence": confidence,
        "summary": summary
    }
    # Publish the research pack
    from src.wiring.event_bus import publish
    publish("research", result)
    return result