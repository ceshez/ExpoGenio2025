import { mongoConnect } from "@/lib/mongo";
import mongoose, { Schema, models, model } from "mongoose";

export interface ITutorial {
  userId: number;
  title: string;
  path : string;
  summary: string;
  videoUrl: string;
  thumbnailUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const TutorialSchema = new Schema<ITutorial>({
  userId:       { type: Number, required: true, index: true },
  title:        { type: String, required: true },
  path:         { type: String, required: true },
  summary:      { type: String, required: true },
  videoUrl:     { type: String, required: true },
  thumbnailUrl: { type: String, required: true },
}, { timestamps: true });

export async function TutorialModel() {
  await mongoConnect();
  return models.Tutorial || model<ITutorial>("Tutorial", TutorialSchema);
}
