# Component Hierarchy

This document presents a hierarchical breakdown of the user interface for the Social SDR Agent platform, following an atomic design methodology (atoms → molecules → organisms → templates → pages). The hierarchy is intended to guide frontend development, promote reuse, and ensure visual and interaction consistency.

## 1. Atoms
Atoms are the smallest, indivisible UI building blocks.

| Component | Description | States / Variants |
|-----------|-------------|-------------------|
| **Button** | Primary, secondary, danger, link, icon‑only. | default, hover, active, focused, disabled, loading |
| **Input Field** | Text, email, number, password, textarea, search. | default, focus, error, disabled, read‑only |
| **Select / Dropdown** | Single‑select, multi‑select with search. | closed, open, selected, disabled |
| **Checkbox** | Toggle binary state. | unchecked, checked, indeterminate, disabled |
| **Radio Button** | Mutually exclusive choice within a group. | unchecked, checked, disabled |
| **Switch** | On/off toggle (often for settings). | off, on, disabled |
| **Badge** | Small status indicator (dot, number, text). | variants: success, warning, info, error, default |
| **Icon** | Vector (SVG) or font icon. | solid, outline, sized (xs, sm, md, lg, xl) |
| **Avatar** | Circular image or initials fallback. | size: xs, sm, md, lg, xl; states: loading, error |
| **Label** | Text label for form fields. | required (*), optional |
| **Link** | Inline navigational or action link. | default, hover, active, visited |
| **Spinner** | Loading indicator. | size: sm, md, lg; color variants |
| **Progress Bar** | Shows completion percentage. | determinate, indeterminate |
| **Tooltip** | Short text on hover/focus. | placement: top, bottom, left, right |
| **Modal Backdrop** | Semi‑transparent layer behind modals. | show, hide |
| **Toast Container** | Positioned container for toast messages. | position: top‑right, top‑center, bottom‑right, etc. |
| **Typography** | Text styles: H1‑H6, body, caption, overline, code. | weights: regular, medium, bold; variants: muted, accent |
| **Divider** | Horizontal or vertical rule. | type: solid, dashed, dotted |
| **Menu Item** | Clickable entry in a dropdown or side nav. | default, active, disabled, with icon |
| **Chip** | Compact entity tag (e.g., skill, label). | removable, selectable, disabled |
| **Switch Group** | Group of related switches (e.g., feature flags). | – |
| **Slider** | Single or range selector. | min, max, step, value display |
| **File Input** | Upload control. | drag‑and‑drop zone, button style |

## 2. Molecules
Molecules are simple groups of atoms bonded together, forming the smallest reusable UI components.

| Component | Composing Atoms | Description |
|-----------|----------------|-------------|
| **Search Bar** | Input Field + Icon (search) + Button (clear) | Used in global header, tables, side panels. |
| **Button Group** | Button × n | For related actions (e.g., Accept/Reject). |
| **Form Field** | Label + Input/Select/Textarea + Help Text + Error Message | Base for all form inputs. |
| **Toolbar** | Button × n + Dropdown + Separator | Action bar above tables/lists (e.g., Export, Bulk Select). |
| **Card Header** | Title (Typography) + Subtitle + Actions (IconButton) | Header of a card component. |
| **Card Body** | Arbitrary content (text, list, chart, etc.) | Main area of a card. |
| **Card Footer** | ButtonGroup + Text (e.g., “Show more”) | Actions at bottom of a card. |
| **Avatar Group** | Avatar × n + Badge (for presence) | Shows multiple participants (e.g., in a thread). |
| **Badge Pill** | Background shape + Text + Icon | Used for status tags. |
| **Input with Prefix/Suffix** | Input Field + Icon/Text (e.g., $, @) | For currency, email, etc. |
| **Dropdown Menu** | Button (toggle) + List of Menu Items + Divider | Context menus, action menus. |
| **Navigation Item** | Menu Item (icon + label) + Indicator Dot (badge) | Side‑nav or top‑nav entry. |
| **Pagination Control** | Button (prev) + Page Numbers (links) + Button (next) | Bottom of tables/lists. |
| **Tag Input** | Input Field + Chip (selected) + Dropdown (suggestions) | For multi‑value entry like keywords. |
| **Statistic Card** | Icon + Title (Typography) + Value (large number) + Trend Indicator (icon+color) | Small KPI widget. |
| **Chart Wrapper** | SVG/Canvas container + Tooltip + Legend (basic) | Encapsulates a chart library (Recharts, Chart.js). |
| **Accordion Item** | Header (Button) + Content (collapsible) | Expandable section. |
| **Radio Group** | Legend (Typography) + Radio Button × n + Label | Mutually exclusive choice set. |
| **Switch Tile** | Switch + Label + Info Icon (tooltip) | Settings toggle with description. |
| **Empty State Illustration | svg) | body text +  (primary)   |  (shown when a list is empty). | 
| **Skeleton Loader** | Placeholder shapes (rect, circle) using same layout as real content. | Used while data loads. |
| **Contextual Menu (Right‑click)** | Paper (surface) + Menu Items | Custom context menu. |
| **Timeline Item** | Icon (circle) + Line + Content (text) | For activity feeds. |
| **Progress Stepper** | Step (circle + label) + Connector line | Multi‑stage process indicator. |

## 3. Organisms
Complex UI components composed of groups of molecules and atoms, forming distinct sections of an interface.

| Component | Key Sub‑Components (Molecules/Atoms) | Description |
|-----------|--------------------------------------|-------------|
| **Header / App Bar** | Logo (Image/Avatar), Search Bar, Navigation Items (Menu Item × n), User Avatar + Dropdown (Menu), Notifications Bell (IconButton + Badge) | Top‑level app shell. |
| **Sidebar Navigation** | Navigation Item × n (with icons), Collapse/Expand Button, Version/Badge Footer | Primary navigation (can be drawer on mobile). |
| **Breadcrumb Bar** | Separator‑linked Text Items (Link) + Icon (home) | Shows hierarchical location. |
| **Data Table** | Table Header (Sortable Column Header: Toolbar + Sort Icon), Table Row (Checkbox + Text + Action Buttons), Pagination (Pagination Control), Global Actions (Toolbar) | Used for lists of signals, prospects, conversations, etc. |
| **Filter Panel** | Accordion (multiple Accordion Items each with Form Fields + Button) + Apply / Reset Buttons | Side pane for refining lists (signals, prospects, etc.). |
| **Card (Generic)** | Card Header + Card Body + Card Footer | Container for varied content (KPIs, small lists, charts). |
| **KPI Dashboard Widget** | Statistic Card (multiple arranged in a grid) + optional Sparkline (Chart Wrapper) | Metric summary widget on dashboards. |
| **Signal Card** | Card Header (Source Icon + Timestamp) + Card Body (Title + Excerpt + Relevance Badge) + Card Footer (Action Buttons: Mark Relevant/Dismiss/Snooze) | Represents a single signal in the feed. |
| **Prospect Card (Kanban)** | Card Header (Avatar + Name + Company) + Cell (Tags/Badges for Stage) + Cell (Snippet of top signal) + Footer (Action Icons: Edit, View Details) | Used within the Pipeline columns. |
| **Research Result Item** | Card (small) with Source Icon, Title, Snippet, Relevance Score, “Add” Button. |
| **Outreach Step Component** | Input Field (Subject) + TextArea (Body) + Chip Row (Merge‑field selector) + Dropdown (Delay) + Toggle (A/B). |
| **Outcome Card (in Activity Feed)** | Icon (type) + Timestamp + Text (description) + Badge (Outcome) + Action (View Details). |
| **Conversation List Item** | Avatar + Sender Name + Snippet + Timestamp + Unread Dot + Menu Icon (more actions). |
| **Conversation Thread** | Message Bubbles (left/right) each containing: Avatar, Timestamp, Text, Status Icons (read/delivered). |
| **Review Queue Row** | Prospect Avatar + Subject (truncated) + Snippet + Submitter Avatar + Time + Action Button Group (Approve/Edit/Reject). |
| **Analytics Chart Widget** | Card Header (Title + Time‑Range Dropdown) + Chart Wrapper (main visualization) + Legend + Export Button (IconButton). |
| **Governance Policy Editor** | Form (Fieldsets for each rule type) + Save Button + Test Area (input + preview). |
| **Knowledge Article Card** | Thumbnail/Image (optional) + Title + Excerpt (lines) + Metadata (Author, Date, Tags) + Read More Button. |
| **Settings Section Card** | Title (Typography) + Description (body text) + Form Fields (varies per subsection). |
| **Empty State** | Illustration (large) + Title + Body Text + Primary Action Button (or Link). |
| **Bulk Action Toolbar** | Toggle Select All (Checkbox) + Selected Count Badge + Action Buttons (Dropdown with Delete, Export, etc.) + Separator + Search Bar. |
| **Modal Dialog** | Backdrop (Modal Backdrop) + Dialog (Container) → Header (Title + Close Button) + Body (Form or Content) + Footer (ButtonGroup). |
| **Tooltip / Popover** | Arrow (CSS) + Content Box (may include Title + Body + Actions). |
| **Drawer (Mobile Sidebar)** | Same as Sidebar but slides in/out from left/right. |
| **Stepper Wizard (e.g., for adding integration)** | Progress Stepper + Form Sections (each a Form Fieldset) + Navigation Buttons (Prev/Next/Submit). |
| **Notification Toast** | Container (toast holder) → Icon + Message + Action Button (Undo) + Progress Bar (auto‑dismiss timer). |
| **Error Boundary / Message** | Icon + Title + Description + Button (Retry / Contact Support). |
| **Footer (App)** | Copyright Text + Links (Privacy, Terms) + Version Number. |

## 4. Templates (Page Layouts)
Templates are combinations of organisms that define page‑level structure but with placeholder content.

| Template | Core Organisms | Typical Usage |
|----------|----------------|---------------|
| **Dashboard Layout** | Header + Sidebar + Grid of KPI Dashboard Widgets + which (Recent Activity Feed) + Optional System Health Panel (admin) | `/dashboard` |
| **List / Index Page** | Header + Sidebar + Filter Panel (optional, collapsible) + Toolbar (global actions) + Data Table or Card Grid + Pagination | `/signals`, `/prospects` (list view), `/conversations`, `/knowledge` (search results), `/settings/*` lists |
| **Detail Page** | Header + Sidebar + Breadcrumb Bar + Tabbed Navigation (Tab Panes each containing relevant Organisms) + Optional Sidebar (secondary actions) | `/prospects/:id`, `/conversations/:id`, `/review/queue/:draftId`, `/settings/integrations/:id` |
| **Editor / Form Page** | Header + Sidebar + Breadcrumb + Form (multiple Form Field molecules) + Action Bar (Submit/Cancel) + Optional Side Panel (preview or help) | `/outreach/studio`, `/settings/profile`, `/settings/integrations/add` |
| **Wizard / Multi‑step Form** | Header + Sidebar + Stepper Wizard + Form Fields per step + Navigation Buttons | Adding a new data source, configuring governance policies, onboarding flow. |
| **Empty State Page** | Header + Sidebar + Empty State (large illustration + text + primary CTA) | First‑time view when no data exists (e.g., no signals yet). |
| **Full‑Screen Dialog** | Header (optional) + Modal Dialog (large) + Footer (optional) | Used for complex settings, import/export wizards, detailed audit log viewer. |
| **Login / Register Page** | Centered Card (Logo + Form Fields + Submit Link) + Background | Public entry pages. |

## 5. Pages (Concrete Instances)
Pages are specific instances of templates populated with real content and tied to routes.

| Route | Template Used | Notable Components |
|-------|---------------|--------------------|
| `/` (redirect) | Dashboard Layout | – |
| `/dashboard` | Dashboard Layout | KPI widgets (Signals Today, Prospects in Pipeline, Outreach Sent, Replies Received, Meetings Booked, Compliance Alerts), Recent Activity Feed, System Health (admin). |
| `/signals` | List Page | Filter Panel (source, date, relevance), Toolbar (Export, Bulk Select), Data Table of Signal Cards, Pagination. |
| `/signals/:id` (sidepanel) | Not a full page – modal/sidepanel derived from Detail Template (compact). | Signal Detail Card with full payload, actions. |
| `/pipeline` | List Page (Kanban variant) | Filter Panel (stage, owner, search), Kanban Board (columns each containing Prospect Card organisms), Column Headers with count & WIP limits. |
| `/prospects` | List Page | Search bar, Filter Panel (industry, tags, score), Toolbar (New Prospect, Export), Grid/Card view of Prospect Cards, Pagination. |
| `/prospects/:id` | Detail Page | Tabs: Overview (Contact Info Card), Research (Research Result Items list), Outreach (Outcome Cards + Sequence Status), Activity (Timeline of Interaction Items), Notes & Tasks (Form + List). |
| `/research` | Editor / Form Page | Prospect Selector (Combo Box), Source Selection Checkboxes, Query Builder (Fields), Results Grid (Research Result Items), Selected Items panel, Save Button. |
| `/outreach/studio` | Editor / Form Page | Prospect Sidebar (Avatar + Info), Template Selector Dropdown, Step Builder (list of Outreach Step Components), Personalization Helper (button + modal), Preview Toggle, Save as Template / Submit for Review Buttons. |
| `/review/queue` | List Page | Filter Panel (prospect, submitter, date), Toolbar (Bulk Approve/Reject), Table of Review Queue Rows (each with avatar, subject, snippet, actions), Pagination. |
| `/conversations` | List Page | Filter Panel (status, channel, date), Toolbar (Mark All Read, Export), List of Conversation List Items, Pagination. |
| `/conversations/:id` | Detail Page | Conversation Thread (list of Message Bubbles), Sidebar (Contact Info + Quick Actions), Bottom Composer Box. |
| `/analytics` | Template with Tabbed Views + Charts | Header with date range picker, Tab Bar (Funnel, Activity Over Time, Reply Sentiment, Team Leaderboard, Compliance Metrics), each tab containing one or more Analytics Chart Widgets + Export buttons. |
| `/governance` | Template with Tabbed Panes | Pane 1: PII Detection Editor (Form Fieldsets + Test Area), Pane 2: Consent Keywords Editor, Pane 3: Approval Rules Editor, Pane 4: Audit Log (List Page variant with filters + Export). |
| `/knowledge` | List Page (Search focus) | Large Search Bar with suggestions, Filter Panel (type, tags, date), Results Grid of Knowledge Article Cards, Pagination. |
| `/knowledge/:id` | Detail Page | Article Header (title, author, date, tags), Content Renderer (markdown → HTML), Related Articles carousel, Comment Section, Version History toggle. |
| `/settings` | Tabs (each tab a different template) | General: Profile Form; Team & Users: User List Table + Invite Form; Integrations: List of Integration Cards + Add Button; AI & Models: Model Selection Grid + Action Buttons; Branding: Preview Canvas + Upload Fields; System (Admin only): Health Dashboard + Logs Viewer + Backup Controls. |
| `/login` / `/register` | Stand‑alone Auth Page | Centered Brand Card with form fields, “Forgot Password?” link, social‑login buttons (if any). |
| `/help` | List Page of Documentation Articles | Sidebar (categories: Getting Started, FAQ, Troubleshooting, Release Notes), Main area: Article Card list with search filter. |
| `/error/:code` | Simple Message Page | Icon, Title, Description, Button (Go Home / Contact Support). |

## 6. Reusability & Extension Guidelines

- **Atoms & Molecules** should be **stateless** (receive props, emit events) wherever possible, to maximize reuse.
- **Organisms** encapsulate specific domain logic (e.g., Signal Card knows how to call the “mark relevant” API). They should be **unit‑testable** in isolation.
- **Templates** define layout grids (commonly using CSS Grid or Flexbox) and contain **slots** for page‑specific content (e.g., `<main><slot name="main-content"></slot></main>`).
- **Pages** connect to the data layer via **hooks** or **container components** that fetch data from services (or subscribe to the event bus) and pass down props to the presentation components.
- **State Management**: Prefer a centralized store (e.g., Redux, Zustand, or Context) for shared state (user, notifications, theme). Form and UI‑local state can stay in component state.
- **Styling**: Use a CSS‑in‑JS solution (styled‑components, emotion) or a utility‑first framework (Tailwind) that consumes the Design Tokens defined elsewhere.
- **Accessibility**: All interactive components must be keyboard navigable, have appropriate ARIA labels, and meet WCAG 2.1 AA contrast.
- **Theming**: Tokens are consumed via a theme context; light/dark switching swaps the token set without altering component code.
- **Versioning**: When a component’s public API changes, increment its version (e.g., `Button@v2`) and document migration steps.

---
*Document Version: 1.0*
*Last Updated: $(date +%Y-%m-%d)*