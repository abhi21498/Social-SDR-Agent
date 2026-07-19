# Assumptions

## Environment
- Windows 10, Git-Bash (MSYS) terminal
- Python 3.11 available
- Hermes Agent installed with the `harness-engineering-skill` skill loaded

## Project Scope
- TMS will have: (a) REST-style API for CRUD tasks, (b) in-memory storage for prototype, (c) OpenAPI spec, (d) basic unit tests

## Team
- Single developer (you) assisted by Hermes Agent as an AI coding assistant; no external stakeholders beyond yourself

## Tools
- Hermes Agent (`hermes` CLI)
- `git`
- `pytest`
- `mkdocs` (for documentation)
- `mermaid-cli` (for diagram rendering)

## Knowledge Base
- Existing `harness-engineering-skill` will be reused; no prior TMS code exists

## Constraints
- Must follow the HEOS layers
- Must produce traceable artifacts (Intent, Assumptions, Evidence, Invariants, Architecture, Implementation, Verification, Knowledge)
- No reliance on language-specific frameworks beyond the standard library (to maintain technology agnosticism)
