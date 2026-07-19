# Design Tokens

This document defines the raw design tokens used across the Social SDR Agent platform. Tokens are named, atomic values that ensure visual consistency and enable easy theming. They are organized by category and intended to be consumed by the UI layer (CSS‑in‑JS, utility classes, or preprocessor variables). Values are presented as platform‑agnostic primitives (hex colors, pixel/rem values, numeric scales, etc.) and can be mapped to light/dark themes in the Theme Guide.

All token names follow the pattern: `<category>--<subcategory>--<specific‑property>--<variant>` (using double hyphens as delimiters). Variants describe intensity, size, or state.

---

## 1. Color

### 1.1 Palette (Base)
| Token | Value | Description |
|-------|-------|-------------|
| color--neutral--0 | #FFFFFF | Pure white (backgrounds, surfaces) |
| color--neutral--50 | #F9FAFB | Light gray (slight elevation) |
| color--neutral--100 | #F3F4F6 | Very light gray |
| color--neutral--200 | #E5E7EB | Light gray (borders, dividers) |
| color--neutral--300 | #D1D5DB | Medium‑light gray |
| color--neutral--400 | #9CA3AF | Medium gray (disabled text, subtle icons) |
| color--neutral--500 | #6B7280 | Medium‑dark gray (body text on light) |
| color--neutral--600 | #4B5563 | Dark gray |
| color--neutral--700 | #374151 | Dark gray (primary text on light) |
| color--neutral--800 | #1F2937 | Very dark gray |
| color--neutral--900 | #111827 | Near‑black |
| color--neutral--950 | #030712 | Darkest (for high contrast) |

### 1.2 Primary Brand
| Token | Value | Description |
|-------|-------|-------------|
| color--primary--50 | #EFF6FF | Lightest tint |
| color--primary--100 | #DBEAFE | Very light |
| color--primary--200 | #BFDBFE | Light |
| color--primary--300 | #93C5FD | Light‑medium |
| color--primary--400 | #60A5FA | Medium |
| color--primary--500 | #3B82F6 | **Base blue** (primary actions) |
| color--primary--600 | #2563EB | Darker |
| color--primary--700 | #1D4ED8 | Dark |
| color--primary--800 | #1E40AF | Darker |
| color--primary--900 | #1E3A8A | Darkest |

### 1.3 Semantic Colors
| Token | Value | Description |
|-------|-------|-------------|
| color--success--50 | #ECFDF5 | Light green tint |
| color--success--100 | #D1FAE5 | Very light |
| color--success--200 | #A7F3D0 | Light |
| color--success--300 | #6EE7B7 | Medium‑light |
| color--success--400 | #34D399 | Medium |
| color--success--500 | #10B981 | **Base green** (positive outcomes) |
| color--success--600 | #059669 | Darker |
| color--success--700 | #047857 | Dark |
| color--success--800 | #065F46 | Darker |
| color--success--900 | #064E3B | Darkest |
| color--warning--50 | #FFFBEB | Light amber tint |
| color--warning--100 | #FEF3C7 | Very light |
| color--warning--200 | #FDE68A | Light |
| color--warning--300 | #FCD34D | Light‑medium |
| color--warning--400 | #FBBF24 | Medium |
| color--warning--500 | #F59E0B | **Base amber** (caution, flags) |
| color--warning--600 | #D97706 | Darker |
| color--warning--700 | #B45309 | Dark |
| color--warning--800 | #92400E | Darker |
| color--warning--900 | #78350F | Darkest |
| color--error--50 | #FEF2F2 | Light red tint |
| color--error--100 | #FEE2E2 | Very light |
| color--error--200 | #FECACA | Light |
| color--error--300 | #FCA5A5 | Light‑medium |
| color--error--400 | #F87171 | Medium |
| color--error--500 | #EF4444 | **Base red** (errors, blocked) |
| color--error--600 | #DC2626 | Darker |
| color--error--700 | #B91C1C | Dark |
| color--error--800 | #991B1B | Darker |
| color--error--900 | #7F1D1D | Darkest |
| color--info--50 | #EFF6FF | Light blue tint (same as primary‑50) |
| color--info--100 | #DBEAFE | Very light |
| color--info--200 | #BFDBFE | Light |
| color--info--300 | #93C5FD | Light‑medium |
| color--info--400 | #60A5FA | Medium |
| color--info--500 | #3B82F6 | **Base blue** (informational) |
| color--info--600 | #2563EB | Darker |
| color--info--700 | #1D4ED8 | Dark |
| color--info--800 | #1E40AF | Darker |
| color--info--900 | #1E3A8A | Darkest |

### 1.4 Background & Surface
| Token | Value | Description |
|-------|-------|-------------|
| color--background | color--neutral--0 | Main page background |
| color--surface | color--neutral--50 | Card, modal, dropdown surfaces |
| color--surface--variant | color--neutral--100 | Slightly elevated surface (e.g., hovered card) |
| color--surface--disabled | color--neutral--200 | Disabled input background |
| color--overlay | rgba(0, 0, 0, 0.4) | Modal backdrop, drawer overlay |

### 1.5 Text
| Token | Value | Description |
|-------|-------|-------------|
| color--text--primary | color--neutral--900 | Main body text on light surfaces |
| color--text--secondary | color--neutral--700 | Secondary text, hints, captions |
| color--text--disabled | color--neutral--400 | Disabled text |
| color--text--inverse | color--neutral--0 | Text on dark surfaces (used in dark mode or on primary backgrounds) |
| color--text--placeholder | color--neutral--500 | Placeholder text in inputs |
| color--text--link | color--primary--600 | Unvisited link |
| color--text--link--hover | color--primary--700 | Link hover |

### 1.6 Icons & Symbols
| Token | Value | Description |
|-------|-------|-------------|
| color--icon | color--neutral--600 | Default icon color |
| color--icon--active | color--primary--500 | Icon when associated control is active/selected |
| color--icon--disabled | color--neutral--400 | Disabled icon |
| color--icon--inverse | color--neutral--0 | Icon on dark backgrounds |

### 1.7 Borders & Strokes
| Token | Value | Description |
|-------|-------|-------------|
| color--border | color--neutral--200 | Default border (inputs, cards, tables) |
| color--border--focused | color--primary--500 | Border when focused |
| color--border--error | color--error--500 | Border for invalid fields |
| color--border--success | color--success--500 | Border for successful validation |
| color--divider | color--neutral--200 | Horizontal/vertical rule |
| color--hover | color--neutral--100 | Background on hover (used for table rows, list items) |

---

## 2. Typography

### 2.1 Font Family
| Token | Value |
|-------|-------|
| font--family--base | "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif |
| font--family--mono | "Source Code Pro", Menlo, Monaco, Consolas, "Courier New", monospace |

### 2.2 Font Weight
| Token | Value |
|-------|-------|
| font--weight--light | 300 |
| font--weight--regular | 400 |
| font--weight--medium | 500 |
| font--weight--semibold | 600 |
| font--weight--bold | 700 |
| font--weight--extraBold | 800 |

### 2.3 Font Size (px) – Base 16 px
| Token | Value |
|-------|-------|
| font--size--xs | 0.75rem /* 12px */ |
| font--size--sm | 0.875rem /* 14px */ |
| font--size--base | 1rem /* 16px */ |
| font--size--lg | 1.125rem /* 18px */ |
| font--size--xl | 1.25rem /* 20px */ |
| font--size--2xl | 1.5rem /* 24px */ |
| font--size--3xl | 1.875rem /* 30px */ |
| font--size--4xl | 2.25rem /* 36px */ |
| font--size--5xl | 3rem /* 48px */ |
| font--size--6xl | 3.75rem /* 60px */ |

### 2.4 Line Height (unitless)
| Token | Value |
|-------|-------|
| line--height--tight | 1.2 |
| line--height--snug | 1.3 |
| line--height--base | 1.5 |
| line--height--relaxed | 1.6 |
| line--height--loose | 2 |

### 2.5 Letter Tracking (em)
| Token | Value |
|-------|-------|
| letter--tracking--tight | -0.02em |
| letter--tracking--normal | 0 |
| letter--tracking--wide | 0.02em |
| letter--tracking--wider | 0.05em |
| letter--tracking--widest | 0.1em |

---

## 3. Spacing (Spacing Scale – 4px base)
| Token | Value |
|-------|-------|
| space--0 | 0px |
| space--0.5 | 1px |
| space--1 | 2px |
| space--1.5 | 3px |
| space--2 | 4px |
| space--2.5 | 5px |
| space--3 | 6px |
| space--3.5 | 7px |
| space--4 | 8px |
| space--5 | 10px |
| space--6 | 12px |
| space--7 | 14px |
| space--8 | 16px |
| space--9 | 18px |
| space--10 | 20px |
| space--11 | 22px |
| space--12 | 24px |
| space--14 | 28px |
| space--16 | 32px |
| space--20 | 40px |
| space--24 | 48px |
| space--28 | 56px |
| space--32 | 64px |
| space--36 | 72px |
| space--40 | 80px |
| space--44 | 88px |
| space--48 | 96px |
| space--52 | 104px |
| space--56 | 112px |
| space--60 | 120px |
| space--64 | 128px |
| space--72 | 144px |
| space--80 | 160px |
| space--88 | 192px |
| space--96 | 224px |
| space--1104 | 280px |
| space--112 | 304px |
| space--120 | 336px |
| space--128 | 384px |

*For convenience, a shorthand `space--<n>` corresponds to `n * 4px` (rounded).*

---

## 4. Elevation / Shadow
| Token | Value (CSS `box-shadow`) |
|-------|---------------------------|
| elevation--0 | none |
| elevation--1 | 0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06) |
| elevation--2 | 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06) |
| elevation--3 | 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05) |
| elevation--4 | 0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -5px rgba(0,0,0,0.04) |
| elevation--5 | 0 25px 50px -12px rgba(0,0,0,0.25), 0 10px 10px -5px rgba(0,0,0,0.15) |
| elevation--6 | 0 35px 60px -15px rgba(0,0,0,0.3), 0 15px 20px -10px rgba(0,0,0,0.1) |

*Used for cards, dialogs, menus, floating action buttons.*

---

## 5. Border Radius
| Token | Value |
|-------|-------|
| radius--none | 0px |
| radius--xs | 2px |
| radius--sm | 4px |
| radius--md | 6px |
| radius--lg | 8px |
| radius--xl | 12px |
| radius--2xl | 16px |
| radius--full | 9999px (pill) |

---

## 6. Z‑Index (Layering)
| Token | Value |
|-------|-------|
| zindex--dropdown | 1000 |
| zindex--sticky | 1100 |
| zindex--banner | 1200 |
| zindex--modal--backdrop | 1300 |
| zindex--modal | 1400 |
| zindex--popover | 1500 |
| zindex--tooltip | 1600 |
| zindex--drawer | 1700 |
| zindex--navbar | 1800 |

---

## 7. Opacity
| Token | Value |
|-------|-------|
| opacity--0 | 0 |
| opacity--10 | 0.1 |
| opacity--20 | 0.2 |
| opacity--30 | 0.3 |
| opacity--40 | 0.4 |
| opacity--50 | 0.5 |
| opacity--60 | 0.6 |
| opacity--70 | 0.7 |
| opacity--80 | 0.8 |
| opacity--90 | 0.9 |
| opacity--100 | 1 |

---

## 8. Duration & Easing (Motion)
| Token | Value |
|-------|-------|
| duration--fast | 80ms |
| duration--moderate | 150ms |
| duration--slow | 250ms |
| duration--slower | 350ms |
| easing--linear | linear |
| easing--in | cubic-bezier(0.4, 0, 1, 1) |
| easing--out | cubic-bezier(0, 0, 0.2, 1) |
| ease--in--out | cubic-bezier(0.4, 0, 0.2, 1) |
| easing--sharp | cubic-bezier(0.4, 0, 0.6, 1) |

---

## 9. Miscellaneous
| Token | Value | Description |
|-------|-------|-------------|
| max--width--container | 1440px | Max width of centered content area |
| max--width--content | 1200px | Max width for reading‑friendly text blocks |
| breakpoint--sm | 640px | Small screens (phones landscape) |
| breakpoint--md | 768px | Tablets, small laptops |
| breakpoint--lg | 1024px | Laptops, small desktops |
| breakpoint--xl | 1280px | Desktops, large screens |
| breakpoint--2xl | 1536px | Very large displays |
| grid--gutter | space--6 | 12px gutter between grid columns (used in dashboard layout) |
| icon--size--xs | 12px |
| icon--size--sm | 16px |
| icon--size--md | 20px |
| icon--size--lg | 24px |
| icon--size--xl | 32px |
| avatar--size--xs | 24px |
| avatar--size--sm | 32px |
| avatar--size--md | 40px |
| avatar--size--lg | 48px |
| avatar--size--xl | 64px |
| button--height--sm | 28px |
| button--height--md | 36px |
| button--height--lg | 44px |
| button--height--xl | 52px |
| input--height--sm | 32px |
| input--height--md | 40px |
| input--height--lg | 48px |
| input--height--xl | 56px |
| table--row--height | 48px |
| menu--item--height | 40px |
| sidebar--width--collapsed | 60px (icons only) |
| sidebar--width--expanded | 260px |
| drawer--width | 280px |

*All lengths are expressed in pixels; they can be converted to rem if the base font size is 16px (1rem = 16px).*
---
*Document Version: 1.0*
*Last Updated: $(date +%Y-%m-%d)*