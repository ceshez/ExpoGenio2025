# Genio Public Routing Architecture

## Purpose

This document defines the future public routing model for Genio.

Genio currently publishes public pages with URLs like:

```txt
https://genio-flame.vercel.app/ZyxMaenr6Q
```

The random segment currently lets other people view a published page freely.

The future model should evolve toward a Shopify-like public routing system:

- The `Site` is the internal business/website container.
- Custom domains identify the `Site` by host.
- Genio-hosted URLs identify the `Site` with `/s/{siteIdentifier}`.
- The current `/{publicId}` route keeps working as legacy compatibility.
- Prisma/PostgreSQL owns identity, ownership, status, domains, products, collections, and page metadata.
- MongoDB owns only flexible Puck content.

## 1. Conceptual Explanation

Public routing should happen in two steps:

1. Resolve the `Site`.
2. Resolve the resource inside that `Site`.

A `Site` represents one public website or store owned by a Genio user. It is the container for:

- Pages.
- Products.
- Collections.
- Custom domains.
- Publishing state.
- Store settings.
- Future SaaS limits.

For custom domains, the host identifies the site:

```txt
tiendamaria.com -> Site
```

For Genio-hosted URLs, the `/s/{siteIdentifier}` prefix identifies the site:

```txt
genio.cr/s/ZyxMaenr6Q -> Site
genio.cr/s/cafe-pura-vida -> Site
```

MongoDB should never decide public routing or ownership. PostgreSQL/Prisma resolves the site, resource, status, products, collections, and page metadata. MongoDB only stores flexible Puck content for pages or content-backed templates.

## 2. Recommended URL Formats

### Legacy Compatibility URL

Keep this working:

```txt
https://genio-flame.vercel.app/ZyxMaenr6Q
```

This should resolve to the `Site` home page by treating `ZyxMaenr6Q` as a legacy public identifier.

### Future Genio-Hosted URLs

Recommended formats:

```txt
https://genio.cr/s/ZyxMaenr6Q
https://genio.cr/s/cafe-pura-vida
https://genio.cr/s/cafe-pura-vida/pages/sobre-nosotros
https://genio.cr/s/cafe-pura-vida/products/camisa-roja
https://genio.cr/s/cafe-pura-vida/collections/nuevos-productos
https://genio.cr/s/cafe-pura-vida/contacto
```

The `/s` namespace means "public site hosted by Genio".

### Future Custom-Domain URLs

Recommended formats:

```txt
https://tiendamaria.com/
https://tiendamaria.com/pages/sobre-nosotros
https://tiendamaria.com/products/camisa-roja
https://tiendamaria.com/collections/nuevos-productos
https://tiendamaria.com/contacto
```

Do not include the site slug after a custom domain.

Avoid this:

```txt
https://tiendamaria.com/tienda-maria/productos
```

The custom domain already identifies the `Site`.

## 3. Genio-Hosted URLs vs Custom-Domain URLs

Genio-hosted URLs need a site identifier in the path because many user sites share the same Genio host:

```txt
genio.cr/s/{siteIdentifier}
```

Custom-domain URLs do not need a site identifier in the path because the host is already unique:

```txt
tiendamaria.com
```

Both forms should resolve to the same internal `Site.id`.

Examples:

```txt
https://genio.cr/s/ZyxMaenr6Q
https://tiendamaria.com
```

Both can point to the same `Site`.

The public URL changes, but the internal lookup target stays the same.

## 4. Recommended Prisma Models

Prisma/PostgreSQL should be the source of truth for ownership, permissions, status, URL identity, custom domains, products, collections, and page metadata.

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
publicId
slug
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

- `displayName`: Friendly name shown in the dashboard. Not unique.
- `publicId`: Random stable identifier. Globally unique.
- `slug`: Human-readable Genio-hosted identifier. Should be globally unique if used in `/s/{slug}` URLs.
- `status`: Site lifecycle state.
- `primaryDomainId`: Optional preferred custom domain for canonical URLs later.

Recommended statuses:

```txt
draft
published
unpublished
archived
deleted
```

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
isPrimary
createdAt
updatedAt
```

Responsibilities:

- Prove domain ownership.
- Resolve custom-domain requests to a `Site`.
- Support primary-domain behavior later.

Recommended statuses:

```txt
pending
verified
failed
disabled
```

Rules:

- `domain` must be globally unique.
- Only verified active domains should render public sites.
- A domain points to exactly one `Site`.

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

### Product

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
- Own future inventory/order relationships.

Rules:

- `siteId + slug` should be unique.
- Products should not be stored as Puck-only content.

### Collection

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

## 5. Recommended MongoDB PuckContent Shape

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

## 6. URL Resolution Algorithm

Public routing should first classify the host, then resolve a `Site`, then resolve a resource inside the site.

### Step 1: Classify Host

If the host is a Genio app host:

```txt
genio.cr
genio-flame.vercel.app
localhost during development
```

Use Genio-hosted path rules.

If the host is not a Genio app host, treat it as a possible custom domain.

### Step 2A: Resolve Site For Genio-Hosted URLs

For preferred future URLs:

```txt
/s/{siteIdentifier}
/s/{siteIdentifier}/pages/{pageSlug}
/s/{siteIdentifier}/products/{productSlug}
/s/{siteIdentifier}/collections/{collectionSlug}
/s/{siteIdentifier}/{pageSlug}
```

Resolution:

```txt
1. Detect /s namespace.
2. Read {siteIdentifier}.
3. Resolve Site by publicId or slug.
4. Confirm Site is active/published and not deleted.
5. Resolve the remaining path as a site-local route.
```

For legacy URLs:

```txt
/{publicId}
```

Resolution:

```txt
1. If the path does not match a reserved Genio app route, treat the first segment as possible legacy Site.publicId.
2. Resolve Site by publicId.
3. Confirm Site is active/published and not deleted.
4. Resolve to the home page.
```

The current `/{publicId}` behavior should keep working as compatibility.

### Step 2B: Resolve Site For Custom Domains

For custom-domain URLs:

```txt
https://tiendamaria.com/
https://tiendamaria.com/pages/sobre-nosotros
https://tiendamaria.com/products/camisa-roja
https://tiendamaria.com/collections/nuevos-productos
https://tiendamaria.com/contacto
```

Resolution:

```txt
1. Normalize the request host.
2. Find active verified CustomDomain by domain.
3. Resolve the linked Site.
4. Confirm Site is active/published and not deleted.
5. Treat the full path as a site-local route.
```

Do not require or allow the site slug as a required prefix after a custom domain.

### Step 3: Resolve Site-Local Route

Once the `Site` is known, resolve the remaining path:

```txt
/                         -> home page
/pages/{slug}             -> PageMetadata
/products/{slug}          -> Product
/collections/{slug}       -> Collection
/{slug}                   -> PageMetadata shortcut
```

Before rendering:

```txt
Site must be published/active.
Resource must be published/active.
Deleted resources must not render.
Puck pages load Mongo publishedContent by pageId.
Products and collections load structured Prisma data.
```

## 7. Home Page Resolution Rules

For Genio-hosted URLs:

```txt
https://genio.cr/s/{siteIdentifier}
```

resolves to the site home page.

For custom domains:

```txt
https://tiendamaria.com/
```

resolves to the site home page.

For current legacy URLs:

```txt
https://genio-flame.vercel.app/ZyxMaenr6Q
```

resolves to the site home page.

Home page source of truth should be Prisma:

```txt
PageMetadata.isHomePage = true
```

Rules:

- One home page per `Site`.
- Home page must belong to the `Site`.
- Home page must be published to render publicly.
- If no published home page exists, return 404 or a simple unpublished state.
- Do not resolve the home page by Mongo path.

## 8. Page/Product/Collection Route Namespace Rules

Recommended route namespaces:

```txt
/pages
/products
/collections
/blog
/cart
/checkout
/search
/account
```

Near-term priority:

```txt
/pages/{pageSlug}
/products/{productSlug}
/collections/{collectionSlug}
/{pageSlug}
```

### Pages

Full page route:

```txt
/pages/sobre-nosotros
```

Shortcut page route:

```txt
/sobre-nosotros
/contacto
/menu
```

Rules:

- `PageMetadata.slug` is unique per site.
- Reserved namespace names should not be allowed as page slugs unless Genio explicitly supports overrides later.
- Puck content is loaded through `PageMetadata.id`.

### Products

Product route:

```txt
/products/camisa-roja
```

Rules:

- `Product.slug` is unique per site.
- Product identity, price, status, and inventory belong in Prisma.
- Puck can later provide product page templates, but product data should stay relational.

### Collections

Collection route:

```txt
/collections/nuevos-productos
```

Rules:

- `Collection.slug` is unique per site.
- Collection identity and product grouping belong in Prisma.
- Puck can later provide collection page templates, but collection data should stay relational.

## 9. Uniqueness Rules

### Globally Unique

These must be unique across all of Genio:

```txt
Site.publicId
CustomDomain.domain
Site.slug, if used as a public /s/{slug} identifier
```

### Unique Per User

These may be unique only within one user's workspace:

```txt
Internal site dashboard slug, if separate from public slug
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

Example:

```txt
User A site displayName: Tienda Maria
User B site displayName: Tienda Maria
```

No collision occurs because public identity comes from one of:

```txt
Site.publicId
Site.slug
CustomDomain.domain
```

## 10. Custom Domain Ownership and Verification Flow

Recommended custom-domain flow:

```txt
1. Authenticated user adds a domain in the dashboard.
2. Genio creates CustomDomain with status pending.
3. Genio provides DNS instructions.
4. User updates DNS.
5. Genio checks DNS ownership.
6. If valid, mark domain verified.
7. User can choose it as primary domain.
8. Public requests to that host resolve to CustomDomain.siteId.
```

Possible DNS verification methods:

```txt
TXT record with verification token
CNAME record pointing to Genio
A record or platform-specific domain setup
```

Rules:

- A domain can belong to only one `Site`.
- Only verified domains can render public sites.
- Removing a domain should not delete the `Site`.
- A custom domain and a Genio-hosted URL should resolve to the same `Site`.
- Genio should normalize domains before saving or resolving them.

Later enhancements:

- Primary-domain redirects.
- Canonical SEO tags.
- SSL status tracking.
- Domain health checks.

## 11. Migration Plan From Current `/{publicId}` Model

### Phase 1: Keep Current Public Route Working

Keep:

```txt
/{publicId}
```

Treat the current random segment as a legacy site public ID.

Do not break existing published links.

### Phase 2: Add Prisma Site and PageMetadata

For each current Mongo page like:

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

Keep the existing Mongo content in place during this phase.

### Phase 3: Link Mongo Content to Prisma IDs

Add Prisma references to Mongo content documents:

```txt
siteId
pageId
ownerId
```

New reads should prefer Prisma resolution, with legacy path fallback.

### Phase 4: Add `/s/{siteIdentifier}`

Support:

```txt
/s/ZyxMaenr6Q
/s/cafe-pura-vida
```

Keep:

```txt
/{publicId}
```

as legacy compatibility.

### Phase 5: Move Status and Dashboard State to Prisma

Move the source of truth for these fields into Prisma:

```txt
ownership
favorites
deleted status
published status
title
slug
site status
```

MongoDB can keep temporary mirrored fields during migration, but Prisma should decide access and dashboard state.

### Phase 6: Add Route Namespaces

Add support for:

```txt
/pages/{slug}
/products/{slug}
/collections/{slug}
/{pageSlug}
```

Start with pages first. Add products and collections when structured store data exists.

### Phase 7: Add Custom Domains

Add `CustomDomain` and host-based site resolution.

Custom domains should resolve like:

```txt
customdomain.com          -> site home
customdomain.com/contacto -> page slug contacto
customdomain.com/products/camisa-roja -> product slug camisa-roja
```

## 12. Risks and Tradeoffs

### Legacy Root Routes Can Conflict With App Routes

Risk:

```txt
/dashboard
/login
/pricing
/blog
```

could be confused with public IDs.

Mitigation:

- Keep `/{publicId}` only for compatibility.
- Use `/s/{siteIdentifier}` for new Genio-hosted links.
- Reserve app route names.
- Generate public IDs that cannot match reserved words.

### Custom Domains Create Duplicate Public URLs

Example:

```txt
https://genio.cr/s/ZyxMaenr6Q
https://tiendamaria.com
```

Both can show the same site.

Mitigation:

- Add canonical URLs.
- Let users choose a primary domain.
- Later, optionally redirect Genio-hosted URLs to the primary custom domain.

### Friendly Genio Slugs Can Collide

Risk:

Many users may want:

```txt
/s/cafe-pura-vida
```

Mitigation:

- Keep `publicId` as the guaranteed fallback.
- Make public `Site.slug` globally unique if used in `/s/{slug}`.
- Suggest suffixes like `cafe-pura-vida-2`.

### Two Databases Can Drift

Risk:

Prisma status and Mongo Puck content may become inconsistent.

Mitigation:

- Prisma decides status, ownership, routing, and permissions.
- Mongo stores only Puck draft/published content.
- Publishing should update Mongo content and Prisma status in one controlled server flow.
- If Mongo publish fails, do not mark the Prisma page as published.

### Products and Collections Should Not Start as Puck-Only Content

Risk:

If products are stored only inside Puck content, future inventory, requests, analytics, and checkout become difficult.

Mitigation:

- Store product and collection identity in Prisma first.
- Use Puck for layout/templates later.

## 13. Recommended Implementation Phases for Later Use With 5.3-Codex

### Phase 1: Documentation

Create or update planning docs:

```txt
docs/data-ownership.md
docs/public-routing.md
```

Use these docs before changing schemas or routes.

### Phase 2: Prisma Site and PageMetadata

Add foundational models:

```txt
Site
PageMetadata
```

Do not add products, collections, or custom domains until page routing is stable.

### Phase 3: Backfill Existing Published Pages

Migrate current Mongo path-based pages into:

```txt
one Site
one home PageMetadata
one linked PuckContent document
```

Keep existing `/{publicId}` links working.

### Phase 4: Public Route Resolver

Build a single route resolver service that accepts:

```txt
host
pathname
```

and returns:

```txt
Site
resolved resource type
resolved resource id
```

This keeps route logic centralized.

### Phase 5: Compatibility Routing

Support both:

```txt
/{publicId}
/s/{siteIdentifier}
```

New shared links should use `/s/{siteIdentifier}`.

Old links should continue rendering.

### Phase 6: Mongo Content Linking

Update Puck content documents to use:

```txt
siteId
pageId
ownerId
```

Keep legacy path fallback until all existing pages are migrated.

### Phase 7: Draft and Published Content Separation

Separate:

```txt
draftContent
publishedContent
```

Editor loads draft content.

Public site loads published content.

Publishing copies draft content to published content.

### Phase 8: Page Route Namespaces

Add:

```txt
/pages/{slug}
/{pageSlug}
```

Keep products and collections for a later store-focused phase.

### Phase 9: Products and Collections

Add structured models:

```txt
Product
Collection
```

Then support:

```txt
/products/{slug}
/collections/{slug}
```

### Phase 10: Custom Domains

Add:

```txt
CustomDomain
```

Then implement:

- Domain verification.
- Host-based site resolution.
- Primary domain selection.
- Optional canonical URL behavior.

### Phase 11: Cleanup

Stop writing new path-based Mongo records.

Keep read fallback until all existing links are safely migrated.

The clean target is:

```txt
Host or /s/{siteIdentifier} resolves Site.
The remaining path resolves a site-local page, product, or collection.
Prisma owns identity and status.
MongoDB renders only flexible Puck content.
```
