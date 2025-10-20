// lib/slug.ts
export function toSlug(title: string) {
  return (
    "/" +
    (title || "mi-sitio")
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9\-]/g, "")
  );
}
