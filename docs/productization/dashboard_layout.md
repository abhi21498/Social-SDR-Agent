# Dashboard Layout

This document details the layout of the **Dashboard** screen – the primary landing page for users after login. The dashboard adapts to the user's role (SDR, Sales Manager, Admin) by showing a personalized set of widgets while preserving a consistent underlying grid structure. The layout follows the design tokens and component guidelines defined elsewhere.

---

## 1. Overall Structure

The dashboard uses a **responsive vertical‑scroll layout** composed of:

1. **App Header** – global navigation, user avatar, notifications, theme toggle. (Fixed height, sticks to top on scroll.)
2. **Sidebar Navigation** – collapsible navigation drawer (visible on desktop, hidden on mobile – accessible via hamburger). (Fixed width, optional mini‑variant.)
3. **Main Content Area** – the scrollable region where widgets are arranged in a responsive grid.
4. **Footer** – (optional) copyright, version, links. (Sticks to bottom on short pages.)

On mobile widths (< 768 px) the sidebar collapses into a bottom navigation bar (see Navigation Map) and the main content occupies the full width.

---

## 2. Grid System

The content area employs a **12‑column CSS Grid** (or Flexbox fallback) with the following specifications:

| Token | Value | Description |
|-------|-------|-------------|
| grid--gutter | `space--6` (12 px) | Gap between grid tracks (both row and column). |
| grid--column‑count | 12 | Number of equal‑width columns. |
| grid--column‑width | `fr` (flexible fraction) | Each column takes an equal fraction of the available width after gutters. |
| grid--row‑height | `auto` (content‑driven) | Rows size to fit their tallest item. |
| breakpoint--sm | 640 px | Single‑column layout (stacked). |
| breakpoint--md | 768 px | Two‑column layout on tablets in portrait. |
| breakpoint--lg | 1024 px | Three‑column layout on small laptops/large tablets. |
| breakpoint--xl | 1280 px | Four‑column layout on standard desktops. |
| breakpoint--2xl | 1536 px | Five‑column layout on wide monitors. |

**Column Span Rules** (how many columns a widget occupies at each breakpoint) are defined per widget type in the next section.

---

## 3. Widget Specifications

Each widget is a self‑contained **organism** (see Component Hierarchy) that fits into the grid. The table below lists the widget, its purpose, typical content, and the column span at each breakpoint.

| Widget | Purpose | Content (Organisms) | xs (<640 px) | sm (≥640) | md (≥768) | lg (≥1024) | xl (≥1280) | 2xl (≥1536) |
|--------|---------|---------------------|--------------|-----------|-----------|------------|------------|-------------|
| **Welcome Banner** | Greet the user, show quick‑start tip | Text + CTA button | 12 | 12 | 12 | 12 | 12 | 12 |
| **Metrics Row** | High‑level KPIs at a glance | Four **Statistic Card** organisms (Signals Today, Prospects in Pipeline, Outreach Sent, Meetings Booked) – each card can also show a tiny sparkline. | 12 (stacked) | 6 (two per row) | 4 (three per row, one extra) | 3 (four per row) | 3 (four per row) | 3 (four per row) |
| **Recent Activity Feed** | Scrollable list of user’s latest actions (signal marks, outreaches, calls, notes) | **Activity List** organism (virtualized list of Activity Item rows) | 12 | 12 | 8 | 8 | 8 | 8 |
| **Pipeline Snapshot** | Compact Kanban view of pipeline health | Mini‑Kanban (columns: New, Research, Outreach Sent, Engaged) with **Prospect Card** avatars only | 12 | 12 | 8 | 8 | 8 | 8 |
| **Upcoming Tasks / Follow‑ups** | List of tasks due today/tomorrow | **Task List** organism (checkbox + title + due time) | 12 | 12 | 6 | 6 | 6 | 6 |
| **Team Performance (Manager/Admin only)** | Compare team members on key metrics | Bar chart (**Chart Widget**) + small table of top 3 | 12 | 12 | 6 | 6 | 4 | 4 |
| **System Health (Admin only)** | Service uptime, queue latency, error rate | Three **Statistic Card** (API Latency, Event‑Bus Lag, Error Count) + tiny sparkline | 12 | 12 | 4 | 4 | 3 | 3 |
| **Compliance Alerts** | Count of pending governance issues (PII flags, consent misses) | **Statistic Card** with icon + link to Governance screen | 12 | 12 | 6 | 6 | 4 | 4 |
| **Quick Actions** | Frequently used shortcuts (New Prospect, Start Outreach, View Queue) | Horizontal row of **IconButton** with tooltips | 12 | 12 | 4 | 4 | 3 | 3 |
| **Announcements** | Platform news, release notes, maintenance windows | **Card** with marquee‑style text or dismissible banner | 12 | 12 | 6 | 6 | 4 | 4 |
| **Empty State Placeholder** | Shown when no data (e.g., first‑time login) | Illustration + message + primary CTA button | 12 | 12 | 12 | 12 | 12 | 12 |

**Notes:**

- When a widget’s column span would leave leftover columns (e.g., 3 × 3 = 9 on a 12‑col grid), the remaining space is either:
  - Filled by a second instance of the same widget (if applicable), or
  - Left as whitespace (acceptable for aesthetics).
- Widgets that are **role‑gated** (Team Performance, System Health) are omitted entirely from the DOM for users lacking permission, allowing the grid to re‑flow accordingly.
- All widgets respect **minimum and maximum heights**:
  - Min‑height: `space--8` (32 px) to avoid collapsing.
  - Max‑height: none (content‑driven) except for scrollable lists (Activity Feed, Task List) which cap at `400px` and become scrollable.
- **Spacing inside widgets** uses the design token `space--4` (16 px) for padding, and `space--2` (8 px) for internal gaps between sub‑elements.

---

## 4. Responsive Behavior

| Breakpoint | Layout Description |
|------------|--------------------|
| **< 640 px (xs)** | Single column; each widget spans the full width (12 cols). Stacked vertically in the order shown above. |
| **640 – 767 px (sm)** | Two‑column grid (6 cols each). Widgets with span ≤ 6 sit side‑by‑side; those > 6 span both columns. Order preserves priority: top‑most widgets fill the first column, then second. |
| **768 – 1023 px (md)** | Three‑column grid (4 cols each). Widgets with span ≤ 4 fit in a column; those with span 6 occupy 1.5 columns (i.e., they take two columns and leave the third for the next widget). Implementation approach: define `grid-template-columns: repeat(3, 1fr);` and let items have `col-span: 2` etc. |
| **1024 – 1279 px (lg)** | Four‑column grid (3 cols each). Follow same span logic. |
| **1280 – 1535 px (xl)** | Five‑column grid (≈ 2.4 cols each – we use integer column spans: 2‑col and 3‑col combos). Most widgets use 2‑col (≈ 48 % width) or 3‑col (≈ 72 %). |
| **≥ 1536 px (2xl)** | Six‑column grid (2 cols each) – allows up to six narrow widgets per row or three wide widgets per row. |

**Vertical Alignment**: Within each row, items align to the top (`align-self: start`). If a widget is taller than its peers, the row height expands to accommodate it (due to `auto` row height). This prevents clipping while keeping a clean look.

**Scrolling**: The main content area (`<main>`) is set to `overflow-y: auto; max-height: calc(100vh - headerHeight - footerHeight - sidebarOffset)` so that the page never overflows the viewport; the footer remains visible.

---

## 5. Content Loading & Placeholders

- **Skeleton Loaders**: While data is fetching, each widget displays a skeleton version matching its shape (using `space--*` and `radius--*` tokens). This prevents layout shift.
- **Error State**: If a widget fails to load, it shows an **Error Banner** (icon + message + retry button) inside the widget container, preserving the widget’s allocated space.
- **Empty State**: When a widget has zero data (e.g., no recent activities), it renders the **Empty State Organism** (illustration + text + primary CTA) rather than collapsing to zero height – this keeps the grid stable.

---

## 6. Interaction & Animation

- **Hover Elevation**: Cards and widgets that are interactive (e.g., Quick Actions, Metric Cards) raise from `elevation--1` to `elevation--2` on hover/focus, with a transition of `duration--moderate` using `easing--out`.
- **Click Feedback**: Buttons use `active` state with a slight scale (`scale(0.98)`) or color shift.
- **Page Transitions**: On route change, the main content area fades in (`opacity` + `transform: translateY(10px)`) over `duration--moderate`.
- **Sidebar Collapse/Expand**: Animates `width` property using `duration--moderate` and `easing--in--out`.

---

## 7. Accessibility Considerations

- **Keyboard Navigation**: All widgets are reachable via `Tab`; focus order follows reading order (left‑to‑right, top‑to‑bottom). The sidebar can be toggled with `Ctrl+Alt+S` (or similar) and trap focus when open.
- **Screen Reader**: Each widget has an `aria-label` or `aria-labelledby` summarizing its purpose (e.g., “Metrics row: Shows today’s signals, pipeline count, outreaches sent, meetings booked”). Live regions (`aria-live="polite"`) announce updates to metric values.
- **Contrast**: All foreground/background combinations inside widgets meet WCAG AA (≥ 4.5:1 for normal text, ≥ 3:1 for large text). The default light/dark palettes have been validated.
- **Reduced Motion**: Respects `prefers-reduced-motion` by disabling or shortening animations.

---

## 8. Example Markup (Simplified)

```html
<header class="app-header">…</header>
<aside class="sidebar" data-collapsible="true">…</aside>

<main class="dashboard-main">
  <div class="dashboard-grid">
    <!-- Welcome Banner -->
    <section class="widget welcome" data-col-span="12">
      <h2>Welcome back, Alex!</h2>
      <p>Here’s a quick tip to boost your response rate.</p>
      <button class="btn btn-primary">View Tip</p>
    </section>

    <!-- Metrics Row (4 cards) -->
    <section class="widget metrics" data-col-span="12" data-sm-span="6" data-md-span="4" data-lg-span="3" data-xl-span="3">
      <div class="metrics-grid">
        <stat-card title="Signals Today" value="1,234" trend="up" />
        <stat-card title="Prospects in Pipe" value="567" trend="down" />
        <stat-card title="Outreach Sent" value="432" trend="up" />
        <stat-card title="Meetings Booked" value="89" trend="up" />
      </div>
    </section>

    <!-- Recent Activity Feed -->
    <section class="widget activity" data-col-span="12" data-sm-span="12" data-md-span="8" data-lg-span="8">
      <activity-list source="/api/activity/recent" limit="20" />
    </section>

    <!-- Pipeline Snapshot -->
    <section class="widget pipeline" data-col-span="12" data-sm-span="12" data-md-span="8" data-lg-span="8">
      <mini-kanban>
        <!-- columns with prospect avatars -->
      </mini-kanban>
    </section>

    <!-- ... other widgets follow ... -->
  </div>
</main>

<footer class="app-footer">…</footer>
```

*Attributes like `data-col-span`, `data-sm-span` etc., are read by a small layout utility that translates them into inline `grid-column: span X;` or via CSS classes (`col-span-12`, `sm:col-span-6`, etc.) depending on the CSS methodology chosen.*

---

## 9. Customization & Extensibility

- **Adding a New Widget**: Create a new organism, decide its default column spans (based on importance and width), then place it in the desired order within the dashboard grid configuration (typically a JSON config file or CMS‑driven layout).
- **User‑Configurable Layout**: Power‑users can drag‑and‑drop widgets to reorder; the system stores the order per user and recalculates column spans accordingly (preserving the defined span ranges).
- **Theme Awareness**: Widgets automatically inherit the current theme via CSS variables; no additional props needed.
- **Performance**: Virtualized lists for any widget that may show many items (Activity Feed, Task List) to keep DOM size low.
- **Testing**: Snapshot tests for each widget at each breakpoint ensure the layout does not regress.

---

## 10. Summary

The Dashboard layout provides a **role‑aware, responsive, and accessible** canvas that places the most important information at the top left (following F‑pattern scanning). By relying on a 12‑column grid and clearly defined widget spans, the interface adapts gracefully from mobile phones to wide desktop monitors while maintaining a clean, consistent aesthetic aligned with the design system.

---
*Document Version: 1.0*
*Last Updated: $(date +%Y-%m-%d)*