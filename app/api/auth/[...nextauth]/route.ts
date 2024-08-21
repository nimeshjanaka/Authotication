import React from "react";
import CredentialsProvider from "next-auth/providers/credentials";
import * as bcrypt from "bcrypt";
import prisma from "../../../../lib/prisma";
import NextAuth, { AuthOptions } from "next-auth";
import { NextApiHandler } from "next";
import { User } from "@prisma/client";

interface Credentials {
  username: string;
  password: string;
}

export const authOptions: AuthOptions = {
  pages: {
    signIn: "/auth/signin",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: Credentials | undefined) {
        if (!credentials) {
          throw new Error("No credentials provided");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.username,
          },
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            password: true,
          },
        });

        if (!user) throw new Error("No user found");

        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordCorrect) throw new Error("Incorrect password");

        const { password, ...userWithoutPass } = user;

        return userWithoutPass;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user as User;
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },
};

const handler: NextApiHandler = (req, res) => NextAuth(req, res, authOptions);

export { handler as GET, handler as POST };
