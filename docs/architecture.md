# Genio Architecture

## Current stack

Genio is built with:

- Next.js App Router.
- React.
- TypeScript.
- Tailwind CSS.
- Puck Editor.
- Puck AI plugin.
- Prisma.
- PostgreSQL.
- MongoDB / Mongoose.
- NextAuth.
- Resend / Nodemailer for email-related flows.
- Radix UI / shadcn-style UI primitives.
- Framer Motion.
- Lucide React.

The project currently uses Node.js runtime for server features that require database access and authentication.

## High-level architecture

Genio has four major areas:

1. Authentication and user accounts.
2. Dashboard and user workspace.
3. Puck visual editor.
4. Published page rendering.

Future areas:

5. Templates.
6. Store and inventory tools.
7. Customer request/order flows.
8. AI-assisted site generation.
9. SaaS plans, limits, billing, and analytics.

## Source-of-truth documents

Use these documents when making architectural changes:

- `docs/data-ownership.md`: source of truth for Prisma/PostgreSQL vs MongoDB responsibilities, ownership rules, status, favorites, deleted state, publishing state, and migration phases.
- `docs/public-routing.md`: source of truth for public URL behavior, legacy `/{publicId}` links, future `/s/{siteIdentifier}` links, custom-domain routing, route namespaces, and home page resolution.
- `docs/puck-editor.md`: source of truth for editor behavior and Puck component rules.
- `docs/design-system.md`: source of truth for Genio visual/UI rules.

Before changing Prisma models, Mongo page/content documents, public routes, publishing, or ownership checks, read `docs/data-ownership.md` and `docs/public-routing.md` first.

## Routing structure

Important current routes include:

- `app/dashboard/page.tsx`: main dashboard entry.
- `app/dashboard/DashboardClient.tsx`: client dashboard UI.
- `app/dashboard/favorites/page.tsx`: favorites page.
- `app/dashboard/favorites/FavoritesClient.tsx`: favorites client UI.
- `app/dashboard/deleted/DeletedClient.tsx`: deleted designs UI.
- `app/puck/[...puckPath]/page.tsx`: authenticated Puck editor route.
- `app/puck/[...puckPath]/client.tsx`: client-side Puck editor instance.
- `app/[...puckPath]/page.tsx`: public/published page route.
- `app/layout.tsx`: root app layout.

## Puck editor architecture

The editor route is located at:

- `app/puck/[...puckPath]/page.tsx`

This route:

- Requires a valid NextAuth session.
- Redirects unauthenticated users to login.
- Loads the current Prisma user by email.
- Builds the editable path from `params.puckPath`.
- Loads page content from MongoDB through `PageModel`.
- Checks ownership before allowing editing.
- Loads recent user designs for the editor sidebar.
- Renders the client Puck editor.

The client editor is located at:

- `app/puck/[...puckPath]/client.tsx`

This client:

- Imports Puck CSS.
- Loads `puck.config`.
- Uses the Puck AI plugin.
- Displays a sidebar with recent designs.
- Publishes page content through `/puck/api`.
- Includes a `Ver en vivo` action that opens the published path.

## Puck configuration

The main component registry is currently in:

- `puck.config.tsx`

This file defines:

- Puck categories.
- Component props/types.
- Component fields.
- Render functions for visual sections.
- Shared style options for padding, gaps, colors, borders, shadows, and rounded corners.

As the project grows, this file should be modularized to avoid becoming too large.

Recommended future structure:

```txt
puck/
  config.tsx
  categories.ts
  shared-options.ts
  types.ts
  components/
    Header.tsx
    Hero.tsx
    Button.tsx
    ProductCard.tsx
    Footer.tsx
```

Do not modularize everything at once. Do it gradually when adding or refactoring components.

## Data architecture

Genio currently uses two persistence layers.

For the detailed target model, ownership boundaries, and migration phases, use:

```txt
docs/data-ownership.md
```

### PostgreSQL / Prisma

Prisma is currently used for structured relational data such as:

- Users.
- Roles.
- Favorites.
- 2FA tokens.
- Pre-authentication tokens.

Current Prisma schema includes:

- `User`.
- `Favorite`.
- `TwoFactorToken`.
- `PreAuthToken`.
- `Role` enum with `USER`, `SUBADMIN`, and `ADMIN`.

Future Prisma responsibilities should include:

- `Site`.
- `PageMetadata`.
- `PageFavorite`.
- `CustomDomain` in a later domain phase.
- `Product` and `Collection` in a later store phase.

### MongoDB / Mongoose

MongoDB is currently used for editable page documents and Puck page content.

This makes sense because Puck content is flexible JSON-like structured content that can change as components evolve.

Future MongoDB responsibilities should be limited to flexible Puck content, especially:

- `draftContent`.
- `publishedContent`.
- component tree data.
- future Puck-backed templates.

MongoDB should not be the long-term source of truth for ownership, favorites, deleted state, published state, domains, products, collections, or SaaS permissions.

## Public routing architecture

For the detailed public URL model, use:

```txt
docs/public-routing.md
```

Target public routing rule:

```txt
Host or /s/{siteIdentifier} resolves Site.
The remaining path resolves a site-local page, product, or collection.
Prisma owns identity and status.
MongoDB renders only flexible Puck content.
```

Important routing principles:

- Keep current `/{publicId}` links working as legacy compatibility.
- Treat the current random public segment as `Site.publicId` in the future model.
- Use `/s/{siteIdentifier}` for future Genio-hosted public links.
- Custom domains identify the `Site` by host and should not require the site slug in the path.
- Page slugs are unique inside a site, not globally.

## Data ownership rules

User-owned data must always be protected.

Rules:

- The editor must verify session before loading private editable content.
- The editor must verify that the page belongs to the current user.
- Public/published pages may be readable without session, but private editor state must not be exposed.
- Dashboard queries should only return data owned by the current user.
- Favor selecting only required fields.
- For future ownership changes, Prisma should verify ownership before MongoDB loads draft Puck content.

## Authentication architecture

Authentication uses NextAuth and Prisma-backed user lookup.

Current auth-related features include:

- User email and password.
- Roles.
- Recovery email.
- Optional profile photo fields.
- Email verification fields.
- Two-factor authentication fields.
- Pre-authentication token flow.

Auth rules:

- Do not modify auth logic during unrelated UI or editor tasks.
- Keep 2FA flows isolated.
- Do not expose token hashes or private auth fields to the client.
- Use server-side session checks for protected routes.

## Dashboard architecture

The dashboard is the user workspace.

It should eventually support:

- Recent designs.
- Favorites.
- Deleted/restorable designs.
- Site creation.
- Template browsing.
- Account/profile settings.
- Store/product management.
- Inventory.
- AI generation entry points.

Dashboard UI should remain clean and easy to scan.

## Published page architecture

Published pages should render saved Puck content from the public route.

Rules:

- Published rendering should be stable and fast.
- Published pages should not require login unless the site/page is explicitly private in the future.
- Published pages should render the same component content as the editor preview when possible.
- Do not let editor-only UI leak into published pages.
- Public rendering should eventually load published Puck content by `pageId`, not global Mongo path.

## Future store architecture

Store features should be added gradually.

Recommended future entities:

- `Site`.
- `PageMetadata`.
- `Product`.
- `Collection`.
- `InventoryMovement`.
- `CustomerRequest` or `OrderRequest`.
- `StoreSettings`.

Recommended approach:

1. Keep website/page creation stable first.
2. Add simple product CRUD.
3. Add product grid Puck component connected to site products.
4. Add customer request flow.
5. Add inventory tracking.
6. Add notifications and analytics later.

Do not add product and collection routing until structured store data exists in Prisma.

## Future AI architecture

AI features should support the creation workflow.

Good AI use cases:

- Generate initial page structure.
- Suggest section order.
- Improve copy.
- Suggest colors and style direction.
- Generate store descriptions.
- Create template variants.

Rules:

- AI should not overwrite user content without confirmation.
- AI credit usage should be tracked in the future.
- AI outputs should still follow the design system and Puck rules.

## Recommended coding boundaries

### Use server components for

- Auth checks.
- Data fetching.
- Ownership checks.
- Redirects.
- Loading initial editor/dashboard data.

### Use client components for

- Interactive UI.
- Puck editor.
- Sidebar toggles.
- Modals.
- Form interactions.
- Optimistic UI when appropriate.

### Use API routes or server actions for

- Saving Puck data.
- Publishing.
- CRUD actions.
- Mutations that require validation and ownership checks.

## Scalability priorities

Highest priority:

1. Stable auth and ownership checks.
2. Reliable page saving and publishing.
3. Organized Puck components.
4. Clean dashboard UX.
5. Clear separation between editor, dashboard, and published pages.
6. Gradual migration from global Mongo path toward `Site + PageMetadata + PuckContent`.

Medium priority:

1. Templates.
2. Products and inventory.
3. AI generation flows.
4. Analytics.
5. Custom domains.

Lower priority until SaaS launch:

1. Billing.
2. Multi-team collaboration.
3. Advanced permissions.
4. Marketplace features.

## Technical debt to watch

- `puck.config.tsx` can become too large.
- Mixed Prisma and MongoDB responsibilities need clear documentation.
- Old README references may become outdated when package versions change.
- Editor-only logic must stay separate from published page rendering.
- Public routes must not accidentally expose user-owned private content.
- Current global Mongo `path` behavior should be treated as legacy, not as the long-term ownership model.

## Documentation rule

Update this file when:

- A new major route area is added.
- Data ownership rules change.
- Prisma or MongoDB responsibilities change.
- Puck architecture changes.
- Store or AI architecture becomes real implementation.

Update `docs/data-ownership.md` when database responsibility or ownership rules change.

Update `docs/public-routing.md` when public URL behavior, legacy route compatibility, `/s/{siteIdentifier}`, route namespaces, or custom-domain behavior changes.
