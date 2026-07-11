import { Schema, model, models, type Document } from "mongoose";

export interface UserDocument extends Document {
  name: string;
  email: string;
  hashedPassword: string | null;
  emailVerified: boolean;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<UserDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    hashedPassword: {
      type: String,
      default: null,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

export const User = models.User ?? model<UserDocument>("User", userSchema);