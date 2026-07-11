import { Schema, model, models, type Document, type Types } from "mongoose";

export type ApplicationStage =
  | "applied"
  | "screening"
  | "interview"
  | "offer"
  | "hired"
  | "rejected";

interface NoteSubdocument {
  authorUserId: Types.ObjectId;
  content: string;
  createdAt: Date;
}

const noteSchema = new Schema<NoteSubdocument>(
  {
    authorUserId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export interface ApplicationDocument extends Document {
  organizationId: Types.ObjectId;
  jobId: Types.ObjectId;
  candidateId: Types.ObjectId;
  stage: ApplicationStage;
  notes: NoteSubdocument[];
  lastStageChangeByUserId: Types.ObjectId | null;
  lastStageChangeAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const applicationSchema = new Schema<ApplicationDocument>(
  {
    organizationId: {
      type: Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    },
    jobId: {
      type: Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    candidateId: {
      type: Schema.Types.ObjectId,
      ref: "Candidate",
      required: true,
    },
    stage: {
      type: String,
      enum: ["applied", "screening", "interview", "offer", "hired", "rejected"],
      required: true,
      default: "applied",
    },
    notes: {
      type: [noteSchema],
      default: [],
    },
    lastStageChangeByUserId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    lastStageChangeAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

applicationSchema.index({ jobId: 1, candidateId: 1 }, { unique: true });

export const Application =
  models.Application ?? model<ApplicationDocument>("Application", applicationSchema);