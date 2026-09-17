import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcryptjs from "bcryptjs";
import prisma from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        const admin = await prisma.admin.findUnique({
          where: { username: credentials.username },
        });

        if (!admin) {
          return null;
        }

        const passwordMatch = await bcryptjs.compare(
          credentials.password,
          admin.passwordHash
        );

        if (!passwordMatch) {
          return null;
        }

        return {
          id: admin.id,
          name: admin.username,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  pages: {
    signIn: "/admin/login",
  },

  secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
};
