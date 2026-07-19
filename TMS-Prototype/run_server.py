#!/usr/bin/env python3
"""
A simple HTTP server that uses the TMS API handler.
This is for demonstration purposes only.
"""
import json
from http.server import HTTPServer, BaseHTTPRequestHandler
from harness.api.handler import handle_request

class RequestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.handle_request('GET')

    def do_POST(self):
        self.handle_request('POST')

    def handle_request(self, method):
        # Get the path
        path = self.path

        # Get the body if present
        content_length = int(self.headers.get('Content-Length', 0))
        body = self.rfile.read(content_length).decode('utf-8') if content_length > 0 else None

        # Call our API handler
        status, headers, body = handle_request(method, self.path, body, None)

        # Send response
        self.send_response(status)
        for header, value in headers:
            self.send_header(header, value)
        self.end_headers()
        if body:
            self.wfile.write(body.encode('utf-8'))

if __name__ == '__main__':
    port = 8000
    server_address = ('', port)
    httpd = HTTPServer(server_address, RequestHandler)
    print(f'Starting TMS API server on http://localhost:{port}')
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print('\nShutting down server.')
        httpd.server_close()