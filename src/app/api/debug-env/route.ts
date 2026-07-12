import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    authSecret: {
      exists: process.env.AUTH_SECRET !== undefined,
      length: process.env.AUTH_SECRET?.length ?? 0,
    },
    mongoUri: {
      exists: process.env.MONGODB_URI !== undefined,
      length: process.env.MONGODB_URI?.length ?? 0,
    },
    vercelEnv: process.env.VERCEL_ENV ?? "MISSING",
    nodeEnv: process.env.NODE_ENV ?? "MISSING",
  });
}