import { mongoConnect } from "@/lib/mongo";
import mongoose, { Schema, models, model } from "mongoose";

export interface INews {
  userId: number;
  tag : string;
  title: string;
  summary: string;
  content: any;
  createdAt?: Date;
  updatedAt?: Date;
}

const NewsSchema = new Schema<INews>({
  userId:   { type: Number, required: true, index: true },
  tag:      { type: String, required: true },
  title:    { type: String, required: true },
  summary:  { type: String, required: true },
  content:  { type: Schema.Types.Mixed, required: true },
}, { timestamps: true });

export async function NewsModel() {
  await mongoConnect();
  return models.News || model<INews>("News", NewsSchema);
}
