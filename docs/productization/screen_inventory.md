# Screen Inventory

This document enumerates each primary screen of the Social SDR Agent platform. For every screen we list:
- **Purpose** – the main user goal(s) the screen supports.
- **Widgets** – the UI components (cards, tables, charts, forms, etc.) that appear on the screen.
- **Backend API Dependencies** – the internal services / endpoints (or event‑bus topics) that the screen relies on to fetch or push data.
- **User Actions** – the key interactions a user can perform directly from the screen.
- **Success Criteria** – measurable outcomes that indicate the screen is fulfilling its purpose effectively.

> **Note:** All screens consume data from the internal **Event Bus** (publish/subscribe) and/or call internal HTTP services (e.g., Kernel services, Harness services). Exact endpoint URLs are omitted for brevity; they follow the pattern `/api/<service>/<operation>` and are secured via internal service‑to‑service auth.

---

## 1. Dashboard (SDR / Manager / Admin variants)

| Aspect | Details |
|--------|---------|
| **Purpose** | Provide an at‑a‑glance overview of key metrics, pending actions, and system health tailored to the user’s role. |
| **Widgets** | • Role‑specific header (welcome message, quick‑create buttons). <br>• Metric Cards (signals processed, prospects in pipeline, outreaches sent, replies received, meetings booked, compliance alerts). <br>• Recent Activity Feed (reverse‑chronological list of user’s own actions). <br>• Pending Tasks Widget (human‑review count, follow‑ups due today). <br>• Team Performance Mini‑Leaderboard (manager/admin view). <br>• System Health Indicators (admin: event‑bus lag, queue depth, API error rate). |
| **Backend API Dependencies** | • `GET /api/dashboard/metrics?role={role}` – aggregates counts from KnowledgeUpdater, EvidenceLog, and Harness services. <br>• `GET /api/dashboard/activity?limit=20` – reads from ActivityLog service. <br>• `GET /api/dashboard/pending-tasks` – queries Human Review queue and Follow‑up scheduler. <br>• `GET /api/dashboard/team-leaderboard` (manager/admin) – aggregates per‑user stats. <br>• `GET /api/dashboard/system-health` (admin) – queries Event Bus metrics and service health endpoints. |
| **User Actions** | • Click a metric card to drill‑down to the corresponding detailed screen (e.g., click “Signals Processed” → Live Signal Feed). <br>• Mark a notification as read / dismiss. <br>• Use the quick‑create button to start a new outreach or log a call. <br>• Filter the activity feed by type or date. <br>• (Manager) Sort leaderboard by different metrics. |
| **Success Criteria** | • Page loads ≤ 2 seconds (cached data). <br>• Metrics refresh automatically every 30 seconds without full reload. <br>• Click‑through to detailed screens preserves context (pre‑applied filters). <br>• Administrator sees accurate system health (no false alerts). |

---

## 2. Live Signal Feed

| Aspect | Details |
|--------|---------|
| **Purpose** | Display real‑time (or near‑real‑time) streams of external signals (news, social, intent) for triage and enrichment. |
| **Widgets** | • Filter Bar (keywords, source, date range, relevance threshold). <br>• Sort Controls (time, relevance, source). <br>• Signal Cards (each shows: headline, source, timestamp, relevance score, excerpt, action buttons). <br>• Bulk Actions Toolbar (select multiple → Mark Relevant, Dismiss, Snooze, Export). <br>• Pagination / Infinite Scroll. |
| **Backend API Dependencies** | • `GET /api/signals?filter=&sort=&page=&size=` – queries Signal Monitoring harness (reads from signal store). <br>• `POST /api/signals/{id}/mark-relevant` – triggers Prospect Identification harness via event bus. <br>• `POST /api/signals/{id}/dismiss` – archives signal. <br>• `POST /api/signals/{id}/snooze` – temporarily hides until time‑elapsed. <br>• `GET /api/signals/export?format=csv` – streams filtered results. |
| **User Actions** | • Apply/change filters and see immediate update (debounced 300 ms). <br>• Sort column ascending/descending. <br>• Click a signal card to view full detail (modal or side‑panel). <br>• Select one or more signals and apply bulk actions. <br>• Save a filter set as a named view for quick recall. |
| **Success Criteria** | • New signals appear in the feed within the configured polling interval (default ≤ 30 s). <br>• Filter changes update the list ≤ 1 second after debounce. <br>• Bulk actions on 100 items complete ≤ 2 seconds (background job). <br>• Export of 10 k rows finishes within 5 seconds and yields a correctly formatted CSV. |

---

## 3. Prospect Pipeline (Kanban Board)

| Aspect | Details |
|--------|---------|
| **Purpose** | Visualize prospects across the sales‑development stages (New → Research Complete → Outreach Awaiting Review → Outreach Sent → Engaged → Meeting Booked → Lost/Won). |
| **Widgets** | • Kanban Columns (each representing a stage). <br>• Prospect Cards inside columns (show: name, company, top signal, stage‑specific badge, avatar if available). <br>• Column Headers with count and WIP limit indicator (if configured). <br>• Search Bar (filter cards by name, company, tags). <br>• Add Prospect button (manual entry). <br>• Export Column (CSV of cards in column). |
| **Backend API Dependencies** | • `GET /api/pipeline?stage=&search=&limit=` – returns paginated prospect list per stage (reads from Prospect store). <br>• `POST /api/prospects` – creates a new prospect (manual entry). <br>• `POST /api/prospects/{id}/transition?toStage=` – moves a prospect between columns (triggers relevant harness events). <br>• `GET /api/prospects/{id}` – full prospect detail (used when clicking a card). <br>• `GET /api/pipeline/export?stage=&format=csv`. |
| **User Actions** | • Drag‑and‑drop a prospect card from one column to another (triggers stage transition). <br>• Click a card to open the Prospect Details side‑panel (preserves pipeline view). <br>• Use search to narrow cards across all columns. <br>• Click “Add Prospect” to open a quick‑create modal. <br>• Use column‑level export to pull a list for offline work. |
| **Success Criteria** | • Drag‑and‑drop movement updates the stage within 1 second and reflects in the backend instantly. <br>• Column counts stay accurate after each move (no off‑by‑one errors). <br>• Search returns results within 1 second for up to 10 k prospects. <br>• Adding a prospect via modal completes in <2 seconds and appears in the correct column (default “New”). |

---

## 4. Prospect Details

| Aspect | Details |
|--------|---------|
| **Purpose** | Present a comprehensive view of a single prospect, enabling research review, outreach management, and activity tracking. |
| **Widgets** | • Header Bar (prospect name, company, title, avatar, edit button). <br>• Tabbed Interface: <br> - **Overview** – contact info, company details, current stage, tags, source signal. <br> - **Research** – technographics, intent topics, recent news snippets, suggested talking points. <br> - **Outreach** – list of sent messages, open/click/reply rates, sequence enrollment status, A/B test variants. <br> - **Activity** – chronological timeline of all interactions (signals, outreaches, conversations, notes, tasks). <br> - **Notes & Tasks** – free‑form notes, follow‑up tasks with due dates and reminders. <br>• Sidebar (optional) – quick stats: signals seen, days in pipeline, last contact, next recommended action. |
| **Backend API Dependencies** | • `GET /api/prospects/{id}` – returns full prospect object (includes embedded research, outreach summaries, activity references). <br>• `PUT /api/prospects/{id}` – updates editable fields (name, title, phone, email, tags). <br>• `POST /api/prospects/{id}/notes` – adds a note. <br>• `POST /api/prospects/{id}/tasks` – creates a follow‑up task. <br>• `GET /api/prospects/{id}/outreach` – paginated list of outreach attempts. <br>• `GET /api/prospects/{id}/activity` – chronological activity feed. |
| **User Actions** | • Edit basic contact info via inline edit or edit button. <br>• Switch tabs to view different aspects. <br>• From Outreach tab, click a sent message to view full content and metrics. <br>• From Activity tab, filter by type (e.g., show only calls). <br>• Add a note or task; set due date and reminder. <br>• Use the “Start Outreach” button (if in eligible stage) to launch Outreach Studio with the prospect pre‑loaded. |
| **Success Criteria** | • Page loads initial data ≤ 1.5 seconds (lazy‑load tabs for heavy sections like full activity). <br>• Inline edits save and reflect without full reload (<1 s). <br>• Tab switching is instant (client‑side show/hide). <br>• Adding a note/task persists and appears in the activity stream within 1 second. <br>• The “Start Outreach” button correctly passes the prospect ID to Outreach Studio and defaults the template. |

---

## 5. AI Research

| Aspect | Details |
|--------|---------|
| **Purpose** | Allow manual enrichment of a prospect using external data sources (e.g., LinkedIn, Crunchbase, news APIs) and store the findings back to the prospect record. |
| **Widgets** | • Prospect Selector (dropdown or search to pick a prospect; defaults to context if opened from Prospect Details). <br>• Source Panel – checkboxes for data providers (LinkedIn, Crunchbase, News, Patent, Custom API). <br>• Query Builder – free‑text keyword field, date range, geography, company size filters. <br>• Results Area – cards or table showing fetched records (title, snippet, source, relevance). <br>• Add to Prospect button per result (or bulk‑add). <br>• Save & Finish button to write all selected snippets into the prospect’s research fields. <br>• Research History (accordion) showing past enrichment timestamps and sources used. |
| **Backend API Dependencies** | • `GET /api/prospects?search=&limit=` – for prospect selector dropdown. <br>• `POST /api/research/search` – federated search call that orchestrates calls to external APIs (through adapters) and returns deduped, scored results. <br>• `POST /api/prospects/{id}/research` – appends new research snippets to the prospect’s research array (or updates specific fields like technographics). <br>• `GET /api/prospects/{id}/research/history` – returns log of prior enrichment sessions. |
| **User Actions** | • Select a prospect (or confirm pre‑filled). <br>• Choose one or more data sources to query. <br>• Enter search terms and adjust filters; click **Search**. <br>• Review results; select checkboxes on items to import. <br>• Click **Add to Prospect** (or **Add All**) to push selected snippets. <br>• After selections, click **Save & Finish** to persist and close. <br>• Expand Research History to view past enrichment jobs. |
| **Success Criteria** | • Search request returns results ≤ 3 seconds (depending on external API latency; show loading spinner). <br>• Each selected result can be added to the prospect with a single click; UI shows confirmation toast. <br>• Saved research appears instantly in the Prospect Details → Research tab. <br>• Research History entry is created with timestamp, sources used, and number of snippets added. <br>• No duplicate snippets are added unless user explicitly chooses to allow duplicates. |

---

## 6. Outreach Studio

| Aspect | Details |
|--------|---------|
| **Purpose** | Compose, personalize, and configure outreach sequences (email/LinkedIn) before sending them for human review. |
| **Widgets** | • Prospect Sidebar (shows name, company, key intel for personalization). <br>• Template Selector – dropdown of saved sequences (editable, with tags like “Cold Intro”, “Follow‑up”, “Event Invite”). <br>• Step Builder – ordered list of outreach steps (e.g., Email 1, LinkedIn Connect, Email 2). Each step contains: <br> - Channel selector (Email / LinkedIn). <br> - Subject / Message body editor (rich text with merge‑field toolbar). <br> - Send delay (days/hours after previous step). <br> - A/B variant toggle (create variant A/B). <br>• Personalization Helper – insert merge fields ({{first_name}}, {{company}}, {{recent_signal}}, etc.) with a button to browse available fields from the prospect. <br>• Preview Mode – toggle to see the filled‑in version for the current prospect. <br>• Save as Template button. <br>• Submit for Review button (sends draft to Human Review Queue). <br>• Cancel button. |
| **Backend API Dependencies** | • `GET /api/outreach/templates` – list of saved templates (name, steps, tags). <br>• `POST /api/outreach/templates` – create a new template from the current step builder. <br>• `PUT /api/outreach/templates/{id}` – update an existing template. <br>• `POST /api/outreach/drafts` – creates a draft instance linked to a prospect and template (or free‑form steps). <br>• `PUT /api/outreach/drafts/{id}` – updates a draft (used when editing). <br>• `POST /api/outreach/drafts/{id}/submit` – moves draft to Human Review Queue (publishes outreach_drafted event). <br>• `GET /api/outreach/drafts/{id}/preview` – returns rendered content with placeholders replaced by prospect data (used for preview). |
| **User Actions** | • Choose a template or start from scratch. <br>• Edit step order, channels, timing, and content. <br>• Insert merge fields via the helper or toolbar. <br>• Switch to Preview to see how the message looks for the selected prospect. <br>• Save the current configuration as a new template (or overwrite existing). <br>• Submit the draft for human review; upon success, a confirmation toast appears and the user is redirected to the Human Review Queue (or stays and sees status update). <br>• Cancel discards changes (with optional dirty‑form warning). |
| **Success Criteria** | • Template load/save ≤ 1 second. <br>• Preview generation ≤ 800 ms (client‑side merge). <br>• Submit for Review validates required fields and persists draft within 1 second; user sees immediate confirmation. <br>• Draft is correctly linked to the prospect ID and appears in the Human Review Queue with the correct preview. <br>• All editable fields have clear labels and accessible ARIA attributes. |

---

## 7. Human Review Queue

| Aspect | Details |
|--------|---------|
| **Purpose** | Provide a centralized inbox where outreach drafts (and optionally other items needing approval) are reviewed, edited, or rejected before they are sent. |
| **Widgets** | • Filter Bar (by prospect, template, submitter, date range, status). <br>• Sort Options (submitted‑at, priority). <br>• List View – each row shows: prospect name, snippet of subject/body, submitter avatar, timestamp, status icons (Pending, Edited, Rejected), and action buttons (Preview, Edit, Approve, Reject). <br>• Bulk Actions (select multiple → Approve/Reject). <br>• Preview Pane (opens on clicking Preview or hovering) showing full subject and body with merge fields resolved. <br>• Comments / Reason field shown when rejecting (mandatory free‑text). |
| **Backend API Dependencies** | • `GET /api/review/queue?filter=&sort=&page=&size=` – returns paginated draft records (reads from Outreach draft store). <br>• `GET /api/review/preview/{draftId}` – returns rendered content for a specific draft. <br>• `POST /api/review/{draftId}/approve` – marks draft as approved, triggers outreach_send event (or moves to scheduled). <br>• `POST /api/review/{draftId}/reject` – records rejection reason and returns draft to Outreach Studio for edits. <br>• `POST /api/review/{draftId}/edit` – updates draft content (used when editing in‑place). <br>• `POST /api/review/bulk-action` – processes multiple IDs with same action (approve/reject). |
| **User Actions** | • Apply filters to narrow the list (e.g., show only items submitted by me in the last 24 h). <br>• Click **Preview** to see the full content without leaving the list. <br>• Click **Edit** to launch Outreach Editor with the draft loaded. <br>• Click **Approve** to send the draft to the sending pipeline (or schedule). <br>• Click **Reject**, provide a reason, and submit – the draft returns to Outreach Studio with the rejection note attached. <br>• Use bulk select to approve/reject multiple items at once. <br>• After action, the item disappears from the queue (or moves to a “Processed” tab if retained). |
| **Success Criteria** | • List loads initial page ≤ 1.5 seconds (with pagination). <br>• Filter changes update results ≤ 800 ms (debounced). <br>• Approve/Reject actions persist state and remove item from the queue within 1 second. <br>• Bulk actions on 50 items complete ≤ 2 seconds. <br>• Rejection reason is required and stored with the draft for audit. <br>• Approved drafts trigger the appropriate outreach sending workflow (verified via event bus). |

---

## 8. Conversation Center

| Aspect | Details |
|--------|---------|
| **Purpose** | Manage inbound conversations (email replies, LinkedIn messages, etc.) with prospects, enabling rapid response, sentiment assessment, and next‑step logging. |
| **Widgets** | • Filter Bar (by prospect, status (Unread/Read/Flagged), channel, date). <br>• Sort (most recent first, or by priority). <br>• Conversation List – each item shows: prospect avatar/name, snippet of latest message, timestamp, unread badge, sentiment icon (😊/😐/☹️), flag icon if applicable, and quick‑action buttons (Reply, Mark Read, Flag, Archive). <br>• Conversation Panel (opens when selecting a conversation): <br> - Header with prospect info. <br> - Message thread (chronological, collapsible). <br> - Sentiment & intent badges (auto‑generated). <br> - Reply composer (rich text with template insert). <br> - Internal note field (for CRM‑style notes). <br> - Action buttons: Schedule Call, Log Outcome, Transfer to Owner, Mark as Spam. |
| **Backend API Dependencies** | • `GET /api/conversations?filter=&sort=&page=&size=` – returns conversation summaries (reads from Conversation store). <br>• `GET /api/conversations/{id}` – full thread with messages. <br>• `POST /api/conversations/{id}/mark-read` – updates read flag. <br>• `POST /api/conversations/{id}/reply` – sends a reply (through outgoing channel). <br>• `POST /api/conversations/{id}/flag` – adds/removes a flag. <br>• `POST /api/conversations/{id}/archive` – moves to archive folder. <br>• `POST /api/conversations/{id}/note` – adds internal note (visible only to internal users). <br>• `POST /api/conversations/{id}/schedule-call` – creates a calendar event (if integration enabled) and logs the action. <br>• `POST /api/conversations/{id}/outcome` – logs call/meeting outcome (feeds into Feedback/Learning). |
| **User Actions** | • Apply filters to focus on unread or flagged items. <br>• Click a conversation row to open the detail panel (can keep list open side‑by‑side). <br>• Scroll through the message thread; use collapse/expand for long threads. <br>• Click **Reply** to open composer at bottom of thread; insert templates, add attachments, send. <br>• Mark a conversation as read/unread. <br>• Flag a conversation for follow‑up or escalation. <br>• Archive a conversation when resolved. <br>• Add an internal note (visible to teammates). <br>• Schedule a call via integrated calendar (or log manually). <br>• After a call, log the outcome (e.g., Meeting Booked, Not Interested). |
| **Success Criteria** | • List loads first page ≤ 1.5 seconds. <br>• Opening a conversation detail pane ≤ 800 ms (fetching thread). <br>• Send a reply ≤ 2 seconds (including delivery to external channel if instant). <br>• Flag/archive/unread actions persist immediately (<500 ms). <br>• Sentiment and intent badges appear after message ingestion (near‑real‑time). <br>• Logging a call outcome updates the prospect’s stage and triggers Feedback/Learning within 1 second. |

---

## 9. Analytics

| Aspect | Details |
|--------|---------|
| **Purpose** | Provide deep insights into signal‑to‑meeting conversion, outreach performance, team productivity, and compliance trends via interactive charts and exportable reports. |
| **Widgets** | • Date Range Selector (presets: Today, Yesterday, Last 7 days, Last 30 days, Custom). <br>• Metric Tabs (overview tabs): <br> - **Funnel** – visualizes conversion rates: Signals → Prospects → Outreach Sent → Replies → Meetings Booked → Customers. <br> - **Activity Over Time** – line/area charts for signal volume, outreaches sent, replies received per day. <br> - **Reply & Sentiment** – breakdown of replies by sentiment (positive/neutral/negative) and channel. <br> - **Team Leaderboard** – bar chart of reps by meetings booked, outreaches sent, reply rate. <br> - **Compliance Trends** – counts of PII flags, consent misses, escalation trends. <br>• Drill‑Down Controls – click a segment of a chart to filter underlying table. <br>• Export Button – CSV, PDF, or schedule email delivery. <br>• Save View – lets users pin a customized dashboard layout. |
| **Backend API Dependencies** | • `GET /api/analytics/funnel?range=` – returns counts per funnel stage for the period. <br>• `GET /api/analytics/activity-timeseries?metric=&interval=&range=` – returns time‑series data (signal count, outreaches sent, replies received). <br>• `GET /api/analytics/reply-sentiment?range=` – returns sentiment breakdown. <br>• `GET /api/analytics/team-leaderboard?range=&limit=` – returns per‑rep aggregated stats. <br>• `GET /api/analytics/compliance-trends?range=` – returns counts of governance events by type. <br>• `POST /api/analytics/export` – accepts payload (report type, format, filters) and returns a file URL or streams download. |
| **User Actions** | • Set date range to focus on a period of interest. <br>• Switch between tabs to view different analytical perspectives. <br>• Hover over chart points to see tooltips with exact values and percentages. <br>• Click a legend item to toggle series visibility. <br>• Click a bar/slice to drill into a detailed list (e.g., click “Meetings Booked” bar to see list of prospects that became meetings). <br>• Export the current view as PDF or CSV. <br>• Save a custom configuration (e.g., “My Weekly Sales Funnel”) for one‑click recall. |
| **Success Criteria** | • Initial load of all charts ≤ 2 seconds (with caching; subsequent tab switches < 500 ms). <br>• Changing date range updates all relevant charts ≤ 1 second. <br>• Drill‑down from a chart to a list loads within 1 second. <br>• Export of a 50 k‑row CSV completes within 3 seconds; PDF generation ≤ 5 seconds. <br>• Saved views persist across sessions and load instantly. |

---

## 10. Governance

| Aspect | Details |
|--------|---------|
| **Purpose** | Enable configuration, monitoring, and enforcement of compliance policies (PII detection, consent checks, approval workflows) and provide audit trails for regulatory adherence. |
| **Widgets** | • Policy Tabs: <br> - **PII Detection** – list of regex patterns with enabled toggles, test field. <br> - **Consent Keywords** – list of phrases that indicate consent (or lack thereof). <br> - **Approval Rules** – define when human review is required (e.g., all outreaches, only those containing certain keywords). <br> - **Escalation Rules** – conditions that auto‑flag conversations for manager review. <br>• Audit Log Viewer – filterable table of governance events (timestamp, event type, severity, actor, description, status). <br>• Test Harness – input box to simulate a piece of text and see which policies would trigger. <br>• Export Audit Log button. <br>• System Health (basic: queue depths, latency). |
| **Backend API Dependencies** | • `GET /api/governance/pii-patterns` – returns list of patterns. <br>• `PUT /api/governance/pii-patterns/{id}` – updates a pattern (regex, enabled flag). <br>• `GET /api/governance/consent-keywords` – returns list. <br>• `PUT /api/governance/consent-keywords/{id}` – updates. <br>• `GET /api/governance/approval-rules` – returns rule definitions. <br>• `PUT /api/governance/approval-rules/{id}` – updates. <br>• `GET /api/governance/audit-log?filter=&sort=&page=&size=` – paginated events. <br>• `POST /api/governance/test-pii` – body `{ "text": "..." }` returns matches. <br>• `POST /api/governance/test-consent` – similar. <br>• `GET /api/governance/export-audit?format=` – streams CSV/JSON. |
| **User Actions** | • Navigate to each tab to view and edit the relevant policy. <br>• In PII tab, edit a regex pattern, use the built‑in test box to verify matches against sample strings, then save. <br>• In Consent Keywords tab, add or remove phrases; test with sample sentences. <br>• In Approval Rules, adjust thresholds (e.g., require review if outreach contains “discount”). <br>• In Escalation Rules, define conditions (e.g., if sentiment negative for >2 messages). <br>• Use the Audit Log viewer to filter by date, event type, severity, or user; sort columns. <br>• Export the filtered audit log for external review. <br>• Click “Test Harness” on any tab to validate changes before saving. |
| **Success Criteria** | • Policy edit (e.g., changing a regex) saves within 1 second and is immediately applied to incoming data (no restart needed). <br>• Test harness returns matches ≤ 300 ms. <br>• Audit log filters update results within 800 ms (debounced). <br>• Export of 20 k audit rows completes ≤ 2 seconds. <br>• Invalid regex is caught client‑side and shows an inline error before saving. |

---

## 11. Knowledge Center

| Aspect | Details |
|--------|---------|
| **Purpose** | Serve as a searchable repository of institutional knowledge: standard operating procedures, call playbooks, FAQs, past escalation resolutions, architecture decisions (ADRs), and best‑practice guidelines. |
| **Widgets** | • Search Bar (top‑wide) with autocomplete and filters (type: SOP, Playbook, FAQ, ADR, Blog; tags; date range). <br>• Results List – each result card shows: title, type badge, snippet, relevance score, last updated, tags. <br>• Sort (relevance, date updated, title). <br>• Pagination / Infinite Scroll. <br>• Detail View – opens in a side‑panel or modal: full markdown/rendedered content, table of contents, “Edit” button (if authorized), “Related” section, “Comments/Discussion” thread. <br>• Create Article button (for users with contributor rights). <br>• Version History (shows prior edits, diff view). <br>• Subscribe/Follow button to get notifications on updates to an article or topic. |
| **Backend API Dependencies** | • `GET /api/kb/search?q=&filters=&page=&size=&sort=` – returns articles with ranking. <br>• `GET /api/kb/{id}` – full article (including metadata, content, version). <br>• `POST /api/kb` – creates a new article (requires auth). <br>• `PUT /api/kb/{id}` – updates an article (creates new version). <br>• `DELETE /api/kb/{id}` – soft‑delete or archive (if permitted). <br>• `GET /api/kb/{id}/versions` – lists prior versions. <br>• `GET /api/kb/{id}/related` – returns related articles via tag similarity. <br>• `POST /api/kb/{id}/comment` – adds a discussion comment. |
| **User Actions** | • Enter keywords in the search bar; see instant suggestions (debounced 300 ms). <br>• Press Enter or click search to view results page. <br>• Apply filters on the results pane (e.g., show only ADRs from last 6 months). <br>• Sort results by relevance or date. <br>• Click a result to open the detail view; read the content, use table of contents to jump sections. <br>• If permitted, click **Edit** to modify the article; after editing, click **Save** creates a new version. <br>• View version history and revert to a prior version if needed. <br>• Add a comment to discuss or suggest improvements. <br>• Click **Follow** to receive notifications (in‑app or email) when the article changes. |
| **Success Criteria** | • Search returns results ≤ 1.5 seconds for a corpus of up to 50 k articles (with basic relevance ranking). <br>• Filter changes update the list ≤ 800 ms. <br>• Opening an article (detail view) ≤ 1 second. <br>• Saving an edit creates a new version within 2 seconds and increments the version number. <br>• Related articles pane loads ≤ 1 second and shows at least three relevant items. <br>• Comment submission persists and appears instantly in the discussion thread. <br>• Access control: users without permission see only the title and snippet, with a “Request Access” prompt. |

---

## 12. Settings

| Aspect | Details |
|--------|---------|
| **Purpose** | Central hub for configuring user preferences, team and organizational settings, integrations, AI model options, branding, and system administration (for admins). |
| **Widgets** | • Navigation Sidebar (list of settings sections: General, Team & Users, Integrations, AI & Models, Branding, System – admin only). <br>• Main Content Area – varies by selected section; typical UI includes forms, toggles, tables, and pickers. <br>• Save Changes button (persistent at bottom or top‑right). <br>• Cancel / Reset button. <br>• Notifications Center (bell icon) showing pending alerts or updates. |
| **Backend API Dependencies** *(varies by section)* | • **General**: <br> - `GET /api/settings/profile` – returns user preferences (timezone, date format, language, notification prefs). <br> - `PUT /api/settings/profile` – updates them. <br>• **Team & Users**: <br> - `GET /api/settings/users` – list of users with role, status, last login. <br> - `POST /api/settings/users` – invite new user. <br> - `PUT /api/settings/users/{id}` – update role, enable/disable, reset password. <br> - `DELETE /api/settings/users/{id}` – de‑provision. <br>• **Integrations**: <br> - `GET /api/settings/integrations` – returns configured connectors (CRM, email sequencer, data sources) with health status. <br> - `POST /api/settings/integrations` – add new connector. <br> - `PUT /api/settings/integrations/{id}` – update credentials or config. <br> - `DELETE /api/settings/integrations/{id}` – remove. <br>• **AI & Models**: <br> - `GET /api/settings/models` – list of available LLMs/embedding models with status (loaded, version). <br> - `POST /api/settings/models/{id}/load` – load/select a model for a given harness. <br> - `POST /api/settings/models/{id}/retrain` – trigger retraining job (if applicable). <br>• **Branding**: <br> - `GET /api/settings/branding` – returns logo URL, primary/secondary colors, custom CSS URL. <br> - `PUT /api/settings/branding` – upload new logo, change colors. <br>• **System** (admin): <br> - `GET /api/system/health` – aggregates service uptime, latency, error rates. <br> - `GET /api/system/logs?level=&service=&limit=` – retrieve recent logs. <br> - `POST /api/system/backup` – initiates backup and returns status. |
| **User Actions** | • Navigate via sidebar to the desired section. <br>• Adjust personal preferences (time zone, language, notification frequency) and hit **Save**; see toast confirmation. <br>• (Team Lead/Admin) Invite a new user: enter email, select role, send invite. <br>• (Admin) Add a new integration: choose type, fill in credentials/test connection, save. <br>• (Admin) Switch the active LLM for Outreach Generation from Model A to Model B, verify via test generation. <br>• (Admin) Update brand colors; see preview instantly; save to propagate across UI. <br>• (Admin) View system health dashboard; if any service shows high latency, drill down to logs. <br>• (Any) Use the bell icon to view notifications (e.g., “New version of model available”, “Integration token expires in 7 days”). |
| **Success Criteria** | • Setting changes persist and take effect within 1 second (where applicable). <br>• User profile updates reflect immediately in UI (e.g., time zone changes timestamps shown). <br>• Adding a new user results in an invitation email sent within 30 seconds and the user appears in the list with status “Invited”. <br>• Integration health check runs within 2 seconds of saving and shows accurate status (Connected / Error with message). <br>• Model switch completes within 5 seconds (includes warm‑up); subsequent generations use the new model without errors. <br>• Branding changes (logo, colors) visible after a full page reload (or via CSS variable update) and do not break layout. <br>• System health endpoint returns data within 1 second; log retrieval for last 100 lines ≤ 500 ms. |

---

## General Notes

- **Consistent UI Patterns**: All screens use a consistent header (application name, user avatar, notifications, help). Forms use inline validation with clear error messages. Buttons follow primary/secondary/danger semantics.
- **Error Handling**: Expected HTTP errors (4xx/5xx) display a non‑intrusive toast with a short message and an optional “Retry” or “Learn More” link.
- **Loading States**: Skeletons or spinners are shown while data is fetching; no action buttons are enabled until data is ready.
- **Accessibility**: All interactive elements meet WCAG 2.1 AA (keyboard navigable, ARIA labels, sufficient contrast).
- **Internationalization**: Strings are externalized; date, number, and currency formats respect the user’s locale.
- **Extensibility**: New screens can be added by following the same pattern: define API endpoints, wire them to the event bus where appropriate, and register the route in the client‑side router.

---
*Document Version: 1.0*
*Last Updated: $(date +%Y-%m-%d)*