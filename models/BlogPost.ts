import { mongoConnect } from "@/lib/mongo";
import mongoose, { Schema, models, model } from "mongoose";

export interface IBlogPost {
  userId: number;
  tag: string;
  path : string;
  title: string;
  summary: string;
  content: any;        // JSON o Markdown
  coverUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const BlogPostSchema = new Schema<IBlogPost>({
  userId:   { type: Number, required: true, index: true },
  tag:      { type: String, required: true },
  path:     { type: String, required: true },
  title:    { type: String, required: true },
  summary:  { type: String, required: true },
  content:  { type: Schema.Types.Mixed, required: true },
  coverUrl: { type: String },
}, { timestamps: true });

export async function BlogPostModel() {
  await mongoConnect();
  return models.BlogPost || model<IBlogPost>("BlogPost", BlogPostSchema);
}
