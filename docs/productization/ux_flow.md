# UX Flow Document

## Overview
This document outlines the primary user flows for the Social SDR Agent platform, covering the three main user roles: SDR, Sales Manager, and Admin. Each flow describes the end‑to‑end journey from login to key task completion, highlighting decision points, system feedback, and handoffs between harnesses.

## Common Entry Point
All users begin at the **Login Page** (SSO or credentials). After authentication, they are routed to a role‑specific home dashboard.

---

## 1. SDR (Individual Contributor) Flow

### 1.1 Daily Start
1. Login → **SDR Dashboard** (personalized overview).
2. Dashboard widgets: 
   - Today’s Signals (count, trend)
   - Prospect Pipeline (count by stage)
   - Outreach Ready for Review
   - Pending Human Review Tasks
   - Activity Feed (recent actions)
3. SDR reviews the **Signal Feed** widget to see new signals.

### 1.2 Signal Review & Prospect Identification
1. Click **Live Signal Feed** from dashboard or navigation.
2. View list of incoming signals (news, social posts, intent data).
3. For each signal, SDR can:
   - **Mark as Relevant** → triggers Prospect Identification harness.
   - **Dismiss** → signal archived.
   - **Snooze** → temporarily hide.
4. When a signal is marked relevant, the system automatically:
   - Creates a prospect record (if not existing) via Prospect Identification harness.
   - Enriches the prospect via Research harness.
   - Adds the prospect to the **Prospect Pipeline** (New stage).

### 1.3 Prospect Research & Outreach Preparation
1. Navigate to **Prospect Pipeline** → select a prospect in the **Research Complete** stage.
2. View the **Prospect Details** screen:
   - Summary card (company, role, signals).
   - Research details (technographics, recent news, intent topics).
   - Suggested talking points.
3. Click **Generate Outreach** → triggers Outreach Generation harness.
4. System produces a draft email sequence (or LinkedIn message set) and moves the prospect to **Outreach Awaiting Review**.

### 1.4 Human Review & Approval
1. Go to **Human Review Queue**.
2. List of outreach drafts awaiting approval:
   - Preview of each message.
   - Signals & research that influenced the copy.
   - Compliance flags (if any from Governance).
3. SDR reviews each draft:
   - **Approve** → sends to Outreach Studio for scheduling/sending; prospect moves to **Outreach Sent**.
   - **Edit** → opens editor, saves revised draft, re‑queues for approval.
   - **Reject** → provides feedback; prospect returns to Outreach Generation for revision.
4. Upon approval, system logs the outreach event to the Event Bus (outreach_generated) and sends via integrated sequencer (if configured) or marks as ready for manual send.

### 1.5 Conversation Management
1. When a prospect replies, the conversation is captured via the Conversation Management harness.
2. SDR sees new replies in **Conversation Center** (inbox‑style view).
3. For each conversation thread:
   - View prospect profile sidebar.
   - See sentiment analysis (positive/neutral/negative) and suggested next steps.
   - Options: **Reply**, **Schedule Call**, **Mark as Interested**, **Mark as Not Interested**.
4. Selecting an option triggers the appropriate harness (e.g., logging outcome via Feedback/Learning, scheduling follow‑up via Conversation Management).

### 1.6 Feedback & Learning
1. After a call/meeting outcome is known, SDR logs the result:
   - Via **Feedback/Learning** button on prospect or conversation.
   - Selects outcome (Meeting Booked, Response Positive, Response Negative, No Response).
   - Optional free‑form notes.
2. System stores outcome in KnowledgeUpdater and EvidenceLog; triggers model retraining (if enabled).

### 1.7 End of Day / Review
1. Return to **SDR Dashboard** to see:
   - Metrics: signals processed, prospects contacted, replies received, meetings booked.
   - Pending actions (e.g., follow‑ups due tomorrow).
2. Optionally export daily activity report.

---

## 2. Sales Manager Flow

### 2.1 Manager Dashboard
1. Login → **Manager Dashboard** (team‑wide view).
2. Widgets:
   - Team Signal Volume (total signals processed per rep).
   - Pipeline Health (prospects by stage, conversion rates).
   - Outreach Performance (messages sent, reply rates, meetings booked).
   - Compliance Alerts (governance flags, overdue reviews).
   - Leaderboard (top performers by meetings booked).
3. Drill‑down: click a metric to see detailed report.

### 2.2 Team Performance Review
1. Navigate to **Analytics** → **Team Performance** tab.
2. Filter by date range, individual rep, or segment.
3. View charts:
   - Signal-to-Prospect conversion funnel.
   - Outreach engagement over time.
   - Average time per stage.
4. Export report or schedule email delivery.

### 2.3 Coaching & Feedback
1. From Analytics or directly from a rep’s profile, manager can:
   - View individual prospect timelines.
   - See which outreach variants performed best (A/B test results if enabled).
   - Add coaching notes or approve custom talk tracks.
2. Manager can also **override** governance decisions (if policy permits) via Admin override workflow.

### 2.4 Process Audits
1. Access **Governance** screen to review:
   - Flagged PII incidents.
   - Consent verification logs.
   - Outbound message compliance checks.
2. Approve or request remediation.

### 2.5 Settings & Configuration (Limited)
1. Navigate to **Settings** → **Team Settings**.
2. Adjust:
   - Signal source weights.
   - Outreach tone preferences.
   - Notification thresholds.
   - User roles and permissions (if delegated).

---

## 3. Admin (Sales Operations / IT) Flow

### 3.1 System Dashboard
1. Login → **Admin Dashboard** (infrastructure & usage view).
2. Widgets:
   - System Health (event bus latency, queue depths).
   - Usage Metrics (active users, API calls, storage).
   - Security Events (failed logins, policy violations).
   - Integration Status (CRM, email sequencer, data source connectors).
   - License Utilization.

### 3.2 Configuration Management
1. Go to **Settings** → **System Configuration**.
2. Tabs**:
   - **Data Sources**: Add/remove API keys for news, social, intent providers.
   - **Integration Connectors**: Configure CRM (Salesforce, HubSpot), email sequencer (Outreach, SalesLoft), calendar.
   - **Governance Policies**: Edit PII regex patterns, consent keywords, approval workflow rules.
   - **AI Model Settings**: Select base model, adjust temperature, enable/disable retraining schedule.
   - **Branding & Localization**: Upload logo, set language, date/time formats.
   - **User Management**: Invite users, assign roles (SDR, Manager, Admin), set SSO groups.

### 3.3 Monitoring & Alerts
1. Navigate to **Monitoring** → **Logs & Alerts**.
2. View live event bus stream (optional).
3. Set up alert rules (e.g., signal ingest lag >5min, high rejection rate in governance).
4. Receive notifications via email, Slack, or webhook.

### 3.4 Maintenance
1. Schedule periodic tasks:
   - Model retraining trigger.
   - Database backup.
   - Log rotation.
2. Execute one‑off actions:
   - Reprocess failed signals.
   - Bulk import/export of prospect lists.
   - Reset user passwords.

### 3.5 Audit & Compliance Reporting
1. Go to **Governance** → **Audit Log**.
2. Filter by date, user, action type (e.g., outreach sent, data accessed).
3. Generate compliance reports (CSV/PDF) for internal or external auditors.
4. Export evidence logs for legal review.

---

## 4. Cross‑Role Flows

### 4.1 Onboarding New SDR
1. Admin creates user account and assigns SDR role.
2. New SDR logs in, sees onboarding checklist on dashboard:
   - Complete profile.
   - Connect LinkedIn/email (if applicable).
   - Review governance policy.
   - Run a sample signal‑to‑outreach cycle (sandbox mode).
3. Upon completion, admin gets notification and can grant full access.

### 4.2 Escalation Path
- If a prospect replies with a legal/compliance concern, Conversation Management flags it.
- SDR can escalate to Manager via **Escalate** button.
- Manager reviews, may involve Legal/Compliance team via shared evidence log.
- Resolution logged back to prospect timeline.

### 4.3 Feedback Loop to Product Team
- Any user can submit feedback via **Feedback** button (bottom‑right).
- Feedback captured in external system (e.g., JIRA) with automatic inclusion of session ID and timestamps for reproducibility.

---

## 5. Error & Edge‑Case Handling

| Situation | System Response |
|-----------|-----------------|
| Signal source API timeout | Retry with exponential backoff; after 3 attempts, show warning in Signal Feed and log to admin. |
| Outreach generation fails (model error) | Show friendly error; allow manual draft creation; log incident for AI team. |
| Human reviewer takes >24h to act | Escalation notification to manager; item highlighted in red in queue. |
| Duplicate prospect detected | System merges records, preserves activity history, notifies user. |
| Governance blocks outreach due to PII | Display redacted preview; user must remove/edit PII before resubmitting. |

---

## 6. Success Criteria for Flows
- **SDR**: Able to complete a full signal‑to‑meeting cycle in ≤15 minutes on average (manual steps only).
- **Manager**: Able to identify a rep’s coaching opportunity within 2 clicks.
- **Admin**: Able to provision a new data source and verify its health within 10 minutes.

---
*Document Version: 1.0*
*Last Updated: $(date +%Y-%m-%d)*