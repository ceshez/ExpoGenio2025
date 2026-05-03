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

## 2. Recommended URL Formats

### Legacy Compatibility

Keep this working:

```txt
https://genio-flame.vercel.app/ZyxMaenr6Q
```

This resolves to the site home page.

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

## 3. Genio-Hosted URLs vs Custom-Domain URLs

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

## 4. URL Resolution Algorithm

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
3. Resolve Site by publicId or public slug.
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
2. Resolve Site by publicId.
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
2. Find active verified CustomDomain by domain.
3. Resolve the linked Site.
4. Confirm Site is active/published and not deleted.
5. Treat the full path as a site-local route.
```

Do not require the site slug after a custom domain.

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

## 5. Home Page Resolution Rules

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

## 6. Page/Product/Collection Namespace Rules

Recommended reserved namespaces:

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

## 7. Custom Domain Resolution Rules

Custom domains should resolve to the same internal `Site` as Genio-hosted URLs.

Example:

```txt
https://genio.cr/s/ZyxMaenr6Q
https://tiendamaria.com
```

Both can resolve to the same `Site.id`.

Rules:

- A custom domain identifies the site by host.
- A custom-domain URL should never require `/s/{siteIdentifier}`.
- A custom-domain URL should never require the site slug after the domain.
- Only verified active custom domains should render public sites.
- Genio may later redirect Genio-hosted URLs to the primary custom domain.

## 8. Migration Plan From Current `/{publicId}` Model

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

### Phase 5: Add Product and Collection Namespaces

Add:

```txt
/products/{slug}
/collections/{slug}
```

Only add these after product and collection data exists in Prisma.

### Phase 6: Add Custom Domains

Add host-based site resolution:

```txt
customdomain.com          -> site home
customdomain.com/contacto -> page slug contacto
customdomain.com/products/camisa-roja -> product slug camisa-roja
```

## 9. Risks and Tradeoffs

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

## 10. Recommended Implementation Phases for Later Use With 5.3-Codex

1. Add or keep `docs/data-ownership.md` as the source of truth for database responsibilities.
2. Keep `docs/public-routing.md` focused on public URL behavior.
3. Add Prisma `Site` and `PageMetadata`.
4. Backfill current `/{publicId}` pages into `Site + home PageMetadata`.
5. Build a single public route resolver that accepts `host` and `pathname`.
6. Support both `/{publicId}` and `/s/{siteIdentifier}`.
7. Link Mongo Puck content to `siteId/pageId`.
8. Separate `draftContent` and `publishedContent`.
9. Add `/pages/{slug}` and `/{pageSlug}`.
10. Add products and collections when store data exists.
11. Add custom domain verification and host-based site resolution.
12. Clean up legacy path-based Mongo reads only after all existing links are migrated.
