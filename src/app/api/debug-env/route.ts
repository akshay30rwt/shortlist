import { NextResponse } from "next/server";

export async function GET() {
  const secret = process.env.AUTH_SECRET;
  return NextResponse.json({
    exists: secret !== undefined,
    length: secret?.length ?? 0,
  });
}