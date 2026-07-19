# Acceptance Tests for the Task Management Service (TMS) Prototype

These tests verify that the TMS prototype meets the acceptance criteria defined in the project's intent and assumptions.

## Acceptance Criteria

1. **GET /tasks** returns a 200 status and a JSON array of tasks (initially empty).
2. **POST /tasks** with a valid title returns a 201 status and the created task object.
3. **POST /tasks** with an invalid or missing title returns a 400 status and an error message.
4. **POST /tasks** logs successful and failed attempts to the knowledge log.
5. The system preserves the core invariants: intent, evidence, and knowledge retention.

## Test Procedure

The tests below use the API handler functions directly to simulate requests.

### Setup

We import the necessary modules and define a helper to call the API handler.

### Test Cases

#### Test 1: GET /tasks returns empty list
- **Given**: No tasks have been created.
- **When**: A GET request is made to `/tasks`.
- **Then**: The response status is 200, the body is a JSON array, and the array is empty.

#### Test 2: POST /tasks with valid title creates a task
- **Given**: The task list is empty.
- **When**: A POST request is made to `/tasks` with body `{"title": "Test task"}`.
- **Then**: The response status is 201, the body is a JSON object with an `id` and `title` matching the input, and the task is stored in the system.

#### Test 3: POST /tasks with missing title returns 400
- **Given**: The task list is empty.
- **When**: A POST request is made to `/tasks` with body `{}` (missing title).
- **Then**: The response status is 400, and the body contains an error message.

#### Test 4: POST /tasks with empty title returns 400
- **Given**: The task list is empty.
- **When**: A POST request is made to `/tasks` with body `{"title": ""}`.
- **Then**: The response status is 400, and the body contains an error message.

#### Test 5: POST /tasks logs attempts to knowledge log
- **Given**: The knowledge log file does not exist or is empty.
- **When**: A POST request is made to `/tasks` with a valid title, and another with an invalid title.
- **Then**: The knowledge log contains two entries: one for the successful attempt and one for the failed attempt.

#### Test 6: System preserves invariants
- **Given**: A series of requests are made.
- **When**: The system processes the requests.
- **Then**: The intent (to manage tasks) is preserved, evidence (requests and outcomes) is logged, and knowledge (the log) is retained.

## How to Run

These tests can be executed by running the provided test script:

```bash
python -m pytest tests/ -v
```

The unit tests in the `tests/` directory implement the above acceptance criteria.

## Expected Results

All tests should pass, indicating that the TMS prototype satisfies the acceptance criteria and adheres to the Harness Engineering Methodology.