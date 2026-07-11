import { Schema, model, models, type Document, type Types } from "mongoose";

export type JobStatus = "draft" | "published" | "closed";

export interface JobDocument extends Document {
  organizationId: Types.ObjectId;
  title: string;
  slug: string;
  description: string;
  status: JobStatus;
  createdAt: Date;
  updatedAt: Date;
}

const jobSchema = new Schema<JobDocument>(
  {
    organizationId: {
      type: Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["draft", "published", "closed"],
      required: true,
      default: "draft",
    },
  },
  { timestamps: true }
);

jobSchema.index({ organizationId: 1, slug: 1 }, { unique: true });

export const Job = models.Job ?? model<JobDocument>("Job", jobSchema);