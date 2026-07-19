# Navigation Map

This document outlines the navigation structure of the Social SDR Agent platform. It defines the primary, secondary, and contextual navigation elements that enable users to move between screens, access features, and maintain context as they perform their work.

## 1. Global Navigation (Persistent)

Located in the vertical sidebar (collapsible) or top header (for compact views). Visible to all authenticated users; items shown/hidden based on role and permissions.

| Item (Icon) | Label | Route (Conceptual) | Visible To | Description |
|-------------|-------|--------------------|------------|-------------|
| 🏠 | Dashboard | `/dashboard` | All | Role‑specific home page with metrics, activity feed, and quick actions. |
| 📡 | Live Signal Feed | `/signals` | All | Real‑time signal triage view. |
| 🎯 | Prospect Pipeline | `/pipeline` | All | Kanban board of prospects by stage. |
| 👤 | Prospect Details | `/prospects/:id` | All | Read‑only/detail view of a single prospect (opened from pipeline, search, or signal). |
| 👥 | Prospect List (search) | `/prospects` (optional) | All | Searchable list view (used when no specific prospect is selected). |
| 🔬 | AI Research | `/research` | All | Manual enrichment and external data lookup. |
| 📨 | Outreach Studio | `/outreach/studio` | All | Compose/edit outreach sequences and drafts. |
| 👀 | Human Review Queue | `/review/queue` | SDR, Manager (if permission) | Inbox of outreach drafts awaiting approval. |
| 💬 | Conversation Center | `/conversations` | All | Inbound message threads and replies. |
| 📊 | Analytics | `/analytics` | All | Reporting, dashboards, and export capabilities. |
| ⚖️ | Governance | `/governance` | Manager, Admin | Policy configuration, audit logs, compliance views. |
| 📚 | Knowledge Center | `/knowledge` | All | Searchable repository of SOPs, playbooks, FAQs, ADRs. |
| ⚙️ | Settings | `/settings` | All (subset based on role) | User preferences, team management, integrations, AI models, branding, system admin. |
| ❓ | Help / Documentation | `/help` | All | Links to user guides, video tutorials, and support contact. |
| 🔓 | Logout | (action) | All | Ends the session. |

> **Note:** The sidebar can be collapsed to icon‑only mode for extra horizontal space. Labels appear on hover or when expanded.

## 2. Secondary Navigation (Context‑Dependent)

Appears within a screen to switch between related views or to drill down.

| Screen | Navigation Element | Placement | Options |
|--------|--------------------|-----------|---------|
| Dashboard | Tabbed view (if multiple widgets groups) | Top of main content | Overview, Team, System (admin) |
| Prospect Details | Tabs | Below header | Overview, Research, Outreach, Activity, Notes & Tasks |
| Prospect Details (when opened from Pipeline) | Breadcrumb | Above header | Home > Pipeline > Prospect |
| Signal Detail (modal/sidepanel) | Breadcrumb | Above content | Home > Signals > Signal |
| Outreach Studio | Stepper (for multi‑step sequences) | Top of form | Step 1, Step 2, … |
| Outreach Studio | Template selector dropdown | Top of form | List of saved templates |
| Human Review Queue | Tabs (if implemented) | Top of list | Pending, My Submissions, Archived |
| Conversation Center | Sidebar (conversation list) + main pane | Left / right split | List view ↔ Conversation detail |
| Analytics | Tabbed views | Top of charts | Funnel, Activity, Reply Sentiment, Team Leaderboard, Compliance |
| Governance | Tabs | Below header | PII Detection, Consent Keywords, Approval Rules, Audit Log |
| Knowledge Center | Filters & Sort bar | Above results list | Search, Type, Tags, Sort, Display |
| Settings | Sidebar list (as described in Global) | Left | General, Team & Users, Integrations, AI & Models, Branding, System (admin) |
| Help / Docs | Accordion categories | Main page | Getting Started, FAQs, Troubleshooting, Release Notes |

## 3. Breadcrumbs

Used when navigating deep into an entity to provide a clear path back to higher‑level lists.

Examples:
- Home > Signals > Signal #12345
- Home > Pipeline > Prospect #Acme Corp
- Home > Prospects > Search Results > Prospect #Beta Inc
- Home > Outreach Studio > Draft #Draft‑001
- Home > Review Queue > Pending > Draft #042
- Home > Conversations > Conversation #Conv‑789
- Home > Analytics > Funnel > Q3 2026
- Home > Governance > Audit Log > Filtered View
- Home > Knowledge Center > Playbooks > Cold‑Call Playbook
- Home > Settings > Team & Users > User Profile

Breadcrumbs are clickable; selecting a segment jumps to that level.

## 4. Action‑Based Navigation (Modals / Side‑panels)

Certain actions open transient overlays that retain the underlying context.

| Origin | Triggered UI | Purpose | Return |
|--------|--------------|---------|--------|
| Any screen | **Global Create** (+ icon in header) | Quick‑start actions: New Signal (manual), New Prospect, New Outreach Draft, New Note, New Task. | Returns to same screen after submission (with toast). |
| Signal Card | **Mark as Relevant** (button) | Opens a small confirmation toast; no navigation change. | Stays on Signals screen. |
| Signal Card | **View Detail** (eye icon) | Side‑panel with full signal content and actions (Add to Prospect, Snooze, etc.). | Closes panel → back to Signals list. |
| Prospect Card (Pipeline) | **Open** (click card) | Side‑panel or modal showing Prospect Details (read‑only). | Close → back to Pipeline. |
| Prospect Details | **Start Outreach** (button) | Navigates to Outreach Studio with the prospect pre‑selected (replaces current view). | After submit or cancel, user can return via browser back or UI link to Prospect Details. |
| Outreach Studio | **Preview** (toggle) | Shows a modal/overlay with rendered content for the current prospect. | Close toggle returns to editor. |
| Human Review Queue | **Preview** (row action) | Modal showing full draft content. | Close returns to queue list. |
| Conversation List | **Open Conversation** (click row) | Split‑view: list remains, detail pane opens on right (or bottom on narrow screens). | Close pane → back to list only. |
| Knowledge Base | **Open Article** (click result) | Side‑panel or full‑page view; can navigate to related articles without losing search context. | Close or back to search results. |
| Settings | **Edit Profile** (inline) | Inline form within Settings > General. | Save cancels stay on same settings tab. |
| Help / Docs | **Open Article** (click link) | Full‑page view; breadcrumb shows Home > Help > Article. | Back button returns to previous help page. |
| Error Pages | **Try Again** / **Contact Support** | Simple message page with actions. | Return to previous page or home. |

## 5. Role‑Based Visibility Matrix

| Navigation Item | SDR | Sales Manager | Admin |
|-----------------|-----|---------------|-------|
| Dashboard | ✔ (personal) | ✔ (team view) | ✔ (system view) |
| Live Signal Feed | ✔ | ✔ | ✔ |
| Prospect Pipeline | ✔ | ✔ | ✔ |
| Prospect Details | ✔ | ✔ | ✔ |
| AI Research | ✔ | ✔ | ✔ |
| Outreach Studio | ✔ | ✔ | ✔ |
| Human Review Queue | ✔ (primary) | ✔ (oversight) | ✖ (unless given permission) |
| Conversation Center | ✔ | ✔ | ✔ |
| Analytics | ✔ (personal) | ✔ (team & comparative) | ✔ (org‑wide) |
| Governance | ✖ (view‑only maybe) | ✔ (policy view & audit) | ✔ (full edit) |
| Knowledge Center | ✔ | ✔ | ✔ |
| Settings | ✔ (profile & notifications) | ✔ (team‑level: users, integrations) | ✔ (all incl. system) |
| Help / Docs | ✔ | ✔ | ✔ |
| Logout | ✔ | ✔ | ✔ |

*Note:* “✖” means the item is hidden from the sidebar; however, a user with a direct link may still be blocked by backend authorization.

## 6. Responsive Behavior

| Breakdown | Layout |
|-----------|--------|
| **≥1200 px** (desktop) | Fixed left sidebar (collapsible) + main content area. |
| **992–1199 px** | Sidebar collapses to icons by default; can be expanded via hamburger. Top bar shows app title and user menu. |
| **768–991 px** (tablet) | Sidebar hidden; accessible via slide‑out drawer (hamburger icon). Top bar includes menu toggle. |
| **<768 px** (mobile) | Bottom navigation bar (5‑item tabs): Dashboard, Signals, Pipeline, Conversations, More (opens drawer with remaining items). |

## 7. Deep Linking & URL Strategy

- All top‑level items map to a predictable path as listed in **Global Navigation**.
- Entity‑specific routes use REST‑style identifiers: `/prospects/:id`, `/conversations/:id`, `/review/queue/:draftId`.
- Query parameters are used for filtering, sorting, and pagination: e.g., `/signals?source=rss&sort=relevance&page=2&size=25`.
- The application preserves scroll position and filter state when navigating back via the browser’s back button (uses history state).
- Authenticated routes redirect unauthenticated users to `/login` with a `?returnTo=` parameter.

## 8. Accessibility & Keyboard Navigation

- All navigational items are reachable via `Tab` key; sidebar items have `aria-label`.
- Escape key closes modals / side‑panels.
- Arrow keys navigate within dropdowns, tabs, and pickers.
- Focus trap is applied to modals.
- Screen‑reader labels announce current route and page title (updated via `document.title`).

## 9. Example User Flows (Illustrating Navigation)

### Flow A: SDR – Signal → Meeting
1. Login → **Dashboard** (`/dashboard`)  
2. Left sidebar → **Live Signal Feed** (`/signals`)  
3. Click a signal → side‑panel → **Mark as Relevant**  
4. System creates prospect; badge appears in pipeline.  
5. Left sidebar → **Prospect Pipeline** (`/pipeline`)  
6. Drag prospect from “New” to “Research Complete” (auto‑move after enrichment).  
7. Click prospect card → side‑panel **Prospect Details** (`/prospects/:id`)  
8. Tab **Research** → view enriched data.  
9. Click **Generate Outreach** → navigates to **Outreach Studio** (`/outreach/studio?prospectId=…`)  
10. Compose sequence, click **Submit for Review** → redirected to **Human Review Queue** (`/review/queue`).  
11. Approve draft → returns to queue (item removed).  
12. Outreach sent; prospect moves to “Outreach Sent”.  
13. Later, a reply appears in **Conversation Center** (`/conversations`).  
14. Open conversation, log outcome → triggers Feedback/Learning.  
15. Outcome updates prospect stage to “Meeting Booked”.  

### Flow B: Manager – Team Performance Review
1. Login → **Dashboard** (`/dashboard`) with manager view (team metrics).  
2. Left sidebar → **Analytics** (`/analytics`)  
3. Tab **Team Leaderboard** → view bar chart of meetings booked per rep.  
4. Click a bar representing a low‑performer → drills down to filtered **Prospect Pipeline** showing only that rep’s prospects.  
5. Open a prospect → review activity, add coaching note via **Notes & Tasks**.  
6. Return to **Analytics**, switch to **Activity Over Time** to see trend after coaching.  

### Flow C: Admin – Add New Data Source
1. Login → **Dashboard** (`/dashboard`).  
2. Left sidebar → **Settings** (`/settings`) → select **Integrations** tab.  
3. Click **Add Integration** → choose “News API” form.  
4. Fill endpoint, API key, test connection → success toast.  
5. Save → new source appears in list with green health indicator.  
6. (Optional) Go to **Governance** → **PII Detection** to add any needed patterns for the new source.  
7. Verify signal appears in **Live Signal Feed** after next poll cycle.  

## 10. Summary

The navigation model is designed to be:
- **Role‑appropriate** – each user sees only the sections they need.
- **Context‑aware** – secondary navigation and breadcrumbs keep users oriented.
- **Efficient** – common actions are reachable in ≤2 clicks or via global create button.
- **Extensible** – adding a new top‑level item only requires updating the sidebar configuration and registering the route.
- **Accessible** – keyboard‑first, screen‑reader friendly, and responsive across devices.

---
*Document Version: 1.0*
*Last Updated: $(date +%Y-%m-%d)*