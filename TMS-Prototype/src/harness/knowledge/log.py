import json
import datetime
import os

def log_decision(decision, evidence, outcome, log_file="knowledge.log"):
    """Log a decision to the knowledge log.
    Args:
        decision (str): The decision made.
        evidence (list): List of evidence supporting the decision.
        outcome (str): The outcome of the decision.
        log_file (str): Path to the log file.
    """
    # Create a record with a timestamp
    record = {
        "timestamp": datetime.datetime.now(datetime.timezone.utc).isoformat(),
        "decision": decision,
        "evidence": evidence,
        "outcome": outcome
    }
    # Ensure the directory exists
    dir_name = os.path.dirname(log_file)
    if dir_name and not os.path.exists(dir_name):
        os.makedirs(dir_name)
    # Append the record as a JSON line
    with open(log_file, 'a') as f:
        f.write(json.dumps(record) + "\n")