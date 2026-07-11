import { Schema, model, models, type Document, type Types } from "mongoose";

interface EvaluationSubdocument {
  evaluatorUserId: Types.ObjectId;
  score: number;
  comments: string;
  createdAt: Date;
}

const evaluationSchema = new Schema<EvaluationSubdocument>(
  {
    evaluatorUserId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    score: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comments: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export interface InterviewDocument extends Document {
  applicationId: Types.ObjectId;
  organizationId: Types.ObjectId;
  scheduledAt: Date;
  interviewerUserId: Types.ObjectId;
  evaluations: EvaluationSubdocument[];
  createdAt: Date;
  updatedAt: Date;
}

const interviewSchema = new Schema<InterviewDocument>(
  {
    applicationId: {
      type: Schema.Types.ObjectId,
      ref: "Application",
      required: true,
    },
    organizationId: {
      type: Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    },
    scheduledAt: {
      type: Date,
      required: true,
    },
    interviewerUserId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    evaluations: {
      type: [evaluationSchema],
      default: [],
    },
  },
  { timestamps: true }
);

export const Interview =
  models.Interview ?? model<InterviewDocument>("Interview", interviewSchema);