"""
FastAPI façade for the Social SDR Agent.
Provides:
  - GET /status          → health check
  - POST /trigger/poll   → trigger a single poll of the signal monitor
                           (which then propagates through the harness chain via the event bus)
"""
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Any
import json
from datetime import datetime, timezone

# Import the harness entry point we want to expose.
# Adjust import path if needed.
from src.harness.signal_monitor.harness import get_signals as get_signal_batch

app = FastAPI(
    title="Social SDR Agent API",
    version="0.1.0",
)

# Allow the Vercel front‑end (or any origin) to call the API.
# In production, restrict this to your actual domain.
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://social-sdr-agent-bu4e.vercel.app",
        # For local development, you can also keep "*" or add http://localhost:3000
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/status")
def status():
    return {
        "status": "ok",
        "service": "Social SDR Agent",
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }

@app.post("/trigger/poll")
def trigger_poll():
    """Trigger a single poll of the signal monitor.
    The harness publishes its output to the internal event bus,
    which should cause the rest of the pipeline to react.
    """
    try:
        signals: List[Any] = get_signal_batch()   # this also publishes the first event
        return {
            "status": "poll_triggered",
            "signals_received": len(signals),
            "timestamp": datetime.now(timezone.utc).isoformat(),
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Optional: expose a GET for convenience (not required by spec)
@app.get("/trigger/poll")
def trigger_poll_get():
    return trigger_poll()