// app/puck/page.tsx
import type { Metadata } from "next";

export { default } from "./[...puckPath]/page";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Genio – Editor",
  description: "Editor visual de páginas con Puck",
};

