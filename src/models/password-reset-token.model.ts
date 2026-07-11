import { Schema, model, models, type Document, type Types } from "mongoose";

export interface PasswordResetTokenDocument extends Document {
  userId: Types.ObjectId;
  tokenHash: string;
  expiresAt: Date;
  used: boolean;
  createdAt: Date;
}

const passwordResetTokenSchema = new Schema<PasswordResetTokenDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tokenHash: {
      type: String,
      required: true,
      unique: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    used: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const PasswordResetToken =
  models.PasswordResetToken ??
  model<PasswordResetTokenDocument>("PasswordResetToken", passwordResetTokenSchema);