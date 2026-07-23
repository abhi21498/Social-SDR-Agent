# Use an official Python runtime as a parent image
FROM python:3.11.15-slim

# Set working directory
WORKDIR /app

# Copy requirements (if any) and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application
COPY . .

# Expose the port the app runs on
EXPOSE 8000

# Environment variable for port (default 8000)
ENV PORT=8000

# Run the application
CMD uvicorn src.api.fastapi_server:app --host 0.0.0.0 --port $PORT