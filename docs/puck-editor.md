# Puck Editor - Genio

## Purpose

Puck is the core visual editor for Genio.

It allows users to create websites visually by adding, editing, arranging, and publishing reusable components without writing code.

The editor must stay simple for non-technical users while giving enough flexibility to create real landing pages, portfolios, service pages, and future store pages.

## Current editor route

The authenticated editor route is:

```txt
app/puck/[...puckPath]/page.tsx
```

This route should remain responsible for:

- Requiring authentication.
- Loading the current user.
- Building the page path from the catch-all route params.
- Loading page content from MongoDB.
- Checking ownership before editing.
- Loading recent designs for the sidebar.
- Rendering the Puck client.

## Current editor client

The editor client is:

```txt
app/puck/[...puckPath]/client.tsx
```

This component should remain responsible for:

- Rendering the Puck editor.
- Loading `puck.config`.
- Enabling Puck AI plugin.
- Rendering editor-specific UI such as recent designs sidebar.
- Publishing through `/puck/api`.
- Providing a clear `Ver en vivo` action.

## Current Puck config

The current Puck component registry is:

```txt
puck.config.tsx
```

It defines:

- Component categories.
- Component fields.
- Component render functions.
- Shared options for padding, colors, borders, shadows, rounded corners, gaps, and icons.

This file is important and should not be rewritten casually.

## Component categories

Current and future components should be organized by user-friendly categories.

Recommended categories:

- Estructura: headers, footers, dividers, spacing, layout blocks.
- Heroes: main landing sections.
- Contenido: text, paragraphs, content sections.
- Características: feature grids, statistics, mission/vision/values.
- Equipo: profiles and team sections.
- Servicios y productos: services, product cards, pricing cards.
- Multimedia: images, galleries, carousels, videos, comparisons.
- Prueba social: testimonials, FAQs, logos.
- Portafolio: project grids and creative work.
- Conversión: contact, newsletter, CTA, steps.
- Utilidades: buttons, timeline, simple helpers.

Use Spanish category names when they are visible to Genio users.

## Puck component rules

Every Puck component should be:

- Responsive.
- Editable.
- Reusable.
- Safe by default.
- Visually consistent with `docs/design-system.md`.
- Understandable for non-technical users.
- Useful for a real website.
- Stable in both editor preview and published rendering.

## Field rules

Puck fields should be simple and user-friendly.

Good field names:

- `Título`.
- `Descripción`.
- `Texto del botón`.
- `Enlace del botón`.
- `Imagen`.
- `Color de fondo`.
- `Color del texto`.
- `Espaciado`.
- `Alineación`.

Avoid exposing overly technical field names in visible labels:

- `JSON`.
- `Data object`.
- `Schema`.
- `Props`.
- `Mutation`.
- `ClassName` unless the field is intentionally advanced.

## Default values

Every component should have useful defaults.

Defaults should:

- Look good immediately after inserting the component.
- Help the user understand the component purpose.
- Avoid empty broken layouts.
- Avoid placeholder text that feels like developer testing.

Good defaults:

- `Crea tu sitio con Genio`.
- `Muestra tus servicios de forma profesional`.
- `Conoce más`.
- `Contáctanos`.

Avoid:

- `Lorem ipsum` for user-facing defaults.
- Empty images that break layout.
- Generic test strings like `test`, `foo`, or `abc`.

## Styling rules

Use Tailwind CSS classes that are safe and predictable.

Rules:

- Keep spacing consistent.
- Use responsive classes for mobile/tablet/desktop.
- Avoid overly complex dynamic class generation.
- Prefer mapped options for user-selectable styles.
- Do not let users accidentally create unreadable color combinations when possible.
- Avoid huge animation-heavy components inside the editor.

## Responsive rules

Every component must work on:

- Mobile.
- Tablet.
- Desktop.

Rules:

- Use responsive grids.
- Stack content on mobile when needed.
- Avoid fixed widths that break small screens.
- Images should use safe aspect ratios.
- Long titles and descriptions should not destroy layout.
- Buttons should wrap or stack on small screens.

## Editor vs published rendering

Components must work in two contexts:

1. Editor preview.
2. Published public page.

Rules:

- Do not include editor-only controls inside published components.
- Do not rely on editor-only state for published rendering.
- Do not expose private dashboard/editor links in published pages.
- Published pages should render cleanly even if a user leaves some fields blank.

## Header rules

The Header component is important because it controls navigation in user-created sites.

Rules:

- Navigation links should use simple labels and URLs.
- Mobile menu must be responsive.
- Header should not break with long labels.
- Header should support logo or text title.
- Header should work in published pages.
- Avoid hardcoded Genio navigation inside user-created site headers.

## Footer rules

The Footer component should help users close a website professionally.

Rules:

- Support business name.
- Support short description.
- Support grouped links.
- Support social links.
- Support copyright text.
- Keep layout responsive.

## Product and store component rules

Store-related Puck components should be added carefully.

Future product components should support:

- Product image.
- Product title.
- Short description.
- Price.
- Badge or status.
- CTA button.
- Optional product link/request action.

When connected to real inventory later:

- Do not hardcode products inside page content if the product should come from store data.
- Consider whether the component is static content or database-connected content.
- Clearly separate editable design settings from real product data.

## AI plugin rules

Puck AI should help users create faster, but it should not make the editor unpredictable.

Rules:

- AI-generated components must still follow the design system.
- AI should create useful sections, not random decorative content.
- AI should avoid inserting invalid fields.
- AI should not overwrite existing user content without confirmation.
- Future AI usage should be trackable for credits/limits.

## Publishing rules

Publishing should:

- Save valid Puck data.
- Preserve the page path.
- Respect user ownership.
- Avoid saving editor-only UI state.
- Return clear feedback to the user when possible.

The current editor publishes using `/puck/api` from the Puck `onPublish` callback.

## Recent designs sidebar

The editor sidebar should help users quickly move between their own designs.

Rules:

- Show only designs owned by the current user.
- Do not show deleted designs unless the current view is specifically for deleted items.
- Keep titles readable.
- Show updated date when useful.
- Do not let the sidebar distract from the editor workspace.

## Component growth strategy

Do not add too many components without organizing them.

Recommended order:

1. Improve existing components.
2. Make core components reliable: Header, Hero, Text, Button, Image, Footer.
3. Add business-focused sections: Services, Contact, FAQ, Testimonials.
4. Add store-focused components: ProductCard, ProductGrid, Pricing, Inventory-aware sections.
5. Add template-specific sections.
6. Modularize `puck.config.tsx` when it becomes hard to maintain.

## Modularization plan

When `puck.config.tsx` becomes too large, split it gradually.

Recommended future structure:

```txt
puck/
  config.tsx
  types.ts
  categories.ts
  shared-options.ts
  utils.ts
  components/
    Header.tsx
    Hero.tsx
    HeroAnimado.tsx
    Button.tsx
    Image.tsx
    Footer.tsx
    ProductCard.tsx
```

Do not perform this split unless the task specifically asks for it or a new feature becomes hard to maintain without it.

## Testing checklist for Puck changes

After changing Puck behavior or components, manually check:

- Editor route loads while logged in.
- Unauthenticated users cannot access private editor routes.
- A new component can be inserted.
- Component fields can be edited.
- Page can be published.
- Published page renders correctly.
- Mobile layout works.
- Recent designs sidebar still works.
- Existing saved pages do not break.

## Documentation rule

Update this document when:

- A new major Puck category is added.
- Component architecture changes.
- Publishing flow changes.
- Puck AI behavior changes.
- Store-connected Puck components are introduced.
