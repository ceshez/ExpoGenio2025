// lib/mongo/models/Page.ts
import { mongoConnect } from "@/lib/mongo";
import mongoose, { Schema, models, model } from "mongoose";

export interface IPage {
  userId: number;        // Prisma User.id
  title: string;
  path: string;          // único global
  content: any;          // JSON 
  isFavorite?: boolean;
  isDeleted?: boolean;
  deletedAt?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

const PageSchema = new Schema<IPage>(
  {
    userId:    { type: Number, required: true, index: true },
    title:     { type: String, required: true },
    path:      { type: String, required: true, unique: true },
    content:   { type: Schema.Types.Mixed, required: true }, // guarda TODO el árbol de Puck
    isFavorite:{ type: Boolean, default: false, index: true },
    isDeleted: { type: Boolean, default: false, index: true },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
    strict: true,
    minimize: false, // ⬅ No elimines objetos vacíos (p.ej. zones: {})
  }
);

// TTL para papelera (7 días desde deletedAt)
PageSchema.index(
  { deletedAt: 1 },
  { expireAfterSeconds: 60 * 60 * 24 * 7, partialFilterExpression: { deletedAt: { $type: "date" } } }
);

export async function PageModel() {
  await mongoConnect();
  return models.Page || model<IPage>("Page", PageSchema);
}
