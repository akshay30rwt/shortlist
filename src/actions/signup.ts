"use server";

import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/models/user.model";
import { signupSchema } from "@/lib/validations/auth";

export async function signup(_prevState: unknown, formData: FormData) {
  const rawData = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const result = signupSchema.safeParse(rawData);

  if (!result.success) {
    return {
      success: false,
      error: result.error.issues[0]?.message ?? "Invalid input",
    };
  }

  const { name, email, password } = result.data;

  await connectToDatabase();

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return {
      success: false,
      error: "An account with this email already exists",
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({
    name,
    email,
    hashedPassword,
    emailVerified: false,
  });

  return { success: true };
}