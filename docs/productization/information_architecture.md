# Information Architecture

## Overview
This document outlines the structural organization of content, features, and navigation within the Social SDR Agent platform. It defines how information is grouped, labeled, and accessed to support efficient user workflows for SDRs, Sales Managers, and Administrators.

## Top-Level Navigation (Global Menu)
The persistent left‑hand sidebar (or top‑level horizontal bar, depending on layout) provides access to the following primary sections:

1. **Dashboard** – Personal/role‑specific overview.
2. **Live Signal Feed** – Real‑time stream of ingested signals.
3. **Prospect Pipeline** – Kanban‑style view of prospects by stage.
4. **Prospect Details** – Deep‑dive view of an individual prospect (accessed from Pipeline or Search).
5. **AI Research** – Manual research initiation and enrichment view.
6. **Outreach Studio** – Draft creation, editing, and approval queue.
7. **Human Review Queue** – Central inbox for outreach awaiting approval.
8. **Conversation Center** – Unified inbox for prospect replies and internal notes.
9. **Analytics** – Reporting and performance dashboards.
10. **Governance** – Policy management, audit logs, compliance views.
11. **Knowledge Center** – Searchable repository of insights, ADRs, and learned patterns.
12. **Settings** – User, team, and system configuration.

*Note:* Certain items may be conditionally visible based on role (e.g., Governance and Settings limited to Admin/Manager; Knowledge Center available to all).

## Information Grouping & Taxonomy

### 1. Entities & Core Objects
| Entity | Key Attributes | Relationships |
|--------|----------------|---------------|
| **Signal** | ID, source, timestamp, title, content, sentiment, relevance score, tags | Belongs to a Source; may link to one or more Prospects |
| **Prospect** | ID, company, name, title, email, phone, industry, size, technographics, source, status (New, Researching, Outreach Ready, Engaged, Customer, Disqualified) | Has many Signals; has many Outreach Attempts; belongs to a Sequence/Campaign |
| **Outreach** | ID, template/variant, channel (email/LinkedIn), send time, status (Draft, Approved, Sent, Bounced, Replied), personalization tokens | Belongs to a Prospect; linked to a Sequence |
| **Sequence/Campaign** | ID, name, goal, steps, enrollment criteria, active/inactive flag | Contains many Outreach items; assigned to Prospects |
| **Conversation** | ID, prospect ID, channel, timestamp, direction (in/out), content, sentiment, intent tags, outcome | Belongs to a Prospect; part of a Thread |
| **Feedback/Learning Record** | ID, prospect ID, outcome (Meeting Booked, Response Positive, etc.), notes, timestamp | Linked to Prospect and Outreach/Conversation |
| **Governance Event** | ID, type (PII detection, consent missing, policy breach), severity, timestamp, actor, resolution | Triggered by Outreach, Conversation, or Signal processing |
| **Knowledge Artifact** | ID, title, type (insight, adr, pattern, metric), content, tags, creation date, author | Searchable and relatable to Prospects, Signals, or Outreach |

### 2. Functional Modules (Harnesses) & Their Data Outputs
Each harness produces specific event types that feed the Event Bus and subsequently populate the data stores and UI.

| Harness | Primary Output Event | Consumed By (UI/Other Harnesses) |
|---------|----------------------|----------------------------------|
| Signal Monitoring | `signal_detected` | Signal Feed UI, Prospect Identification |
| Prospect Identification | `prospect_scored` | Prospect Pipeline update, Research trigger |
| Research | `prospect_enriched` | Prospect Detail view, Outreach Generation input |
| Outreach Generation | `outreach_drafted` | Human Review Queue |
| Human Review | `outreach_approved` / `outreach_rejected` | Outreach Studio (send) or back to Generation |
| Conversation Management | `conversation_received`, `conversation_updated` | Conversation Center, Feedback trigger |
| Feedback/Learning | `outcome_recorded` | Knowledge Updater, Model Retraining pipeline |
| Governance | `governance_flagged` | Audit Log, Alerting, Potential block of Outreach |
| Knowledge Updater | `knowledge_stored` | Knowledge Center search index |
| Evidence Log | `evidence_recorded` | Audit & compliance views |

### 3. Navigation Hierarchy (Site Map)

```
Home (Role‑Based Dashboard)
├── Dashboard
│   ├── Personal Metrics
│   ├── Team Overview (Manager/Admin)
│   └── System Health (Admin)
├── Live Signal Feed
│   ├── Signal List (infinite scroll)
│   ├── Signal Detail Sidebar
│   └── Actions: Mark Relevant/Dismiss/Snooze
├── Prospect Pipeline
│   ├── Kanban Columns: New → Researching → Outreach Ready → Outreach Sent → Engaged → Customer/Disqualified
│   ├── Card Preview (prospect snapshot)
│   ├── Filter & Search (by stage, score, owner, tags)
│   └── Bulk Actions (assign / edit)
├── Prospect Details (drill‑down from Pipeline or Search)
│   ├── Overview Tab
│   │   ├─ Contact Info
│   │   ├─ Company Info
│   │   ├─ Signal Timeline
│   │   └─ Engagement Summary
│   ├── Research Tab
│   │   ├─ Technographics
│   │   ├─ Intent Topics
│   │   ├─ News Mentions
│   │   └─ Suggested Talking Points
│   ├── Outreach Tab
│   │   ├─ Sent Messages
│   │   ├─ Open/Click/Reply Rates
│   │   └─ Sequences Enrolled
│   └── Activity Tab
│       ├─ All Interactions (signals, outreaches, conversations)
│       └─ Notes & Tasks
├── AI Research
│   ├── Manual Search Bar (external APIs)
│   ├── Enrichment Controls (select data points)
│   └── Save to Prospect
├── Outreach Studio
│   ├── Draft Editor (template + personalization)
│   ├── Variant A/B Testing
│   ├── Approval Workflow (Submit → Review → Approve/Reject/Edit)
│   └── Scheduled Send Calendar
├── Human Review Queue
│   ├── List of Pending Drafts
│   │   ├─ Preview Card
│   │   ├─ Compliance Flags
│   │   └─ Actions: Approve/Edit/Reject
│   └─ Bulk Approve (if policy permits)
├── Conversation Center
│   ├── In‑style Inbox (unread/banner)
│   ├── Thread View
│   │   ├─ Chronological Messages
│   │   ├─ Sentiment & Intent Badges
│   │   └─ Quick‑Response Templates
│   └─ Sidebar: Prospect Mini‑Profile
├── Analytics
│   ├── Dashboard Tab (pre‑built widgets)
│   │   ├─ Funnel Conversion
│   │   ├─ Activity Over Time
│   │   ├─ Reply & Sentiment Trends
│   │   └─ Team Leaderboard
│   ├── Reports Builder (custom queries)
│   └── Export (CSV, PDF, Scheduled Email)
├── Governance
│   ├── Policy Editor
│   │   ├─ PII Patterns
│   │   ├─ Consent Keywords
│   │   └─ Approval Rules
│   ├── Audit Log
│   │   ├─ Filter by Event Type, User, Date
│   │   └─ Export
│   ├── Incident Review (flagged items requiring action)
│   └─ Compliance Reports
├── Knowledge Center
│   ├── Search Bar (full‑text, faceted by type, tags, date)
│   ├── Article View
│   │   ├─ Title, Summary, Content
│   │   ├─ Related Articles
│   │   └─ Attachments (if any)
│   └─ Contribute Button (users can add insights)
└── Settings
    ├── General (profile, notifications)
    ├── Team & Users (roles, permissions, SSO)
    ├── Integrations (CRM, Email Sequencer, Data Sources)
    ├── AI & Models (model selection, temperature, retrain schedule)
    ├── Branding (logo, colors, domain)
    └── System (Admin only: logs, backups, maintenance)
```

### 4. URL Structure (Conceptual)
For a potential SPA, routes could follow a pattern like:
```
/dashboard
/signals
/signals/:id
/pipeline
/prospects
/prospects/:id
/prospects/:id/research
/prospects/:id/outreach
/outreach/studio
/review/queue
/conversations
/conversations/:id
/analytics
/governance
/knowledge
/settings
```
Query parameters handle filtering, sorting, and pagination (e.g., `/signals?source=rss&sort=relevance&page=2&size=25`).

### 5. Labeling & Terminology Guidelines
- Use **consistent verb‑noun** phrasing for actions: “Send Outreach”, “Review Draft”, “Approve Signal”.
- Align terminology with sales & marketing vernacular: “Prospect”, “Sequence”, “Cadence”, “Intent”, “Signal”.
- Avoid jargon overload; provide tooltips for technical terms (e.g., “Technographics”, “Intent Data”).
- Error messages: plain language, suggest next step (e.g., “Signal source timed out – please check your API key in Settings → Integrations”).

### 6. Search & Information Retrieval
- **Global Search** (top‑bar) searches across Signals, Prospects, Outreach, Conversations, and Knowledge Articles.
- Faceted filters: type, date range, owner, status, tags.
- Results ranked by relevance (recency, match score, user‑boosted items).
- Autosuggest as user types.

### 7. Accessibility & Internationalization Considerations
- All navigable elements reachable via keyboard (tab order, ARIA labels).
- Sufficient colour contrast (WCAG AA).
- Right‑to‑left layout support via configurable locale.
- Date/number formatting adapts to locale.

### 8. Maintenance & Evolution
- **Content Governance**: Assign owners for each major section (e.g., Product Owner for Dashboard, Engineering Lead for Signals).
- **Change Log**: Document IA updates in the Knowledge Center under “Architecture Decisions”.
- **Versioning**: If API‑driven, version backend endpoints; UI adapts via feature flags.

---
*Document Version: 1.0*
*Last Updated: $(date +%Y-%m-%d)*