import json
import os
from ..storage.memory import get_tasks, create_task
from ..knowledge.log import log_decision


def handle_get_tasks():
    """Handle GET /tasks request.
    Returns a tuple (status, headers, body) where:
      - status: HTTP status code (int)
      - headers: list of (header, value) tuples
      - body: response body (string)
    """
    tasks = get_tasks()
    body = json.dumps(tasks)
    headers = [("Content-Type", "application/json")]
    return 200, headers, body


def handle_post_task(request_body):
    """Handle POST /tasks request.
    Expects request_body to be a dict with a 'title' key.
    Returns a tuple (status, headers, body) where:
      - status: HTTP status code (int)
      - headers: list of (header, value) tuples
      - body: response body (string)
    """
    # Validate the request body
    if not isinstance(request_body, dict):
        error_msg = "Request body must be a JSON object"
        # Log the failed attempt
        try:
            log_decision(
                decision="Create task",
                evidence={"request_body": request_body, "error": error_msg},
                outcome="Failure: Invalid request body",
                log_file="knowledge.log",
            )
        except Exception:
            pass  # Logging failure should not break the request
        return 400, [("Content-Type", "application/json")], json.dumps({"error": error_msg})
    title = request_body.get("title")
    if not isinstance(title, str) or not title.strip():
        error_msg = "Title must be a non-empty string"
        try:
            log_decision(
                decision="Create task",
                evidence={"request_body": request_body, "error": error_msg},
                outcome="Failure: Invalid title",
                log_file="knowledge.log",
            )
        except Exception:
            pass
        return 400, [("Content-Type", "application/json")], json.dumps({"error": error_msg})
    # Create the task
    task = create_task(title.strip())
    # Log the successful creation
    try:
        log_decision(
            decision="Create task",
            evidence={"request_body": request_body},
            outcome="Success",
            log_file="knowledge.log",
        )
    except Exception:
        pass
    body = json.dumps(task)
    headers = [("Content-Type", "application/json")]
    return 201, headers, body


def handle_health():
    """Handle GET /healthz request."""
    body = json.dumps({"status": "ok"})
    headers = [("Content-Type", "application/json")]
    return 200, headers, body


def handle_request(method, path, body=None, headers=None):
    """Dispatch the request to the appropriate handler.
    Args:
        method (str): HTTP method (e.g., "GET", "POST")
        path (str): Request path (e.g., "/tasks")
        body (str, optional): Request body as a string.
        headers (list, optional): List of (header, value) tuples.
    Returns:
        tuple: (status, headers, body) for the response.
    """
    # Normalize the path (remove trailing slash)
    path = path.rstrip("/")
    if method == "GET" and path == "/tasks":
        return handle_get_tasks()
    elif method == "POST" and path == "/tasks":
        # Parse the body as JSON
        try:
            request_body = json.loads(body) if body else {}
        except json.JSONDecodeError:
            return 400, [("Content-Type", "application/json")], json.dumps({"error": "Invalid JSON"})
        return handle_post_task(request_body)
    elif method == "GET" and path == "/healthz":
        return handle_health()
    else:
        return 404, [("Content-Type", "application/json")], json.dumps({"error": "Not Found"})