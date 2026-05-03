# Codex Rules for Genio

These rules are the default operating guide for any AI coding work in this repository.

## Project identity

Genio is a no-code / low-code website builder for entrepreneurs, small businesses, stores, and service providers. The product must stay simple for non-technical users while remaining scalable enough to become a real SaaS platform.

## Before coding

Always read the relevant docs before making changes:

- `docs/product-vision.md` for product direction.
- `docs/architecture.md` for technical structure.
- `docs/design-system.md` for UI and visual rules.
- `docs/puck-editor.md` when modifying Puck components, editor routes, saved page data, preview, or publishing behavior.

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

## UI rules

- Follow `docs/design-system.md`.
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

## Data and persistence rules

- Prisma/PostgreSQL currently handles users, roles, favorites, and authentication-related data.
- MongoDB/Mongoose currently handles editable page content and published page data.
- Be careful when moving data between Prisma and MongoDB; document the reason first.
- Do not mix persistence responsibilities without a clear migration plan.
- Use minimal selected fields when querying user-owned data.
- Always preserve ownership checks for private editor/page data.

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
6. Update documentation if the feature changes architecture, data, or product behavior.

## End-of-task response format

Always summarize:

- What changed.
- Files modified.
- Manual testing steps.
- Risks or assumptions.
- Recommended next step.
