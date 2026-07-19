# User Journey

This document details step‑by‑step journeys for each primary user type (SDR, Sales Manager, Admin) when accomplishing core tasks in the Social SDR Agent platform. Each journey includes the user’s goal,触发点, interactions, system responses, decision points, and the outcome/success criteria.

---

## 1. SDR (Individual Contributor) Journeys

### 1.1 Journey: “From Signal to Meeting Booked”
**Goal:** Convert a newly detected signal into a qualified meeting with a prospect.

| Step | User Action | System Response | Decision Point / Notes |
|------|-------------|-----------------|------------------------|
| 1 | Log in to the platform. | Lands on personal **SDR Dashboard** showing overview widgets. | – |
| 2 | Glance at the **Live Signal Feed** widget; sees a new high‑relevance signal (e.g., a prospect company announced funding). | Signal card shows title, source, timestamp, relevance score, and “Mark as Relevant” button. | – |
| 3 | Click **Mark as Relevant** on the signal card. | System logs `signal_detected` event, triggers **Prospect Identification** harness. Prospect Identification scores the signal against ICP and creates/updates a prospect record. | If score below threshold, signal is logged but no prospect created; user may still manually create prospect. |
| 4 | System automatically runs **Research** harness on the prospect. | Prospect enriched with technographics, recent news, intent topics; `prospect_enriched` event published. | – |
| 5 | Prospect appears in the **Prospect Pipeline** under the “Research Complete” column. | Prospect card displays summary: company, role, signal source, enrichment snippets. | – |
| 6 | Click the prospect card to open **Prospect Details** view. | Tabs: Overview, Research, Outreach, Activity load. Research tab shows detailed insights. | – |
| 7 | Click **Generate Outreach** (button in Research or Outreach tab). | **Outreach Generation** harness creates a personalized email sequence (2‑step) and saves as draft; `outreach_drafted` event published. Prospect moves to “Outreach Awaiting Review” column. | – |
| 8 | Navigate to **Human Review Queue** (via sidebar). | List of outreach drafts awaiting approval, each with preview, compliance flags, and action buttons. | – |
| 9 | Locate the draft for this prospect; preview the content. | System shows the email body, subject, and any personalization tags. | – |
| 10 | Review for tone, accuracy, and policy compliance (PII check already performed by Governance). | If satisfied, click **Approve**. If edits needed, click **Edit**, modify, then **Resubmit for Approval**. | – |
| 11 | Upon approval, system publishes `outreach_approved` event; Outreach Studio schedules the first email (or marks as ready for manual send). | Prospect moves to “Outreach Sent” column; notification: “Outreach scheduled for [time]”. | – |
| 12 | Prospect replies to the email (simulated or real). | **Conversation Management** harness captures the reply, publishes `conversation_received` event, updates sentiment and intent tags. | – |
| 13 | Notification appears in **Conversation Center** (badge increments). SDR sees new conversation thread. | Thread shows prospect profile sidebar, message thread, sentiment badge (e.g., Positive), and suggested next steps (e.g., “Schedule Call”). | – |
| 14 | SDR clicks **Schedule Call** button, selects a time from integrated calendar (or manually logs). | System logs the action, sends calendar invite (if integration enabled), and updates prospect activity. | – |
| 15 | Call takes place; prospect agrees to a meeting. | After call, SDR opens the prospect/conversation and clicks **Log Outcome** → selects **Meeting Booked** and adds brief notes. | – |
| 16 | **Feedback/Learning** harness records the outcome, stores in EvidenceLog, and triggers knowledge update. | System updates prospect stage to “Meeting Booked” (or “Customer” if deal closed). Analytics dashboards reflect the new metric. | – |
| 17 | Journey ends: SDR sees updated metrics on dashboard (e.g., “Meetings Booked: +1”). | Success criteria met: signal → meeting in <20 minutes (excluding actual call time). | – |

**Success Criteria:**  
- Total time from signal mark‑as‑relevant to meeting booked ≤ 20 minutes (manual steps only).  
- No manual data re‑entry; all enrichment and drafting automated.  
- Outreach approved on first review (no edits required) ≥ 80% of the time.  
- Meeting booked logged correctly in system of record (if CRM sync enabled).

---

### 1.2 Journey: “Handling a Low‑Quality Signal”
**Goal:** Efficiently dismiss irrelevant signals to keep the feed clean.

| Step | User Action | System Response |
|------|-------------|-----------------|
| 1 | On **Live Signal Feed**, see a signal clearly irrelevant (e.g., a sports article). | Signal card shows low relevance score, source, and buttons: Mark Relevant, Dismiss, Snooze. |
| 2 | Click **Dismiss**. | System logs signal as dismissed, moves it to an “Archive” tab (optional), and does NOT trigger Prospect Identification. |
| 3 | Optionally, provide quick feedback (why dismissed) via a pop‑up (optional). | Feedback stored for signal source tuning. |
| 4 | Feed updates, removing the dismissed card. | – |

**Success Criteria:**  
- One‑click dismissal.  
- No prospect created.  
- Feedback loop available to improve signal filtering.

---

### 1.3 Journey: “Editing and Re‑submitting Outreach Draft”
**Goal:** Customize AI‑generated outreach before approval.

| Step | User Action | System Response |
|------|-------------|-----------------|
| 1 | In **Human Review Queue**, locate a draft needing tweaks. | Preview shows subject and body. |
| 2 | Click **Edit**. | Opens **Outreach Studio** editor with the draft loaded; all fields editable. |
| 3 | Modify: adjust tone, add a custom sentence, correct a merge tag. | Editor shows real‑time character count and placeholder validation. |
| 4 | Click **Save & Resubmit for Review**. | Draft saved; system pushes it back to the Human Review Queue (position may change based on timestamp). |
| 5 | Reviewer (could be same SDR or a manager) sees the updated draft and approves. | Upon approval, outreach proceeds to send. |

**Success Criteria:**  
- Edit‑to‑resubmit ≤ 2 minutes.  
- Version history retained (optional).  
- Final approved outreach passes governance check.

---

## 2. Sales Manager Journeys

### 2.1 Journey: “Weekly Team Performance Review”
**Goal:** Identify coaching opportunities and recognize top performers.

| Step | User Action | System Response |
|------|-------------|-----------------|
| 1 | Log in; lands on **Manager Dashboard** (or navigate to Analytics). | Dashboard shows team‑level widgets: signal volume, pipeline health, outreach performance, leaderboard. |
| 2 | Click the **Leaderboard** widget to expand. | Sorted list of SDRs by meetings booked (last 30 days), with bars for outreach sent, reply rate, etc. |
| 3 | Spot a rep whose reply rate is below team average. | Hover over the bar to see tooltip: “Reply Rate: 12% (Team avg: 18%)”. |
| 4 | Click the rep’s name to open their **Individual Performance** view (drill‑down from Analytics → Team Performance → Individual). | View shows personal funnel: signals → prospects → outreaches → replies → meetings. |
| 5 | Examine the **Outreach Tab** within the individual view to see which message variants performed poorly. | List of outreach drafts with open/reply rates; flags indicating low‑performing templates. |
| 6 | Decide to coach: click **Add Coaching Note** (button on the individual view). | Modal opens; manager types free‑form feedback, can attach a resource link, and chooses visibility (rep only, or shared with team lead). |
| 7 | Save note. | Note appears on the rep’s profile under “Coaching”; rep gets a notification (in‑app or email). |
| 8 | Optionally, schedule a 1‑on‑1: click **Schedule Coaching Session** → opens calendar picker. | Invite sent via integrated calendar (if configured). |
| 9 | Journey ends; manager can export the team performance report for leadership. | Click **Export** → choose CSV/PDF → file downloaded. |

**Success Criteria:**  
- Manager can identify a low‑metric rep in ≤ 3 clicks.  
- Coaching note saved and delivered within platform.  
- Export completes in <5 seconds.

---

### 2.2 Journey: “Approving an Escalated Conversation”
**Goal:** Manage a prospect reply that raises a compliance or legal concern.

| Step | User Action | System Response |
|------|-------------|-----------------|
| 1 | SDR flags a conversation in **Conversation Center** (e.g., prospect mentions data privacy concerns). | Conversation card shows a “Flag” icon; SDR clicks Flag → selects reason (e.g., “Compliance Query”). |
| 2 | Flagged conversation appears in **Manager’s Escalation View** (accessible via Governance → Escalations or a dedicated manager inbox). | List shows prospect, snippet, flag reason, timestamp, and actions: Review, Assign, Resolve. |
| 3 | Manager clicks the conversation to open full thread. | Thread view shows full exchange, sentiment, and any governance flags (e.g., PII detected in prospect’s reply). |
| 4 | Manager reviews the prospect’s concern and consults the **Knowledge Center** (if needed) for similar past cases. | Search returns relevant articles (e.g., “Handling GDPR inquiries”). |
| 5 | Manager decides on response: clicks **Reply with Template**, selects a pre‑approved compliance response, customizes if needed, and sends. | System logs the outreach, updates conversation, and clears the flag (or marks as “Resolved – Response Sent”). |
| 6 | If further action needed (e.g., involve Legal), manager clicks **Escalate to Legal** → creates a ticket in external system (if integration) or logs a note for follow‑up. | System records the escalation; prospect remains in “Engaged” stage with a note. |
| 7 | Journey ends; manager can review analytics on escalation rates. | Navigate to Analytics → Governance tab → view “Escalations Trend”. |

**Success Criteria:**  
- Escalation visible to manager within 1 minute of flag.  
- Manager can send a compliant response within 5 minutes.  
- All actions auditable in governance log.

---

## 3. Admin (Sales Operations / IT) Journeys

### 3.1 Journey: “Add a New Signal Data Source”
**Goal:** Extend the platform’s signal ingestion capabilities with a new API (e.g., a new industry news feed).

| Step | User Action | System Response |
|------|-------------|-----------------|
| 1 | Log in; lands on **Admin Dashboard** (or navigate to Settings). | Admin sees system health widgets and quick links. |
| 2 | Navigate to **Settings → Integrations → Data Sources**. | List of configured sources (e.g., NewsAPI, Twitter, LinkedIn, Custom Webhook) with status (Active/Inactive), last sync, and error count. |
| 3 | Click **Add New Data Source**. | Form appears: fields for Source Name, Type (REST API, WebSocket, Polling), Auth Method (API Key, OAuth, None), Endpoint URL, Headers, Query Parameters, Polling Interval, Enable/Disable toggle. |
| 4 | Fill in the form: <br>• Name: “IndustryFeed XYZ” <br>• Type: REST API <br>• Auth: API Key (provide key) <br>• Endpoint: `https://api.industryfeed.com/v1/signals` <br>• Headers: `Accept: application/json` <br>• Query: `category=technology` <br>• Polling Interval: 5 minutes <br>• Enable: checked. | – |
| 5 | Click **Test Connection**. | System attempts a request to the endpoint; shows success/failure dialog with sample payload preview. |
| 6 | If test passes, click **Save**. | System saves the configuration, starts a background poller, and adds the source to the list with status “Active”. |
| 7 | Verify ingestion: go to **Live Signal Feed** → filter by Source = “IndustryFeed XYZ”. | New signals begin appearing within the polling interval. |
| 8 | Optionally, set up an alert for ingestion lag detector rule: navigate to **Governance → Policy Editor → Signal Rules** (if exists) to tag certain keywords. | – |
| 9 | Journey ends; admin documents the change in the Knowledge Center (optional). | Click **Contribute** → create article: “New Data Source: IndustryFeed XYZ – Added 2026‑07‑19”. |

**Success Criteria:**  
- New source added and tested in ≤ 4 minutes.  
- Signals appear in feed within one polling cycle after save.  
- No disruption to existing sources (health widgets stay green). |

---

### 3.2 Journey: “Update Governance Policy for PII Detection”
**Goal:** Refine the regex pattern for detecting personally identifiable information to reduce false positives.

| Step | User Action | System Response |
|------|-------------|-----------------|
| 1 | Log in; go to **Settings → Governance → Policy Editor**. | Tabs: PII Detection, Consent Keywords, Approval Rules, Audit Log. |
| 2 | Select the **PII Detection** tab. | Table of regex patterns (e.g., Email, Phone, SSI) with columns: Pattern, Description, Severity, Action (Block/Flag), Enabled toggle. |
| 3 | Locate the “Phone Number” pattern; observe that it’s flagging internal extensions (e.g., ext. 123) incorrectly. | Current pattern: `\b\d{3}[-.]?\d{3}[-.]?\d{4}\b`. |
| 4 | Click **Edit** on the Phone row. | Inline editor opens; manager modifies regex to exclude extensions: `\b\d{3}[-.]?\d{3}[-.]?\d{4}\b(?!\s*ext)`. |
| 5 | Click **Test Pattern** → provides a test string box. | Enter sample: “Call me at 555-123-4567 ext. 890” → system highlights match: only “555-123-4567”. |
| 6 | If test satisfactory, click **Save Pattern**. | System updates the pattern in real‑time; governance harness will use the new rule on next processing cycle. |
| 7 | Validate by sending a test outreach that contains a phone number with extension (should not be blocked). | Create a dummy prospect, run Outreach Generation, submit to Human Review → Governance check passes, no flag. |
| 8 | Journey ends; admin logs the change in the audit log (automatically) and may notify the team via an internal announcement. | Optionally, go to **Knowledge Center** → add article: “Updated PII Phone Regex to ignore extensions”. |

**Success Criteria:**  
- Policy update completed in ≤ 3 minutes.  
- Test confirms intended behavior (true positives still caught, false positives eliminated).  
- Change reflected in audit log with user ID and timestamp. |

---

### 3.3 Journey: “Run a Monthly Compliance Audit Report”
**Goal:** Generate a report for internal auditors showing all governance events for the past month.

| Step | User Action | System Response |
|------|-------------|-----------------|
| 1 | Log in; navigate to **Governance → Audit Log**. | Log view shows table of events: Timestamp, Event Type (PII, Consent, Policy), Severity, Actor (user/system), Description, Status (Open/Resolved). |
| 2 | Click **Filter** → set Date Range: “Last 30 days”. | Table refreshes to show only events within the window. |
| 3 | Optionally, add additional filters: Event Type = “PII Detection”, Severity = “High”. | Further narrows results. |
| 4 | Click **Export** → choose format: PDF (includes summary charts) or CSV (raw data). | System generates the file; download begins automatically or prompts for save location. |
| 5 | Verify the downloaded file contains expected columns and row count matches filtered view. | – |
| 6 | Journey ends; admin sends the report to auditors via email or secure share. | – |

**Success Criteria:**  
- Report generated in ≤ 10 seconds for up to 10k events.  
- Export includes all required fields and is properly formatted.  
- No performance degradation during generation. |

---

## 4. Cross‑Role Journey: “Feedback‑Driven Model Improvement”
**Goal:** Show how outcomes logged by SDRs trigger learning that improves future outreach generation (optional, if retraining enabled).

| Step | User Action | System Response |
|------|-------------|-----------------|
| 1 | SDR logs an outcome (Meeting Booked) via Feedback/Learning button (as in Journey 1.1, step 15). | `outcome_recorded` event published; EvidenceLog entry created; KnowledgeUpdater updates internal metrics (e.g., success rate per template). |
| 2 | If auto‑retrain is enabled (Admin setting), the system queues a lightweight retraining job overnight. | Admin sees a notification: “Model retrain scheduled for 02:00 UTC”. |
| 3 | During retraining, model weights are adjusted based on labeled outcomes (positive/negative). | Training logs stored; upon completion, new model version is deployed to the Outreach Generation harness. |
| 4 | Next day, SDR generates outreach for a similar prospect; the AI drafts reflect the learned preference (e.g., more concise subject lines). | SDR observes improved approval rate in Human Review Queue (fewer edits). |
| 5 | Journey complete; optional: SDR can view personal performance analytics showing improvement over time. | – |

**Success Criteria:**  
- Outcome logged in ≤10 seconds.  
- Retraining completes within the scheduled window without manual intervention.  
- Observable improvement in relevant metric (e.g., approval rate ↑ 5%) after one retraining cycle. |

---

## 5. Summary of Success Criteria Across Journeys

| Journey | Primary Success Metric |
|---------|------------------------|
| SDR: Signal → Meeting | ≤20 min from signal mark‑as‑relevant to meeting booked (excluding actual call). |
| SDR: Low‑Quality Signal | One‑click dismissal, no prospect created. |
| SDR: Edit Outreach | Edit‑to‑resubmit ≤2 min. |
| Manager: Team Review | Identify low‑metric rep in ≤3 clicks; export <5 sec. |
| Manager: Escalation | See escalation ≤1 min; respond ≤5 min. |
| Admin: Add Data Source | Add & test ≤4 min; signals appear within one polling cycle. |
| Admin: Update PII Pattern | Update & test ≤3 min; validation passes. |
| Admin: Compliance Report | Generate ≤10 sec for 10k events. |
| Cross‑Role: Feedback Loop | Outcome logged ≤10 sec; retraining auto‑completes; metric improvement observed. |

These journeys collectively demonstrate that the platform supports efficient, role‑appropriate workflows while maintaining governance, traceability, and continuous improvement.

---
*Document Version: 1.0*
*Last Updated: $(date +%Y-%m-%d)*