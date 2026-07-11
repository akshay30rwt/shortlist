import { Schema, model, models, type Document } from "mongoose";

export interface CandidateDocument extends Document {
  name: string;
  email: string;
  resumeUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const candidateSchema = new Schema<CandidateDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    resumeUrl: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

export const Candidate =
  models.Candidate ?? model<CandidateDocument>("Candidate", candidateSchema);