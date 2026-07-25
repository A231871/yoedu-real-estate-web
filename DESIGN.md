# Yoedu Property Platform Design System Specification

This document defines the official design system for the **Yoedu Property Platform**, extracted from the Stitch project. It serves as a unified reference for engineering and design to maintain consistency across the desktop application.

---

## 1. Brand & Aesthetic Vision
The design system is rooted in **Modern Minimalism**, prioritizing architectural clarity and high-end sophistication. It targets a discerning audience seeking luxury real estate, demanding a UI that feels as structured and refined as the properties it showcases.

*   **Emotional Goal:** "Quiet luxury"—trustworthy, precise, and authoritative.
*   **Visual Philosophy:** Monochromatic gallery style. Stripping away chromatic noise lets high-quality architectural photography serve as the primary visual driver. Emphasizes expansive whitespace and rigorous grid alignment.

---

## 2. Color System
The palette is strictly achromatic, leveraging contrast rather than color to establish structure and hierarchy.

### 2.1 Core Palette Reference
These colors form the foundation of the visual hierarchy:

| Color | Hex | Role / Application |
| :--- | :--- | :--- |
| **Primary** | `#000000` | Headlines, primary action buttons, critical iconography (the "ink" on the page). |
| **Secondary** | `#5E5E5E` (or `#717171` text variant) | Body text, descriptions, secondary icons; reduces eye strain. |
| **Surface/Border** | `#E5E5E5` | Structural dividers, container outlines, and input borders. |
| **Background** | `#FFFFFF` | Primary canvas. Whitespace is treated as a functional element. |
| **Accent/Soft** | `#F5F5F5` | Large section backgrounds, hover states, providing subtle depth. |

### 2.2 Complete Theme Token Mappings
Below is the full set of semantic color tokens defined in the design theme:

```json
{
  "background": "#f9f9f9",
  "on_background": "#1a1c1c",
  "primary": "#000000",
  "on_primary": "#ffffff",
  "primary_container": "#1b1b1b",
  "on_primary_container": "#848484",
  "secondary": "#5e5e5e",
  "on_secondary": "#ffffff",
  "secondary_container": "#e3e2e2",
  "on_secondary_container": "#646464",
  "tertiary": "#000000",
  "on_tertiary": "#ffffff",
  "tertiary_container": "#1a1c1c",
  "on_tertiary_container": "#838484",
  "error": "#ba1a1a",
  "on_error": "#ffffff",
  "error_container": "#ffdad6",
  "on_error_container": "#93000a",
  "outline": "#7e7576",
  "outline_variant": "#cfc4c5",
  "surface": "#f9f9f9",
  "surface_bright": "#f9f9f9",
  "surface_dim": "#dadada",
  "surface_tint": "#5e5e5e",
  "surface_variant": "#e2e2e2",
  "surface_container_lowest": "#ffffff",
  "surface_container_low": "#f3f3f4",
  "surface_container": "#eeeeee",
  "surface_container_high": "#e8e8e8",
  "surface_container_highest": "#e2e2e2"
}
```

---

## 3. Typography
The system utilizes **Inter** as the primary font family for its systematic, neutral, and highly legible characteristics. The typographic scale is designed to feel editorial and structured.

### 3.1 Typographic Scale

| Style Name | Font Family | Size | Weight | Line Height | Letter Spacing |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `display-lg` | Inter | `64px` | `600` (Semi-Bold) | `1.1` | `-0.02em` |
| `display-lg-mobile` | Inter | `40px` | `600` (Semi-Bold) | `1.2` | `-0.02em` |
| `headline-lg` | Inter | `32px` | `500` (Medium) | `1.3` | `-0.01em` |
| `headline-md` | Inter | `24px` | `500` (Medium) | `1.4` | — |
| `body-lg` | Inter | `18px` | `400` (Regular) | `1.6` | — |
| `body-md` | Inter | `16px` | `400` (Regular) | `1.6` | — |
| `label-sm` | Inter | `12px` | `600` (Semi-Bold) | `1.0` | `0.05em` |

---

## 4. Grid, Spacing & Layout
The grid system is designed to center focus on desktop, translating gracefully into fluid columns on smaller viewport sizes.

*   **Base Unit:** `8px` (all spacing, padding, margins should be increments of 8px).
*   **Desktop Grid:** 12-column layout, `1280px` max container width, `24px` gutters, and large `64px` margins to frame the screen like a gallery.
*   **Tablet Grid:** 8-column layout, `24px` gutters, and `40px` margins.
*   **Mobile Grid:** 4-column layout, `16px` gutters, and `20px` margins.
*   **Section Breathing Room:** Use generous vertical margins (e.g., `64px`, `80px`, `120px`) between primary sections.

---

## 5. Shape & Corner Rounding
The shape language is categorized as **Soft**, preventing the interface from feeling aggressive while retaining modern, clean edges.

*   `sm`: `0.125rem` (2px)
*   `DEFAULT`: `0.25rem` (4px) — *Standard for buttons, chips, etc.*
*   `md`: `0.375rem` (6px)
*   `lg`: `0.5rem` (8px) — *Standard for property card images & containers.*
*   `xl`: `0.75rem` (12px)
*   `full`: `9999px`

---

## 6. Elevation & Depth
Depth is created through **Tonal Layering** and **Low-Contrast Outlines** rather than traditional, heavy drop shadows.

*   **Z-Axis 0 (Base):** Flat hierarchy separated by 1px borders (`#E5E5E5` or outline tokens).
*   **Interactivity Hover:** Card components transition to a soft, diffused ambient shadow: `0px 4px 20px rgba(0, 0, 0, 0.05)`.
*   **Active States:** Pure black background overlay pushes elements forward.

---

## 7. Component Specifications

### 7.1 Buttons
*   **Primary Button:** Solid black (`#000000`) background, white (`#FFFFFF`) text, uppercase `label-sm` text style, `4px` corner radius.
*   **Secondary Button:** Ghost-style with a `1px` solid black (`#000000`) border, transparent background, uppercase `label-sm` text.

### 7.2 Input Fields
*   Text inputs utilize a `1px` border (`#E5E5E5` / outline) which transitions to solid black (`#000000`) on focus.
*   Labels are situated directly above the input fields, styled using the `label-sm` definition.

### 7.3 Cards (Property Listings)
*   Clean, borderless appearance. High-quality architectural imagery spans the full width of the card.
*   Product images utilize a `8px` (`rounded-lg`) corner radius.
*   Specification metrics (e.g., beds, baths, sq ft) are placed below the image in a horizontal row separated by a `1px` vertical line or generous spacing.

### 7.4 Chips (Status/Tags)
*   Used for property listing tags (e.g., "FOR SALE").
*   Styled as small, light gray (`#F5F5F5` / `surface-container`) rectangles with uppercase `label-sm` text.
