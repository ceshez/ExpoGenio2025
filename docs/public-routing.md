# Genio Public Routing Architecture

## Purpose

This document defines Genio's future public routing model.

It focuses only on how public URLs resolve to a `Site` and then to a site-local resource such as a page, product, or collection.

For data ownership, database responsibilities, and model-level source-of-truth rules, see:

```txt
docs/data-ownership.md
```

## 1. Conceptual Explanation

Public routing should happen in two steps:

1. Resolve the `Site`.
2. Resolve the resource inside that `Site`.

A `Site` is the internal business/website container. It represents one public website or store owned by a Genio user.

Custom domains identify the site by host:

```txt
tiendamaria.com -> Site
```

Genio-hosted URLs identify the site through `/s/{siteIdentifier}`:

```txt
genio.cr/s/ZyxMaenr6Q -> Site
genio.cr/s/cafe-pura-vida -> Site
```

The current legacy public URL format must keep working:

```txt
genio-flame.vercel.app/ZyxMaenr6Q
```

That legacy route should resolve `ZyxMaenr6Q` as a site public ID and render the site's home page.

## 2. Public Site Identity

Genio should separate internal identity from public URL identity.

Recommended fields:

```txt
Site.id           -> internal database ID, never used as the public URL
Site.displayName  -> friendly dashboard name, not unique
Site.slug         -> internal dashboard slug, unique per owner
Site.publicId     -> random public fallback ID, globally unique
Site.publicSlug   -> friendly public Genio URL slug, globally unique and optional
```

Examples:

```txt
User A:
displayName = "Tienda Maria"
slug = "tienda-maria"
publicSlug = "tienda-maria"
publicId = "ZyxMaenr6Q"

User B:
displayName = "Tienda Maria"
slug = "tienda-maria"
publicSlug = "tienda-maria-2"
publicId = "Abc92LmPx"
```

`publicId` is the safest compatibility identifier. `publicSlug` is the friendly sharing identifier. `slug` is only for internal organization unless a task explicitly changes that rule.

## 3. Recommended URL Formats

### Legacy Compatibility

Keep this working:

```txt
https://genio-flame.vercel.app/ZyxMaenr6Q
```

This resolves to the site home page by treating `ZyxMaenr6Q` as `Site.publicId`.

### Genio-Hosted URLs

Recommended future formats:

```txt
https://genio.cr/s/ZyxMaenr6Q
https://genio.cr/s/cafe-pura-vida
https://genio.cr/s/cafe-pura-vida/pages/sobre-nosotros
https://genio.cr/s/cafe-pura-vida/products/camisa-roja
https://genio.cr/s/cafe-pura-vida/collections/nuevos-productos
https://genio.cr/s/cafe-pura-vida/contacto
```

The `/s` namespace means "public site hosted by Genio".

The `{siteIdentifier}` can resolve by either:

```txt
Site.publicId
Site.publicSlug
```

Use `publicSlug` for friendly new links when available. Keep `publicId` as the stable fallback.

### Custom-Domain URLs

Recommended future formats:

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

## 4. Genio-Hosted URLs vs Custom-Domain URLs

Genio-hosted URLs need a site identifier in the path because many user sites share the same Genio host:

```txt
genio.cr/s/{siteIdentifier}
```

Custom-domain URLs do not need a site identifier in the path because the host is unique:

```txt
tiendamaria.com
```

Both forms should resolve to the same internal `Site.id`.

Example:

```txt
https://genio.cr/s/ZyxMaenr6Q
https://tiendamaria.com
```

Both can point to the same site.

## 5. URL Resolution Algorithm

Public routing should classify the host first, then resolve the site, then resolve the site-local resource.

### Step 1: Classify Host

If the host is a Genio app host:

```txt
genio.cr
genio-flame.vercel.app
localhost during development
```

Use Genio-hosted path rules.

If the host is not a Genio app host, treat it as a possible custom domain.

### Step 2A: Resolve Site for Genio-Hosted URLs

Preferred future URLs:

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
3. Resolve Site by publicSlug first, then publicId.
4. Confirm Site is active/published and not deleted.
5. Resolve the remaining path as a site-local route.
```

Legacy URLs:

```txt
/{publicId}
```

Resolution:

```txt
1. If the path is not a reserved Genio app route, treat the first segment as a possible legacy Site.publicId.
2. Resolve Site by publicId only.
3. Confirm Site is active/published and not deleted.
4. Resolve to the home page.
```

The current `/{publicId}` behavior should remain supported as compatibility.

### Step 2B: Resolve Site for Custom Domains

Custom-domain URLs:

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
2. Find CustomDomain by domain.
3. Confirm CustomDomain.status is active.
4. Resolve the linked Site.
5. Confirm Site is active/published and not deleted.
6. Treat the full path as a site-local route.
```

Do not require the site slug after a custom domain.

### Step 3: Resolve Site-Local Route

Once the `Site` is known, resolve the remaining path:

```txt
/                         -> home page
/pages/{slug}             -> PageMetadata
/products/{slug}          -> Product, future phase
/collections/{slug}       -> Collection, future phase
/{slug}                   -> PageMetadata shortcut
```

Before rendering:

```txt
Site must be published/active.
Resource must be published/active.
Deleted resources must not render.
Puck pages load Mongo publishedContent by pageId.
Products and collections load structured Prisma data when those features exist.
```

## 6. Home Page Resolution Rules

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

## 7. Page/Product/Collection Namespace Rules

Recommended reserved site-local namespaces:

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
/{pageSlug}
```

Future store priority:

```txt
/products/{productSlug}
/collections/{collectionSlug}
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

### Products - Future Phase

Product route:

```txt
/products/camisa-roja
```

Rules:

- `Product.slug` is unique per site.
- Product identity, price, status, and inventory belong in Prisma.
- Puck can later provide product page templates, but product data should stay relational.
- Do not implement product routing until product data exists in Prisma.

### Collections - Future Phase

Collection route:

```txt
/collections/nuevos-productos
```

Rules:

- `Collection.slug` is unique per site.
- Collection identity and product grouping belong in Prisma.
- Puck can later provide collection page templates, but collection data should stay relational.
- Do not implement collection routing until collection data exists in Prisma.

## 8. Reserved Routes and Slugs

Reserved Genio app routes should not be used as legacy `/{publicId}` routes or public site slugs:

```txt
dashboard
login
register
api
puck
admin
s
pricing
blog
templates
settings
account
help
```

Reserved site-local namespaces should not be used as page slugs unless Genio intentionally supports overrides later:

```txt
pages
products
collections
cart
checkout
search
account
blog
api
admin
```

Public IDs should be generated so they cannot match reserved app routes.

## 9. Custom Domain Resolution Rules

Custom domains should resolve to the same internal `Site` as Genio-hosted URLs.

Example:

```txt
https://genio.cr/s/ZyxMaenr6Q
https://tiendamaria.com
```

Both can resolve to the same `Site.id`.

Recommended domain statuses:

```txt
pending   -> user added the domain, but DNS has not been verified
verified  -> user proved ownership through DNS, usually TXT
active    -> domain points to Genio and can render the site
failed    -> verification or routing failed
disabled  -> domain is intentionally disabled
```

Rules:

- A custom domain identifies the site by host.
- A custom-domain URL should never require `/s/{siteIdentifier}`.
- A custom-domain URL should never require the site slug after the domain.
- Only active custom domains should render public sites.
- `verified` is not enough to render if the domain does not point to Genio yet.
- Genio may later redirect Genio-hosted URLs to the primary custom domain.

## 10. Canonical URL Behavior

A site may have multiple public URLs:

```txt
https://genio.cr/s/ZyxMaenr6Q
https://genio.cr/s/cafe-pura-vida
https://tiendamaria.com
```

Near-term recommendation:

- Do not automatically redirect Genio-hosted URLs when a custom domain is added.
- Add canonical metadata later so search engines know the preferred URL.

Future recommendation:

- Let users choose a primary domain.
- If a primary custom domain is active, optionally redirect Genio-hosted URLs to it.

## 11. Migration Plan From Current `/{publicId}` Model

### Phase 1: Keep Current Public Route Working

Keep:

```txt
/{publicId}
```

Treat the current random segment as a legacy site public ID.

Do not break existing published links.

### Phase 2: Add Site-Based Public Resolution

Resolve current public IDs as `Site.publicId`.

For a current path like:

```txt
/ZyxMaenr6Q
```

the target should become:

```txt
Site.publicId = "ZyxMaenr6Q"
home PageMetadata for that Site
```

### Phase 3: Add `/s/{siteIdentifier}`

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

### Phase 4: Add Page Namespaces

Add:

```txt
/pages/{slug}
/{pageSlug}
```

Start with pages before adding store routes.

### Phase 5: Add Product and Collection Namespaces - Future Store Phase

Add:

```txt
/products/{slug}
/collections/{slug}
```

Only add these after product and collection data exists in Prisma.

### Phase 6: Add Custom Domains - Future Domain Phase

Add host-based site resolution:

```txt
customdomain.com          -> site home
customdomain.com/contacto -> page slug contacto
customdomain.com/products/camisa-roja -> product slug camisa-roja
```

Only add this after `Site`, `PageMetadata`, `/s/{siteIdentifier}`, and Mongo `pageId/siteId` linking are stable.

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
- Make `Site.publicSlug` globally unique if used in `/s/{publicSlug}`.
- Keep `Site.slug` as an internal dashboard slug unique per owner.
- Suggest suffixes like `cafe-pura-vida-2`.

## 13. Recommended Implementation Phases for Later Use With 5.3-Codex

1. Keep `docs/data-ownership.md` as the source of truth for database responsibilities.
2. Keep `docs/public-routing.md` focused on public URL behavior.
3. Add Prisma `Site` and `PageMetadata` only.
4. Backfill current `/{publicId}` pages into `Site + home PageMetadata`.
5. Build a single public route resolver that accepts `host` and `pathname`.
6. Support both `/{publicId}` and `/s/{siteIdentifier}`.
7. Link Mongo Puck content to `siteId/pageId`.
8. Separate `draftContent` and `publishedContent`.
9. Add `/pages/{slug}` and `/{pageSlug}`.
10. Add products and collections only when store data exists.
11. Add custom domain verification and host-based site resolution later.
12. Clean up legacy path-based Mongo reads only after all existing links are migrated.
