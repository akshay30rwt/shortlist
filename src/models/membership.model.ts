import { Schema, model, models, type Document, type Types } from "mongoose";

export type MembershipRole = "admin" | "member";
export type MembershipStatus = "active" | "removed";

export interface MembershipDocument extends Document {
  userId: Types.ObjectId;
  organizationId: Types.ObjectId;
  role: MembershipRole;
  status: MembershipStatus;
  createdAt: Date;
  updatedAt: Date;
}

const membershipSchema = new Schema<MembershipDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    organizationId: {
      type: Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "member"],
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "removed"],
      required: true,
      default: "active",
    },
  },
  { timestamps: true }
);

membershipSchema.index({ organizationId: 1, userId: 1 }, { unique: true });

export const Membership =
  models.Membership ?? model<MembershipDocument>("Membership", membershipSchema);