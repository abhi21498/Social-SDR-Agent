import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '../src'))

def test_intent_register():
    from kernel.intent import Intent
    intent = Intent()
    # Initially, no intents
    assert intent.intents == []
    # Register an intent
    intent.register("Test intent")
    assert "Test intent" in intent.intents