# DESIGN.md — Genio Design System

## Source of Truth

The main visual reference for Genio is the Figma file:

https://www.figma.com/design/B6UMO5VsurgE58wLIB80sA/genio?node-id=0-1

Use the Figma design as the primary source for:

- layout structure
- spacing
- hierarchy
- component proportions
- product UI direction
- dashboard organization
- editor layout
- template gallery structure
- store/inventory layout

The goal is not pixel-perfect copying. The goal is to translate the Figma design into a maintainable Next.js/React/Tailwind design system.

## Product Identity

Genio is a drag-and-drop website builder for Costa Rican SMEs, entrepreneurs, and non-technical users.

It helps users create:

- websites
- landing pages
- portfolios
- simple online stores
- product catalogs
- AI-generated first drafts

Genio should feel:

- professional
- structured
- modern
- friendly
- trustworthy
- useful
- easy to understand
- polished enough to look like a real startup MVP

## Visual Direction

Genio should use a structured admin/product UI style.

The dashboard and internal app pages should be inspired by Shopify admin in terms of clarity, layout, and usability, but not branding.

Use:

- sidebar navigation
- topbar navigation
- light gray app background
- white panels
- subtle borders
- minimal shadows
- compact but readable cards
- clean data tables
- useful status badges
- consistent spacing
- medium-small radius

Avoid:

- generic soft SaaS cards everywhere
- oversized rounded cards
- heavy shadows
- excessive gradients
- decorative blobs in the dashboard
- inconsistent card styles
- one-off page-specific UI systems

## Figma Frame Map

Use these Figma frames as references:

### Landing

Frame: `Landing Page Principal`

Purpose:
Marketing page for explaining Genio, showing benefits, templates, AI, commerce, and final CTA.

### Dashboard

Frame: `Dashboard Principal`

Purpose:
Main control center after login. This is the most important reference for the app shell.

### Editor

Frame: `Editor de Sitios`

Purpose:
Website builder UI with left tools panel, central canvas, and right properties panel.

### Templates

Frame: `Galería de Plantillas Full-Width`

Purpose:
Template discovery page with search, filters, and grid cards.

### Store / Inventory

Frame: `Tienda e Inventario`

Purpose:
Store management screen with product table, summary card, alerts, and pending tasks.

### AI Onboarding

Frame: `Asistente AI: Inicio`

Purpose:
Guided flow for generating a first website draft with AI.

## Color Direction

Use the Figma colors where available. If tokens are needed, use this base palette:

### Primary

- Navy: `#102A43`
- Rich Blue: `#1D4ED8`

### Secondary

- Teal: `#14B8A6`
- Soft Teal: `#CCFBF1`

### Neutral

- App Background: `#F5F7FA`
- Surface: `#FFFFFF`
- Surface Alt: `#F8FAFC`
- Border: `#E2E8F0`
- Text Primary: `#0F172A`
- Text Secondary: `#475569`
- Muted Text: `#64748B`

### Accent

- Soft Violet: `#8B5CF6`
- Muted Coral: `#F97373`
- Warning: `#F59E0B`
- Success: `#16A34A`
- Danger: `#DC2626`

Use accent colors sparingly. Dashboard UI should mostly rely on neutrals, blue/teal accents, and subtle status colors.

## Typography

Use a modern sans-serif font.

Recommended fonts:

- Inter
- Geist
- Manrope
- Plus Jakarta Sans

The Figma editor panel references Manrope in some controls. If the project already uses a global font, keep it consistent unless changing it is simple and safe.

Typography principles:

- clear headings
- readable body text
- small labels in uppercase only when useful
- avoid tiny low-contrast text
- use consistent font weights

## Radius

Use smaller radius than generic SaaS templates.

Recommended:

- App panels: `10px–14px`
- Cards: `10px–14px`
- Buttons: `8px–12px`
- Inputs: `8px–12px`
- Badges: pill radius only for compact status labels

Avoid using `24px–32px` radius for dashboard cards.

## Shadows

Prefer border-first UI.

Use shadows only for:

- dropdowns
- modals
- floating toolbars
- canvas overlays
- important preview cards

Avoid heavy shadows on every card.

## Layout System

### App Shell

Internal app pages should use a shared shell:

- left sidebar
- topbar
- main content area
- page header
- structured content panels

Pages that should use the shell:

- dashboard
- templates
- store/inventory
- settings
- analytics
- future admin pages

The editor may use a specialized shell, but it should still share visual language with the main app shell.

### Sidebar

The sidebar should contain:

- Genio brand/workspace area
- primary navigation
- create new site button where appropriate
- settings/help item near the bottom

Do not duplicate unrelated sidebar implementations.

### Topbar

The topbar can contain:

- search
- quick links
- notifications
- user/profile action
- preview/publish actions in editor context

Topbar styling should remain consistent across app pages.

## Dashboard Design Requirements

The dashboard should be based on the Figma frame `Dashboard Principal`.

Required sections:

1. Sidebar navigation
2. Topbar with search and account actions
3. Header with greeting and short description
4. Main CTA: create new site
5. Quick actions panel
6. Website performance panel
7. Recent websites panel
8. Store summary panel
9. Alerts or pending tasks

The dashboard should feel like a control center, not a marketing page.

Use realistic Genio data examples:

- visits
- published sites
- draft sites
- orders
- inventory alerts
- AI generation shortcuts

Use Costa Rica-friendly copy and currency.

Examples:

- `₡450,000`
- `Ventas del mes`
- `Pedidos pendientes`
- `Crear nuevo sitio`
- `Continuar editando`
- `Inventario bajo`

Avoid:

- `EUR`
- `€`
- Madrid examples
- fake real testimonials/data claims

## Editor Design Requirements

The editor should be based on `Editor de Sitios`.

Required structure:

- left app sidebar
- topbar with navigation/actions
- left components/tools panel
- central website canvas
- right properties panel

The editor should feel like a real no-code builder.

Editor blocks may include:

- Texto
- Imagen
- Botón
- Video
- Formulario
- Mapa
- Header
- Footer
- Producto
- Galería

The right panel should include controls for:

- content
- typography
- color
- spacing
- alignment
- component settings

## Templates Design Requirements

The templates page should be based on `Galería de Plantillas Full-Width`.

Required structure:

- app shell
- search topbar
- page header
- filters sidebar
- template grid
- category and style filters
- template preview cards
- hover/use template action

Template categories should include:

- Tienda
- Belleza
- Restaurante
- Servicios
- Portfolio
- Landing page

## Store / Inventory Design Requirements

The store page should be based on `Tienda e Inventario`.

Required structure:

- app shell
- topbar
- alert banner for important inventory issues
- page header
- product table
- filters/toolbar
- summary sidebar
- pending tasks

Use colones or neutral values, not euros.

Product statuses:

- Activo
- Borrador
- Inventario bajo
- Agotado

## Landing Page Requirements

The landing page should be based on `Landing Page Principal`, but it can be simplified for implementation.

Recommended sections:

1. Navbar
2. Hero
3. Product mockup
4. Problem/solution
5. Features
6. Product showcase
7. Templates
8. How it works
9. AI section
10. Commerce section
11. Final CTA
12. Footer

Optional sections:

- testimonials
- social proof

If testimonials are used, make them clearly fictional placeholders or replace with neutral benefit quotes until real customers exist.

## Copywriting Rules

Use Spanish copy that feels clear, friendly, and useful.

Good examples:

- `Creá tu sitio web sin programar`
- `Diseñá, publicá y administrá tu negocio desde un solo lugar.`
- `Continuar editando`
- `Crear nuevo sitio`
- `Agregá tu primer producto`
- `Genio puede generar una primera versión por vos.`

Avoid:

- overly technical language
- generic SaaS filler
- English copy unless the page already requires it
- fake data that sounds like real claims

## Component Rules

Prefer reusable components:

- `AppShell`
- `AppSidebar`
- `AppTopbar`
- `PageHeader`
- `SectionPanel`
- `StatCard`
- `QuickActionCard`
- `SiteCard`
- `TemplateCard`
- `ProductTable`
- `StatusBadge`
- `EmptyState`
- `AlertBanner`

Use variants rather than duplicate components.

Example:

- `AppTopbar variant="dashboard"`
- `AppTopbar variant="editor"`
- `AppSidebar activeItem="dashboard"`

## Accessibility

Ensure:

- readable contrast
- focus states
- semantic buttons and links
- labels for inputs
- responsive behavior
- keyboard-friendly controls where possible

## Final Design Goal

Genio should look like a professional, polished, structured SaaS MVP.

It should feel practical and trustworthy for Costa Rican entrepreneurs who want to create and manage a website without coding.
