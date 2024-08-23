"use server";

import { User } from "@prisma/client";
import prisma from "../prisma";
import * as bcrypt from "bcrypt";
import EmailTemplate from "@/app/components/email-template";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function registerUser(
  user: Omit<User, "id" | "emailVerified" | "image">
) {
  // const newUser = await prisma.user.create({
  //   data: {
  //     email,
  //     firstName,
  //     lastName,
  //     password: hashedPassword,
  //   },
  // });

  const result = await prisma.user.create({
    data: {
      ...user,
      password: await bcrypt.hash(user.password, 10),
    },
  });

  const verificationToken = "123";
  // await prisma.emailVerification.create({
  await prisma.emailVerification.create({
    data: {
      userId: result.id,
      token: verificationToken,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    },
  });

  if (user.email) {
    await sendEmail(user.email, verificationToken, user.firstName);

    return result;
  }
}

export async function sendEmail(
  email: string,
  verificationToken: string,
  firstName: string
) {
  try {
    const verificationLink = `${process.env.NEXT_PUBLIC_BASE_URL}/verifyemail?token=${verificationToken}`;
    const emailSendResult = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [email],
      subject: "Verify Your Email Address",
      // react: EmailTemplate({ firstName: user.firstName }) as React.ReactElement,
      react: EmailTemplate({
        firstName: "user",
        verificationUrl: verificationLink,
      }) as React.ReactElement,
    });

    if (emailSendResult.error) {
      console.error(emailSendResult.error);
    } else {
      console.log("Email sent result", emailSendResult.data);
    }
  } catch (error) {
    console.error(error);
  }
}

export async function updateIsVerifiedUser(userId: number) {
  try {
    await prisma.user.update({
      where: {
        id: userId.toString(),
      },
      data: {
        emailVerified: true,
      },
    });
  } catch (error) {
    console.error("Error updating is verified in user:", error);
    throw new Error("Error verifying user");
  }
}
