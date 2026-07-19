# ADR 001: API Handler Design

## Status
Accepted

## Context
We need to design the API harness for the Task Management Service (TMS) prototype. The harness must be able to process HTTP requests and return appropriate responses. We want to keep the API harness decoupled from any specific HTTP framework or server implementation to maintain technology agnosticism and ease of testing.

## Decision
We will design the API harness as a set of pure functions that take the essential parts of an HTTP request (method, path, body, headers) and return the essential parts of an HTTP response (status code, headers, body). This approach:
- Is independent of any specific HTTP library or framework.
- Makes the handlers easy to unit test without mocking request objects.
- Allows the handlers to be plugged into any HTTP server (e.g., Python's `http.server`, a custom server, or a web framework like Flask) by adapting the server's request/response format to this common interface.
- Keeps the API harness focused on the business logic of processing requests and generating responses, delegating the concerns of networking, concurrency, and protocol details to the server layer.

## Consequences
### Positive
- **Testability**: Handlers can be tested with simple unit tests that pass in dictionaries and strings.
- **Flexibility**: The same handler logic can be used in different deployment contexts (e.g., a simple development server vs. a production WSGI server).
- **Separation of Concerns**: The API harness does not need to know about sockets, threads, or HTTP parsing details.
- **Technology Agnosticism**: Aligns with the Harness Engineering Methodology's requirement to be independent of specific technologies.

### Negative
- **Boilerplate**: When integrating with a specific server, some adaptation code is needed to convert between the server's request/response format and our handler's format.
- **Manual Validation**: We must manually handle request parsing (e.g., JSON decoding) and response formatting (e.g., JSON encoding) within the handler.

## Implementation
The API harness provides:
- `handle_request(method, path, body=None, headers=None)`: The main entry point that dispatches to specific handlers.
- `handle_get_tasks()`: Handles GET `/tasks`.
- `handle_post_task(request_body)`: Handles POST `/tasks`.

Both helper functions return a tuple `(status, headers, body)` where:
- `status` is an integer HTTP status code.
- `headers` is a list of `(header_name, header_value)` tuples.
- `body` is a string (typically JSON).

The `handle_request` function is responsible for parsing the request body (if present) as JSON and handling HTTP method and path routing.

## Related Decisions
- This design allows us to later swap in a real HTTP server (e.g., using `http.server` or a minimal WSGI server) without changing the API harness logic.
- The storage and knowledge harnesses are similarly designed to be independent of the API layer, communicating via simple function calls.

## Notes
This decision was made to uphold the principles of the Harness Engineering Methodology, particularly technology agnosticism and ease of verification.