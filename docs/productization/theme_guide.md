# Theme Guide

This document explains how the **Design Tokens** defined in `design_tokens.md` are applied to create the visual themes for the Social SDR Agent platform. It covers light and dark modes, semantic usage of colors, elevation, typography, spacing, and component‑level theming guidelines. Follow this guide when implementing or customizing UI components to ensure a consistent, accessible, and brand‑aligned experience.

---

## 1. Overview

The platform supports two primary themes:

- **Light Mode** (default) – optimized for bright office environments.
- **Dark Mode** – optional toggle for low‑light conditions or personal preference.

Tokens are **semantic**: they describe *what* a value is used for (e.g., `color--background`, `color--text--primary`) rather than a fixed hue. The theme layer maps each semantic token to a concrete value from the palette (or other scale) depending on the active mode.

This indirection enables:

- Easy theme switching without touching component code.
- Consistent use of color for meaning (primary, success, warning, error, info).
- Future‑proofing for additional themes (e.g., high‑contrast, brand‑specific).

---

## 2. Token Mapping

Below are the mappings for **Light** and **Dark** modes. Values are taken directly from the Design Tokens file. If a token is not listed, it inherits the same value in both modes (e.g., spacing, radius, typography).

### 2.1 Color Mapping

| Semantic Token | Light Mode Value | Dark Mode Value | Usage Notes |
|----------------|------------------|-----------------|-------------|
| color--background | color--neutral--0 (`#FFFFFF`) | color--neutral--900 (`#111827`) | Page and app background |
| color--surface | color--neutral--50 (`#F9FAFB`) | color--neutral--800 (`#1F2937`) | Cards, modals, dropdowns, input fields |
| color--surface--variant | color--neutral--100 (`#F3F4F6`) | color--neutral--700 (`#374151`) | Hovered/focused surface, raised cards |
| color--overlay | rgba(0,0,0,0.4) | rgba(0,0,0,0.6) | Modal/backdrop |
| color--text--primary | color--neutral--900 (`#111827`) | color--neutral--50 (`#F9FAFB`) | Main body copy |
| color--text--secondary | color--neutral--700 (`#374151`) | color--neutral--300 (`#D1D5DB`) | Secondary text, captions, hints |
| color--text--disabled | color--neutral--400 (`#9CA3AF`) | color--neutral--500 (`#6B7280`) | Disabled form fields |
| color--text--inverse | color--neutral--0 (`#FFFFFF`) | color--neutral--900 (`#111827`) | Text on dark surfaces (e.g., on primary buttons) |
| color--text--placeholder | color--neutral--500 (`#6B7280`) | color--neutral--400 (`#9CA3AF`) | Input placeholders |
| color--text--link | color--primary--600 (`#2563EB`) | color--primary--400 (`#60A5FA`) | Unvisited links |
| color--text--link--hover | color--primary--700 (`#1D4ED8`) | color--primary--300 (`#93C5FD`) | Link hover |
| color--border | color--neutral--200 (`#E5E7EB`) | color--neutral--600 (`#4B5563`) | Inputs, card outlines, table borders |
| color--border--focused | color--primary--500 (`#3B82F6`) | color--primary--400 (`#60A5FA`) | Focused input border |
| color--border--error | color--error--500 (`#EF4444`) | color--error--400 (`#F87171`) | Invalid field border |
| color--border--success | color--success--500 (`#10B981`) | color--success--400 (`#34D399`) | Validated field border |
| color--divider | color--neutral--200 (`#E5E7EB`) | color--neutral--600 (`#4B5563`) | HR, list separators |
| color--hover | color--neutral--100 (`#F3F4F6`) | color--neutral--700 (`#374151`) | Table row hover, list item hover |
| color--icon | color--neutral--600 (`#4B5563`) | color--neutral--400 (`#9CA3AF`) | Default icon color |
| color--icon--active | color--primary--500 (`#3B82F6`) | color--primary--400 (`#60A5FA`) | Selected/active icon |
| color--icon--disabled | color--neutral--400 (`#9CA3AF`) | color--neutral--500 (`#6B7280`) | Disabled icon |
| color--shadow--elev (elevation tokens) | Use same shadow values (they are color‑agnostic via rgba) | Same as light (shadows use rgba with alpha) | Elevation works in both modes because shadows use transparent black; ensure surface color is dark enough in dark mode for contrast. |

**Semantic Colors (status‑based)** retain the same hue across modes but adjust lightness for contrast on the respective background:

| Token | Light | Dark |
|-------|-------|------|
| color--success--500 | `#10B981` | `#10B981` (keep same; works on both) |
| color--error--500 | `#EF4444` | `#EF4444` |
| color--warning--500 | `#F59E0B` | `#F59E0B` |
| color--info--500 | `#3B82F6` | `#3B82F6` |

If a specific status color lacks sufficient contrast on a dark surface, you may optionally use a lighter tint (e.g., `color--success--400`) for icons or text on dark surfaces—but the base 500 value is generally acceptable.

### 2.2 Typography Mapping
Typography tokens (font family, weight, size, line height, letter spacing) are **identical** in both modes. No changes needed.

### 2.3 Spacing, Radius, Elevation, Z‑Index, Duration, Easing
All non‑color tokens are **shared** between light and dark themes.

### 2.4 Theme Switching Mechanism
- The root `<html>` or a wrapper `<div>` receives a `data-theme="light"` or `data-theme="dark"` attribute.
- CSS variables (or a theme object in JS) are defined based on that attribute.
- Example using CSS custom properties:

```css
:root {
  --color-background: var(--color-neutral-0);
  --color-surface: var(--color-neutral-50);
  /* … */
}

[data-theme="dark"] {
  --color-background: var(--color-neutral-900);
  --color-surface: var(--color-neutral-800);
  /* … */
}
```

Components then reference `var(--color-background)` etc. This approach guarantees a single source of truth.

---

## 3. Semantic Color Usage Guidelines

Use the semantic tokens rather than raw palette values. This ensures meaning stays consistent when the palette evolves.

| Context | Token | Example |
|---------|-------|---------|
| Primary action button (primary CTA) | `color--primary--500` (background) + `color--text--inverse` (text) | Blue button with white text |
| Secondary action | `color--surface` (bg) + `color--primary--500` (border/text) | Outline button |
| Destructive/danger action | `color--error--500` (bg) + `color--text--inverse` (text) | Red button |
| Success feedback (toast, banner) | `color--success--500` (bg) + `color--text--inverse` | Green notification |
| Warning / caution | `color--warning--500` (bg) + `color--text--inverse` | Amber notice |
| Informational message | `color--info--500` (bg) + `color--text--inverse` | Blue notice |
| Field label (default) | `color--text--secondary` | — |
| Field label (error) | `color--error--500` | — |
| Field input background | `color--surface` | — |
| Field input border (focus) | `color--border--focused` | — |
| Input text | `color--text--primary` | — |
| Placeholder text | `color--text--placeholder` | — |
| Disabled input | background `color--surface--disabled`, text `color--text--disabled` | — |
| Link in body | `color--text--link` | — |
| Link hover | `color--text--link--hover` | — |
| Icon (default) | `color--icon` | — |
| Icon (active/selected) | `color--icon--active` | — |
| Icon (disabled) | `color--icon--disabled` | — |
| Badge (status) | Use semantic color background + `color--text--inverse` text | e.g., success badge: bg `color--success--500`, text white |
| Nav item (active) | background `color--primary--50` (or surface variant) + text `color--primary--800` | — |
| Nav item (hover) | background `color--hover` | — |
| Table header background | `color--surface--variant` | — |
| Table body row (hover) | background `color--hover` | — |
| Empty state illustration tint | `color--primary--200` (or any brand tint) | — |

**Contrast Requirement**: Ensure a minimum contrast ratio of **4.5:1** for normal text and **3:1** for large text (WCAG AA). Test each token pair in both themes; if a pair fails, adjust by using a lighter/darker shade from the same hue (e.g., use `color--primary--400` for text on a dark surface).

---

## 4. Elevation & Shadow Usage

Elevation tokens convey depth. Use them sparingly to avoid visual clutter.

| Elevation | Typical Use |
|-----------|-------------|
| 0 | Inline elements, flat badges, chips |
| 1 | Input fields, buttons, table cells |
| 2 | Cards, modal content, dropdown menus |
| 3 | Side‑sheet drawers, elevated cards |
| 4 | Large modals, flyout panels |
| 5‑6 | Floating action buttons, persistent headers that scroll under content (rare) |

Shadows use `rgba(0,0,0,0.x)`; they work on both light and dark surfaces because the opacity provides appropriate darkness. Ensure the surface underneath is not too dark that the shadow becomes invisible; in dark mode, consider raising the surface color slightly (e.g., use `color--neutral--700` for cards) to preserve shadow visibility.

---

## 5. Component‑Level Theming Examples

### 5.1 Button (Primary)

```css
.Button--primary {
  background: var(--color-primary-500);
  color: var(--color-text-inverse);
  border: none;
  border-radius: var(--radius-md);
  padding: var(--space-2) var(--space-4);
  font-weight: var(--font-weight-medium);
  transition: background var(--duration-moderate) var(--easing-out);
}
.Button--primary:hover {
  background: var(--color-primary-600);
}
.Button--primary:disabled {
  background: var(--color-neutral-200);
  color: var(--color-text-disabled);
  cursor: not-allowed;
}
```

### 5.2 Card

```css
.Card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--elevation-2);
  overflow: hidden;
}
.Card:hover {
  background: var(--color-surface-variant);
  box-shadow: var(--elevation-3);
}
.Card--header {
  background: var(--color-surface-variant);
  padding: var(--space-4) var(--space-6);
  border-bottom: 1px solid var(--color-border);
}
.Card--body {
  padding: var(--space-6);
}
.Card--footer {
  background: var(--color-surface-variant);
  padding: var(--space-4) var(--space-6);
  border-top: 1px solid var(--color-border);
}
```

### 5.3 Input Field

```css
.Input {
  width: 100%;
  padding: var(--space-2) var(--space-3);
  font-size: var(--font-size-base);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  color: var(--color-text-primary);
  transition: border-color var(--duration-moderate) var(--easing-out), box-shadow var(--duration-moderate) var(--easing-out);
}
.Input:focus {
  outline: none;
  border-color: var(--color-border-focused);
  box-shadow: 0 0 0 3px rgba(59,130,246,0.2); /* using primary‑500 alpha */
}
.Input--error {
  border-color: var(--color-error-500);
}
.Input--disabled {
  background: var(--color-surface-disabled);
  color: var(--color-text-disabled);
  cursor: not-allowed;
}
```

### 5.4 Table Row (Hover)

```css
.Table--tbody tr:hover {
  background: var(--color-hover);
}
.Table--thead th {
  background: var(--color-surface-variant);
  border-bottom: 1px solid var(--color-border);
  padding: var(--space-4) var(--space-6);
  font-weight: var(--font-weight-semibold);
}
.Table--tbody td {
  padding: var(--space-4) var(--space-6);
  vertical-align: middle;
}
```

### 5.5 Modal

```css
.Modal--backdrop {
  position: fixed;
  inset: 0;
  background: var(--color-overlay);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: var(--zindex-modal-backdrop);
}
.Modal {
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  box-shadow: var(--elevation-4);
  width: 90%;
  max-width: 500px;
  max-height: 85vh;
  overflow: auto;
}
.Modal--header {
  padding: var(--space-4) var(--space-6);
  border-bottom: 1px solid var(--color-border);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.Modal--title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
}
.Modal--body {
  padding: var(--space-6);
}
.Modal--footer {
  padding: var(--space-4) var(--space-6);
  border-top: 1px solid var(--color-border);
  display: flex;
  justify-content: flex-end;
  gap: var(--space-3);
}
```

### 5.6 Navigation Sidebar (Collapsible)

```css
.Sidebar {
  width: var(--sidebar-width-expanded);
  background: var(--color-surface);
  border-right: 1px solid var(--color-border);
  transition: width var(--duration-moderate) var(--easing-out);
}
.Sidebar--collapsed {
  width: var(--sidebar-width-collapsed);
}
.Sidebar--navitem {
  display: flex;
  align-items: center;
  padding: var(--space-3) var(--space-4);
  margin: var(--space-1) 0;
  border-radius: var(--radius-md);
  cursor: pointer;
}
.Sidebar--navitem:hover {
  background: var(--color-hover);
}
.Sidebar--navitem--active {
  background: var(--color-primary-50);
  color: var(--color-primary-800);
}
.Sidebar--icon {
  width: var(--icon-size-md);
  height: var(--icon-size-md);
  flex-shrink: 0;
}
.Sidebar--label {
  margin-left: var(--space-3);
  font-size: var(--font-size-base);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
```

### 5.7 Toast Notification

```css
.Toast {
  background: var(--color-surface);
  border-left: 4px solid var(--color-primary-500); /* accent by type */
  border-radius: var(--radius-sm);
  box-shadow: var(--elevation-3);
  padding: var(--space-4) var(--space-6);
  display: flex;
  align-items: center;
  gap: var(--space-3);
  min-width: 280px;
  animation: slideIn var(--duration-moderate) var(--easing-out);
}
.Toast--success { border-left-color: var(--color-success-500); }
.Toast--warning { border-left-color: var(--color-warning-500); }
.Toast--error   { border-left-color: var(--color-error-500); }
.Toast--info    { border-left-color: var(--color-info-500); }
.Toast--icon {
  width: var(--icon-size-lg);
  height: var(--icon-size-lg);
  flex-shrink: 0;
}
.Toast--message {
  flex: 1;
  font-size: var(--font-size-base);
  color: var(--color-text-primary);
}
.Toast--close {
  margin-left: auto;
  background: transparent;
  border: none;
  font-size: var(--font-size-lg);
  color: var(--color-text-secondary);
  cursor: pointer;
}
```

### 5.8 Badge (Status)

```css
.Badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: var(--space-4);
  min-width: var(--space-4);
  padding: 0 var(--space-1);
  border-radius: var(--radius-xs);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-inverse);
}
.Badge--success { background: var(--color-success-500); }
.Badge--warning { background: var(--color-warning-500); }
.Badge--error   { background: var(--color-error-500); }
.Badge--info    { background: var(--color-info-500); }
.Badge--default { background: var(--color-neutral-500); color: var(--color-neutral-0); }
```

---

## 6. Implementing Dark Mode Toggle

1. **Add a UI control** (e.g., a switch in Settings > General) labeled “Dark mode”.
2. When toggled, update a persistent store (e.g., `localStorage.setItem('theme','dark')`) and set the `<html>` attribute:
   ```js
   document.documentElement.setAttribute('data-theme', theme);
   ```
3. On page load, read the stored preference or fall back to the system preference (`window.matchMedia('(prefers-color-scheme: dark)')`).
4. Ensure CSS variables are defined as shown in Section 2.4.

---

## 7. Accessibility & Contrast Checks

- Validate all foreground/background pairs using a contrast checker (e.g., WebAIM).
- For text over images, use an overlay (`rgba(0,0,0,0.4)` or `rgba(255,255,255,0.6)`) to guarantee legibility.
- Ensure focus rings are visible: use `outline: 2px solid var(--color-primary-500)` with `outline-offset: 2px`.
- Avoid relying solely on color to convey meaning; supplement with icons, text, or patterns.

---

## 8. Extending the Theme (Future Themes)

If a brand‑specific or high‑contrast theme is needed later:

1. Add a new attribute value, e.g., `data-theme="high-contrast"`.
2. Define overrides for the semantic tokens that need change (e.g., boost contrast, adjust colors).
3. Keep the same component code; only the token mapping changes.

---

## 9. Summary

- **Semantic tokens** separate design intent from concrete values.
- The **light/dark mapping** provided satisfies WCAG contrast while preserving brand identity.
- **Component examples** illustrate how to consume tokens in CSS (or JS‑in‑CSS) to produce themed UI.
- Follow the **usage guidelines** to keep the interface accessible, consistent, and easy to maintain.

---
*Document Version: 1.0*
*Last Updated: $(date +%Y-%m-%d)*