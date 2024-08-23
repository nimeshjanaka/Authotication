import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Ensure you have a prisma client instance exported from some module

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json(
      { error: "Invalid or missing token" },
      { status: 400 }
    );
  }

  try {
    // Fetch the user associated with the verification token
    const verification = await prisma.emailVerification.findFirst({
      where: { token: token },
      select: { userId: true },
    });

    if (!verification) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    const userId = verification.userId;

    // Update the user's verification status
    await prisma.user.update({
      where: { id: userId },
      data: { emailVerified: true },
    });

    return NextResponse.json({ message: "Email verified successfully!" });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
