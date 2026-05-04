# Codex Rules for Genio

These rules are the default operating guide for any AI coding work in this repository.

## Project identity

Genio is a no-code / low-code website builder for entrepreneurs, small businesses, stores, and service providers. The product must stay simple for non-technical users while remaining scalable enough to become a real SaaS platform.

The core brand line is:

```txt
Genio: Tu web, tu manera.
```

For visual identity, logo meaning, typography, colors, and brand motifs, read:

```txt
docs/brand-identity.md
```

## Before coding

Always read the relevant docs before making changes:

- `docs/product-vision.md` for product direction.
- `docs/brand-identity.md` for brand identity, logo concept, color usage, typography, and visual motifs.
- `docs/architecture.md` for technical structure.
- `docs/design-system.md` for UI and visual rules.
- `docs/puck-editor.md` when modifying Puck components, editor routes, saved page data, preview, or publishing behavior.
- `docs/data-ownership.md` before modifying Prisma models, Mongo page/content models, ownership checks, favorites, deleted state, publishing state, or site/page data.
- `docs/public-routing.md` before modifying public routes, published page rendering, legacy `/{publicId}` behavior, `/s/{siteIdentifier}` behavior, route namespaces, or custom-domain logic.

## General coding rules

- Make the smallest safe change possible.
- Do not rewrite unrelated files.
- Do not remove existing functionality unless the task explicitly asks for it.
- Do not change authentication logic unless the task explicitly asks for it.
- Do not change database schemas unless the task explicitly asks for it.
- Do not install new packages unless the task explicitly asks for it.
- Prefer readable, maintainable code over clever code.
- Prefer reusable components and shared utilities.
- Keep business logic separated from UI when reasonable.
- Keep route-specific code close to its route when it is not reused elsewhere.
- Use TypeScript types when possible.
- Avoid using `any` unless there is a clear temporary reason.
- Avoid hardcoded user/business data in reusable components.

## Brand and UI rules

- Follow `docs/brand-identity.md` for brand meaning and visual identity.
- Follow `docs/design-system.md` for UI rules.
- Genio should communicate `Tu web, tu manera`.
- Use the logo-inspired visual language carefully: modular blocks, geometric cards, play/start details, sliders/controls, editable panels, and drag-and-drop object patterns.
- Use deep blue, purple, and bright blue as the core brand palette.
- Use turquoise and warm accents as support, not as replacements for the main identity.
- Keep the experience warm, approachable, professional, and empowering for small business owners and women-owned SMEs without becoming stereotypically feminine, childish, or overly decorative.
- Use Tailwind CSS and existing UI patterns.
- Prefer shadcn/Radix-style primitives when already present.
- Keep interfaces responsive.
- Prioritize clear spacing, hierarchy, accessibility, and empty states.
- Avoid visual clutter.
- Do not make major UI redesigns unless requested.

## Puck rules

- Follow `docs/puck-editor.md`.
- Puck components must be editable, responsive, reusable, and safe by default.
- Puck fields should use labels understandable by non-technical users.
- Avoid exposing technical implementation details to the end user.
- Do not break published page rendering while changing editor behavior.
- Header, footer, product, media, and section components should work both in editor preview and published output.

## Data, routing, and persistence rules

- Follow `docs/data-ownership.md` for all ownership and database responsibility decisions.
- Follow `docs/public-routing.md` for all public URL and route resolution decisions.
- Prisma/PostgreSQL should be the source of truth for users, ownership, site/page metadata, favorites, deleted state, published state, custom domains, products, collections, and future SaaS data.
- MongoDB/Mongoose should store flexible Puck content, including draft and published content.
- Be careful when moving data between Prisma and MongoDB; document the reason first.
- Do not mix persistence responsibilities without a clear migration plan.
- Use minimal selected fields when querying user-owned data.
- Always preserve ownership checks for private editor/page data.
- Do not deepen dependence on global Mongo `path` as the long-term ownership key.
- Keep legacy `/{publicId}` public links working unless explicitly instructed otherwise.

## Authentication and security rules

- Protected routes must keep session checks.
- Never expose private editor routes or user-owned data without verifying ownership.
- Never log secrets, tokens, passwords, OTPs, or environment variables.
- Keep 2FA and recovery flows isolated from unrelated feature changes.
- Validate server inputs, especially for page publishing, user content, product data, and future order requests.

## Performance rules

- Avoid large client bundles when a server component can do the job.
- Avoid unnecessary database queries.
- Avoid fetching full documents when only summaries are needed.
- Keep Puck component configuration organized and modular as it grows.
- Avoid making the editor slower with heavy animations or unnecessary state.

## When fixing bugs

Explain:

1. Root cause.
2. Files changed.
3. Why the fix is safe.
4. How to test manually.

Prefer a small fix first. Refactor only if the bug cannot be fixed safely without it.

## When implementing a feature

Use this order:

1. Understand the feature goal.
2. Identify affected routes, components, data models, and docs.
3. Make the smallest working version.
4. Add only necessary UI.
5. Preserve existing behavior.
6. Update documentation if the feature changes architecture, data, routing, brand, UI, or product behavior.

## First implementation scope reminder

For the future site/page migration, do not implement everything at once.

Near-term foundation:

- `Site`.
- `PageMetadata`.
- `PageFavorite`.
- Puck content linked by `siteId/pageId`.
- Legacy `/{publicId}` compatibility.
- Future `/s/{siteIdentifier}` support.
- Draft vs published Puck content.

Future phases:

- Products.
- Collections.
- Custom domains.
- Inventory.
- Checkout/order requests.
- Billing.
- AI credits.

## End-of-task response format

Always summarize:

- What changed.
- Files modified.
- Manual testing steps.
- Risks or assumptions.
- Recommended next step.
