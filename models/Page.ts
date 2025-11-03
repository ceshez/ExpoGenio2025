import { mongoConnect } from "@/lib/mongo";
import mongoose, { Schema, models, model } from "mongoose";

export interface IPage {
  userId: number;    // Prisma User.id
  title: string;
  path: string;      // único por pagina
  content: any;      // JSON (Puck)
  createdAt?: Date;
  updatedAt?: Date;
}

const PageSchema = new Schema<IPage>({
  userId: { type: Number, required: true, index: true },
  title:  { type: String, required: true },
  path:   { type: String, required: true },
  content:{ type: Schema.Types.Mixed, required: true },
}, { timestamps: true });

PageSchema.index({ userId: 1, path: 1 }, { unique: true });

export async function PageModel() {
  await mongoConnect();
  return models.Page || model<IPage>("Page", PageSchema);
}
