# Social SDR Agent

An AI‑powered Sales Development Representative prototype built with the **Harness Engineering Methodology**. It turns public signals into qualified prospects, generates personalized outreach, enforces human‑in‑the‑loop review, and continuously learns from outcomes—all while being fully traceable, testable, and governance‑ready.

## What It Does (High‑Level Flow)

1. **Signal Monitoring** – scrapes news, social feeds, intent data.  
2. **Prospect Identification** – scores signals against an Ideal Customer Profile (ICP).  
3. **Research** – enriches prospects with technographics, recent news, etc.  
4. **Outreach Generation** – creates personalized email/LinkedIn drafts.  
5. **Human Review** – mandatory approval before any message is sent.  
6. **Conversation Management** – tracks inbound/outbound messages and sentiment.  
7. **Feedback & Learning** – logs outcomes and feeds insights back into the kernel.  
8. **Governance** – runs PII detection, consent checks, and policy enforcement on every piece of data.

The system is organized around an **event bus** (in‑process for the prototype) and a **kernel** that stores intent, assumptions, evidence, reasoning, decisions, and a service registry.

## Demo Mode (Zero‑Setup)

A one‑click **Demo Mode** walks the full pipeline with synthetic data, so you can see the entire flow without configuring any external APIs.

### How to Run the Demo Locally

1. **Clone the repo**

   ```bash
   git clone https://github.com/abhi21498/Social-SDR-Agent.git
   cd Social-SDR-Agent
   ```

2. **Backend (Python 3.11+)**

   ```bash
   # Optional: create a virtual environment
   python -m venv .venv
   source .venv/bin/activate   # Windows: .venv\Scripts\activate

   # Install dependencies (none required for the prototype, but you can add any later)
   pip install -r requirements.txt   # currently empty

   # Start the API server (respects $PORT, defaults to 8000)
   python -m TMS_Prototype.run_server
   ```

   The server will start and expose a health endpoint at `http://localhost:8000/healthz`.

3. **Frontend (Node ≥ 18, npm or yarn)**

   ```bash
   # From the repo root
   npm install          # or yarn install
   npm run dev          # starts Next.js dev server on http://localhost:3000
   ```

4. **Launch the Demo**

   - Open `http://localhost:3000` in your browser.
   - Click the **“Launch Demo”** button on the landing page.
   - The demo will automatically progress through the eight harnesses, showing status updates, and finally redirect to a dashboard view.

5. **Explore the UI**

   - **Landing page (`/`)** – executive summary, architecture highlights, and demo launcher.
   - **Harness Engineering (`/harness-engineering`)** – detailed cards for each harness with purpose, inputs/outputs, responsibilities, and current status.
   - **Engineering Dashboard (`/engineering-dashboard`)** – placeholder for metrics, test coverage, and knowledge growth.
   - **Architecture (`/architecture`)** – placeholder for diagrams and component interactions.
   - **Operations (`/operations`)** – placeholder for logs, health, and observability.
   - **Explainability Modal** – accessible from any harness card to see the evidence, assumptions, confidence, and applied policies behind an AI decision.

## Project Structure (Key Folders)

```
/TMS_Prototype          # Backend kernel, harnesses, API, tests
/pages                  # Next.js pages (landing, demo, harness engineering, etc.)
/src/components         # Reusable UI pieces (demo button, explainability modal, event bus)
/src/utils              # Event bus implementation
/docs                   # Architecture, ADRs, verification plans, productization guides
```

## Verification & Testing

- Backend unit tests live under `TMS_Prototype/tests/`. Run them with:

  ```bash
  cd TMS_Prototype
  pytest -q
  ```

- The frontend uses TypeScript and Next.js; linting can be added later.

## Deployment Ready

The repository includes:

- `Dockerfile` (multi‑stage, copies source, respects `$PORT`).
- `Procfile` (for Heroku/Railway‑style platforms).
- `railway.json` (healthcheck `/healthz`).
- `runtime.txt` (pins Python 3.11.15).
- `.dockerignore` (keeps build context lean).

You can deploy to any container‑friendly platform (Railway, Render, Docker Swarm, Kubernetes) with no code changes.

## Extending the Prototype

- **Real data sources** – replace the mock signal fetcher with LinkedIn, Twitter, Crunchbase, GDELT, etc.
- **Durable event bus** – swap the in‑process bus for Redis, Kafka, or RabbitMQ.
- **Model retraining hook** – attach a training pipeline to the `model_retrain_trigger` event from Feedback & Learning.
- **Auth & RBAC** – add NextAuth or similar for role‑based access.
- **Helm chart** – package the Docker image for Kubernetes.

## License

MIT – see the `LICENSE` file in `TMS_Prototype/`.

---

*Built with the Harness Engineering Methodology to ensure every decision is traceable, every component is tested, and knowledge is captured continuously.*
