import sys
import os
import json
import tempfile
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '../src'))

def test_knowledge_log_decision():
    from harness.knowledge import log_decision
    # Create a temporary directory and file for the log
    with tempfile.TemporaryDirectory() as tmpdir:
        log_file = os.path.join(tmpdir, "test_knowledge.log")
        # Call the function to log a decision
        decision = "Test decision"
        evidence = ["Evidence 1", "Evidence 2"]
        outcome = "Success"
        log_decision(decision, evidence, outcome, log_file=log_file)
        # Check that the file exists and has one line
        assert os.path.exists(log_file)
        with open(log_file, 'r') as f:
            lines = f.readlines()
            assert len(lines) == 1
            # Parse the JSON line
            record = json.loads(lines[0].strip())
            # Check the fields
            assert "timestamp" in record
            assert isinstance(record["timestamp"], str)
            assert record["decision"] == decision
            assert record["evidence"] == evidence
            assert record["outcome"] == outcome