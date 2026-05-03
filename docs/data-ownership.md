# Genio Data Ownership Architecture

## Purpose

This document defines how Genio should split data responsibilities between Prisma/PostgreSQL and MongoDB.

It focuses on ownership, status, persistence boundaries, and migration from the current path-based Mongo page model.

For public URL formats and route resolution behavior, see:

```txt
docs/public-routing.md
```

## Core Rule

Prisma/PostgreSQL owns the question:

```txt
Who owns this, where does it live, and what state is it in?
```

MongoDB owns the question:

```txt
What flexible Puck content should the editor or public renderer display?
```

Do not use MongoDB as the main source of truth for ownership, favorites, deleted state, published status, domains, products, collections, billing limits, or user permissions.

## Prisma/PostgreSQL Responsibilities

Prisma should own structured, relational, security-sensitive, and SaaS-critical data:

- Users.
- Roles.
- Authentication-related account records.
- Sites.
- Page metadata.
- Custom domains.
- Products.
- Collections.
- Favorites.
- Deleted/restorable state.
- Published/draft status.
- Future plans, limits, AI credits, analytics metadata, orders, inventory, and customer requests.

Prisma should be queried first for protected editor access and dashboard data.

## MongoDB Responsibilities

MongoDB should own flexible Puck content:

- Puck draft content.
- Puck published content.
- Puck component tree data.
- Future Puck-backed templates.
- Future custom product or collection page layout templates.

MongoDB should not own canonical permissions or routing identity.

## Recommended Prisma Models

### User

The existing `User` model remains the source of truth for accounts and authentication.

Recommended responsibilities:

```txt
id
email
password
name
lastName
role
2FA/recovery fields
sites[]
favoritePages[]
```

### Site

`Site` is the internal business/website container.

Recommended fields:

```txt
id
ownerId
displayName
slug
publicId
publicSlug
status
primaryDomainId
createdAt
updatedAt
deletedAt
publishedAt
```

Responsibilities:

- Own public website identity.
- Own page/product/collection namespace.
- Own custom domain relationships.
- Own future store settings and SaaS limits.

Field meanings:

- `displayName`: friendly name shown in the dashboard. Not unique.
- `slug`: internal dashboard slug. Unique per owner, not globally.
- `publicId`: random stable identifier. Globally unique. Used for legacy and fallback public URLs.
- `publicSlug`: human-readable public Genio-hosted identifier. Globally unique when present. Used for friendly `/s/{publicSlug}` URLs.
- `status`: site lifecycle state.
- `primaryDomainId`: optional preferred custom domain for canonical URLs later.

Recommended statuses:

```txt
draft
published
unpublished
archived
deleted
```

Rules:

- `ownerId + slug` should be unique.
- `publicId` must be globally unique.
- `publicSlug` must be globally unique when present.
- `displayName` should not be unique.

### CustomDomain

`CustomDomain` maps a verified domain to one `Site`.

Recommended fields:

```txt
id
siteId
domain
status
verificationToken
verifiedAt
activatedAt
isPrimary
createdAt
updatedAt
```

Recommended statuses:

```txt
pending
verified
active
failed
disabled
```

Status meanings:

- `pending`: domain was added but DNS has not been verified.
- `verified`: user proved ownership, usually through DNS TXT.
- `active`: domain points to Genio and can render the site.
- `failed`: verification or routing failed.
- `disabled`: domain is intentionally disabled.

Rules:

- `domain` must be globally unique.
- Only active domains should render public sites.
- A domain points to exactly one `Site`.
- `verified` is not enough to render if the domain does not point to Genio yet.

### PageMetadata

`PageMetadata` represents one page inside one `Site`.

Recommended fields:

```txt
id
siteId
ownerId
title
slug
routePath
status
isHomePage
isDeleted
deletedAt
publishedAt
lastEditedAt
createdAt
updatedAt
```

Responsibilities:

- Own page title and slug.
- Own page status.
- Identify the home page.
- Support dashboard listing.
- Resolve public page routes.
- Link to MongoDB Puck content through `pageId`.

Recommended statuses:

```txt
draft
published
unpublished
archived
```

Rules:

- `siteId + slug` should be unique.
- Only one page per site should have `isHomePage = true`.
- Deleted pages should not render publicly.
- Deleted pages may still reserve their slug until permanently deleted or restored with a new slug.

### Product - Future Store Phase

`Product` should live in Prisma/PostgreSQL because it is structured business data.

Recommended fields:

```txt
id
siteId
ownerId
title
slug
status
price
currency
description
createdAt
updatedAt
```

Responsibilities:

- Own product identity.
- Own product route.
- Own future inventory, request, and order relationships.

Rules:

- `siteId + slug` should be unique.
- Products should not be stored as Puck-only content.
- Do not implement products until the site/page routing foundation is stable.

### Collection - Future Store Phase

`Collection` should live in Prisma/PostgreSQL because it groups products and owns a public route.

Recommended fields:

```txt
id
siteId
ownerId
title
slug
status
createdAt
updatedAt
```

Responsibilities:

- Own collection identity.
- Own collection route.
- Support future product grouping and filtering.

Rules:

- `siteId + slug` should be unique.
- Do not implement collections until product data exists in Prisma.

### PageFavorite

Favorites should be user-specific dashboard state.

Recommended fields:

```txt
id
userId
pageId
createdAt
```

Rules:

- `userId + pageId` should be unique.
- Favorites should not be stored inside MongoDB Puck content.
- Deleting a page should hide it from favorites.
- Permanently deleting a page should remove related favorites.

## Recommended MongoDB PuckContent Shape

MongoDB should store flexible Puck content by Prisma IDs.

Recommended collection:

```txt
puckContents
```

Recommended document shape:

```txt
pageId
siteId
ownerId
contentType
draftContent
publishedContent
componentRegistryVersion
createdAt
updatedAt
lastPublishedAt
```

Recommended `contentType` values:

```txt
page
productPage
collectionPage
template
```

Near-term recommendation:

- Only normal pages need Puck content at first.
- Products and collections should be Prisma-rendered first.
- Product and collection templates can become Puck-backed later.

Rules:

- `pageId` should be unique for page content.
- Editor routes should load `draftContent`.
- Public routes should load `publishedContent`.
- Publishing should copy validated `draftContent` into `publishedContent`.
- MongoDB should not own canonical ownership, deleted status, favorites, product identity, collection identity, or custom-domain state.
- Mongo `ownerId` is only a safety/debug mirror. Prisma remains the authority.

## Ownership Rules

### Editor Access

To edit a page:

```txt
1. User must have a valid session.
2. Prisma must load the current user.
3. Prisma must resolve the Site and PageMetadata.
4. The Site must belong to the current user.
5. The PageMetadata must belong to that Site.
6. Only then should MongoDB load draftContent by pageId.
```

MongoDB content should never be loaded for private editor use before ownership is verified in Prisma.

### Dashboard Queries

Dashboard pages should query Prisma first.

Dashboard lists should come from:

```txt
Site
PageMetadata
PageFavorite
CustomDomain
Product
Collection
```

MongoDB should not be needed for normal dashboard lists unless showing a content-derived preview is necessary.

### Public Rendering

Public rendering should:

```txt
1. Resolve Site by Genio-hosted URL or active custom domain.
2. Resolve the site-local resource in Prisma.
3. Confirm Site and resource are published and not deleted.
4. Load Mongo publishedContent by pageId when rendering a Puck page.
5. Render public output.
```

Public pages should not expose draft content.

### Favorites

Favorites belong in Prisma as `PageFavorite`.

Rules:

- Favorites are user-specific.
- Favoriting a page does not modify Puck content.
- Favoriting a page does not modify page ownership.
- Deleted pages should be hidden from favorites lists.
- Permanent page deletion should remove related favorite rows.

### Deleted Status

Deleted/restorable status belongs in Prisma.

Rules:

- Soft delete sets `isDeleted = true` and `deletedAt`.
- Dashboard lists hide deleted records by default.
- Deleted records appear only in trash views.
- Deleted pages should not render publicly.
- Puck content can remain in Mongo until permanent deletion.
- Permanent deletion removes Prisma metadata, favorites, and Mongo Puck content.

### Published Status

Published status belongs in Prisma.

Rules:

- Draft pages are editable but not public.
- Published pages render Mongo `publishedContent`.
- Editing after publishing updates `draftContent` but does not affect the public page until publishing again.
- Unpublishing changes Prisma status and hides the public page without deleting draft content.

## Uniqueness Rules

### Globally Unique

These must be unique across all of Genio:

```txt
Site.publicId
Site.publicSlug, when present
CustomDomain.domain
```

### Unique Per User

These may be unique only within one user's workspace:

```txt
Site.slug
```

### Unique Per Site

These must be unique inside one `Site`:

```txt
PageMetadata.slug
Product.slug
Collection.slug
```

### Not Unique

These should not be unique:

```txt
Site.displayName
Page title
Product title
Collection title
```

This allows many users to have sites with the same display name.

## First Implementation Scope

The first implementation should focus only on the site/page foundation:

```txt
Site
PageMetadata
PageFavorite
PuckContent linking
legacy /{publicId}
/s/{siteIdentifier}
draftContent / publishedContent separation
```

Do not implement these in the first migration unless explicitly requested:

```txt
Product
Collection
CustomDomain
Inventory
Checkout
Order requests
Billing
AI credits
```

Those features are future phases that depend on stable site/page ownership.

## Migration Plan From the Current Mongo Page Model

### Phase 1: Document and Stabilize Current Behavior

Keep the current Mongo `Page` model working.

Current behavior:

```txt
Mongo Page.path identifies a public page.
Mongo Page.userId mirrors Prisma User.id.
Mongo stores title, content, isFavorite, isDeleted, and deletedAt.
```

Goal:

- No breaking changes.
- Avoid adding new features that deepen dependence on global path ownership.

### Phase 2: Add Prisma Site and PageMetadata

For each existing Mongo page like:

```txt
path: "/ZyxMaenr6Q"
```

Create:

```txt
Site.publicId = "ZyxMaenr6Q"
Site.ownerId = current Mongo userId
PageMetadata.siteId = Site.id
PageMetadata.slug = "home"
PageMetadata.isHomePage = true
```

Keep Mongo content where it is during this phase.

### Phase 3: Link Mongo Content to Prisma IDs

Add references to Mongo documents:

```txt
siteId
pageId
ownerId
```

New reads should prefer `pageId`, with legacy path fallback.

### Phase 4: Move Favorites and Deleted Status to Prisma

Move source of truth for:

```txt
isFavorite
isDeleted
deletedAt
```

Migration:

- Create `PageFavorite` rows from Mongo pages where `isFavorite = true`.
- Copy deleted state into `PageMetadata`.
- Stop writing favorite/deleted state to Mongo after the migration path is stable.

### Phase 5: Move Published Status to Prisma

Move source of truth for:

```txt
page status
site status
publishedAt
```

Public rendering should require published Prisma status before reading Mongo `publishedContent`.

### Phase 6: Separate Draft and Published Puck Content

Change Mongo content from one `content` field into:

```txt
draftContent
publishedContent
```

Migration:

- Existing content can become both draft and published content for currently published pages.
- Future edits update draft only.
- Publishing copies draft into published.

### Phase 7: Retire Global Path as Source of Truth

Once Prisma site/page resolution is stable:

- Stop using Mongo `path` as the ownership key.
- Use `Site.publicId`, `Site.publicSlug`, or custom domain to resolve the site.
- Use `PageMetadata.slug`, `Product.slug`, or `Collection.slug` inside the site.
- Keep legacy read fallback until all existing links are migrated.

## Risks and Tradeoffs

### Two Databases Add Coordination Cost

Risk:

Prisma and MongoDB can drift.

Mitigation:

- Prisma owns metadata and status.
- Mongo owns content only.
- Publishing should update both in one controlled server mutation.
- If Mongo publish fails, do not mark the Prisma page as published.

### Migration Cannot Be Big-Bang

Risk:

Changing all page identity at once can break existing editor and public pages.

Mitigation:

- Add Prisma metadata first.
- Keep path fallback during migration.
- Move one responsibility at a time.

### Denormalized `ownerId` Can Drift

Risk:

`ownerId` on `PageMetadata`, `Product`, and `Collection` duplicates ownership available through `Site.ownerId`.

Benefit:

It makes dashboard and security queries simpler.

Mitigation:

- Treat `Site.ownerId` as canonical.
- Use denormalized `ownerId` as a convenience field until team ownership exists.

### Draft and Published Content Increase Storage

Risk:

Keeping both draft and published Puck content duplicates data.

Benefit:

Users can edit without changing the live site until publishing.

Mitigation:

- Accept this for now.
- Add version history only when needed.

## Practical Rule for New Features

Before adding a feature, decide where its data belongs:

```txt
Prisma/PostgreSQL:
accounts, ownership, permissions, plans, favorites, status, domains, products,
collections, inventory, customer requests, analytics metadata

MongoDB:
Puck layout, section props, editable page structure, draft content,
published visual content, Puck-backed templates
```

Never store private ownership rules only inside Puck content.
