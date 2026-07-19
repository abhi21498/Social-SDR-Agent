import sys
import os
import json
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '../src'))

def test_api_handle_get_tasks():
    from harness.api.handler import handle_get_tasks
    # Test the GET handler
    status, headers, body = handle_get_tasks()
    assert status == 200
    # Check headers
    assert ("Content-Type", "application/json") in headers
    # Body should be a JSON array (empty list)
    assert json.loads(body) == []

def test_api_handle_request():
    from harness.api.handler import handle_request
    # Test GET /tasks
    status, headers, body = handle_request("GET", "/tasks")
    assert status == 200
    assert json.loads(body) == []
    # Test POST /tasks with valid data
    status, headers, body = handle_request("POST", "/tasks", body='{"title": "New task"}')
    assert status == 201
    response_data = json.loads(body)
    assert "id" in response_data
    assert response_data["title"] == "New task"
    # Test POST /tasks with missing title
    status, headers, body = handle_request("POST", "/tasks", body='{}')
    assert status == 400
    assert json.loads(body)["error"] == "Title must be a non-empty string"
    # Test POST /tasks with invalid JSON
    status, headers, body = handle_request("POST", "/tasks", body='invalid json')
    assert status == 400
    assert json.loads(body)["error"] == "Invalid JSON"
    # Test unknown endpoint
    status, headers, body = handle_request("GET", "/unknown")
    assert status == 404