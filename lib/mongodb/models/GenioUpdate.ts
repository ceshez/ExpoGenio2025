import { mongoConnect } from "@/lib/mongo";
import mongoose, { Schema, models, model } from "mongoose";

export interface IGenioUpdate {
  userId: number;
  title: string;
  path : string;
  tag : string;
  summary: string;
  content: any;
  createdAt?: Date;
  updatedAt?: Date;
}

const GenioUpdateSchema = new Schema<IGenioUpdate>({
  userId:   { type: Number, required: true, index: true },
  title:    { type: String, required: true },
  path:     { type: String, required: true },
  tag:      { type: String, required: true },
  summary:  { type: String, required: true },
  content:  { type: Schema.Types.Mixed, required: true },
}, { timestamps: true });

export async function ProductUpdateModel() {
  await mongoConnect();
  return models.ProductUpdate || model<IGenioUpdate>("ProductUpdate", GenioUpdateSchema);
}
