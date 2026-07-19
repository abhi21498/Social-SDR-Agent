import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '../src'))

def test_storage_create_task():
    from harness.storage.memory import create_task
    # We expect the function to exist and return a dict with at least an id and title
    try:
        task = create_task("Test task")
        # Check that we got a dict
        assert isinstance(task, dict)
        # Check that it has an id and title
        assert "id" in task
        assert "title" in task
        assert task["title"] == "Test task"
        # Optionally, check that id is not empty
        assert task["id"]
    except Exception as e:
        raise AssertionError(f"create_task not implemented correctly: {e}")