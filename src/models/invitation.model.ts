import { Schema, model, models, type Document, type Types } from "mongoose";

export type InvitationRole = "admin" | "member";
export type InvitationStatus = "pending" | "accepted" | "expired" | "revoked";

export interface InvitationDocument extends Document {
  organizationId: Types.ObjectId;
  invitedEmail: string;
  role: InvitationRole;
  status: InvitationStatus;
  tokenHash: string;
  invitedByUserId: Types.ObjectId;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const invitationSchema = new Schema<InvitationDocument>(
  {
    organizationId: {
      type: Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    },
    invitedEmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["admin", "member"],
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "expired", "revoked"],
      required: true,
      default: "pending",
    },
    tokenHash: {
      type: String,
      required: true,
      unique: true,
    },
    invitedByUserId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

invitationSchema.index({ organizationId: 1, invitedEmail: 1, status: 1 });

export const Invitation =
  models.Invitation ?? model<InvitationDocument>("Invitation", invitationSchema);