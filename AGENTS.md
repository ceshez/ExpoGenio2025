# AGENTS.md — Genio

## Project Context

Genio is a drag-and-drop website builder for Costa Rican SMEs, entrepreneurs, and non-technical users.

The product helps users create websites, landing pages, portfolios, and simple online stores without coding. It includes a visual editor, templates, AI-assisted website generation, and store/inventory management.

The current visual reference is the Figma file:

https://www.figma.com/design/B6UMO5VsurgE58wLIB80sA/genio?node-id=0-1

Use the Figma design as the primary visual source for layout, hierarchy, spacing, component structure, and product direction.

## Main Design Direction

Genio should feel like a serious SaaS product, not a generic template.

The app UI should be inspired by the clarity and organization of Shopify admin, but it must not copy Shopify branding, colors, icons, or exact layouts.

Prefer:

- structured admin layouts
- reusable product components
- clear sidebar and topbar patterns
- light gray app background
- white panels with subtle borders
- small to medium border radius
- minimal shadows
- compact but readable spacing
- clear hierarchy
- clean tables, lists, cards, and status badges

Avoid:

- generic oversized rounded cards
- heavy shadows
- excessive gradients
- decorative blobs in dashboard UI
- random one-off styles
- duplicated sidebars or topbars
- placeholder copy from foreign markets
- EUR/Madrid examples

## Required Figma Frames

Use these frames as the main references:

- `Landing Page Principal`
- `Dashboard Principal`
- `Editor de Sitios`
- `Galería de Plantillas Full-Width`
- `Tienda e Inventario`
- `Asistente AI: Inicio`

For the dashboard implementation, use `Dashboard Principal` as the primary reference.

## Tech Stack

Use the existing project stack:

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui when useful
- lucide-react for icons

Do not introduce unnecessary dependencies.

## Implementation Rules

Before creating new UI, inspect the existing routes, layouts, components, and styles.

When implementing the design:

1. Preserve existing functionality.
2. Convert the Figma design into reusable React components.
3. Do not paste generated Figma code blindly.
4. Do not style each page independently if a reusable component can solve it.
5. Keep the app responsive.
6. Prefer semantic, accessible HTML.
7. Keep components clean and easy to modify.
8. Use Tailwind utility classes consistently.
9. Keep copy in Spanish unless there is an existing product reason not to.

## Shared Components to Create or Reuse

Use shared components for all admin/product pages:

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

Create one sidebar and one topbar system. Do not create separate unrelated sidebars for dashboard, templates, store, and editor.

The editor can use a variant of the same shell or sidebar if needed.

## Content Localization Rules

Genio is initially focused on Costa Rica.

Use:

- Costa Rica examples
- San José examples when needed
- Costa Rican SMEs
- colones (`₡`) or neutral currency if the system does not yet support currency
- local business examples such as cafeterías, tiendas, salones de belleza, restaurantes, servicios profesionales, emprendimientos, and portfolios

Avoid:

- Madrid examples
- EUR values
- generic Silicon Valley-only copy
- fake claims that sound like real customer data

## Dashboard Priority

The dashboard must be implemented carefully and consistently.

The dashboard should include:

- sidebar
- topbar with search, quick links, notifications, and profile actions
- welcome/page header
- primary CTA to create a new site
- quick actions panel
- website performance panel
- recent websites panel
- store summary panel
- alerts or pending tasks

The dashboard should feel like a real business control center for Genio users.

## Final Goal

Every page should look like part of the same product.

The final interface should communicate:

- trust
- simplicity
- professionalism
- control
- ease of use
- startup-level polish
