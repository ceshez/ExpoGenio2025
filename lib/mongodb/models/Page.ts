// lib/mongo/models/Page.ts
import { mongoConnect } from "@/lib/mongo";
import mongoose, { Schema, models, model } from "mongoose";

export interface IPage {
  userId: number;        // Prisma User.id
  title: string;
  path: string;          // único global
  content: any;          // JSON (Puck)
  isFavorite?: boolean;  // favorito por usuario (siempre es true/false por doc)
  isDeleted?: boolean;   // papelera
  deletedAt?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

const PageSchema = new Schema<IPage>({
  userId:    { type: Number, required: true, index: true },
  title:     { type: String, required: true },
  path:      { type: String, required: true, unique: true }, // si quieres único global
  content:   { type: Schema.Types.Mixed, required: true },
  isFavorite:{ type: Boolean, default: false, index: true },
  isDeleted: { type: Boolean, default: false, index: true },
  deletedAt: { type: Date, default: null, index: true },
}, { timestamps: true });

// Auto-borrado 7 días DESPUÉS de entrar a papelera:
// TTL parcial (solo documentos con deletedAt != null)
PageSchema.index(
  { deletedAt: 1 },
  { expireAfterSeconds: 60 * 60 * 24 * 7, partialFilterExpression: { deletedAt: { $type: "date" } } }
);

export async function PageModel() {
  await mongoConnect();
  return models.Page || model<IPage>("Page", PageSchema);
}
