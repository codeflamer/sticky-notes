import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { db } from "./db";

const getGooglecredentials = () => {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  if (!clientId || clientId?.length == 0) {
    throw new Error("GOOGLE_CLIENT_ID not found");
  }
  if (!clientSecret || clientSecret?.length == 0) {
    throw new Error("GOOGLE_CLIENT_SECRET not found");
  }

  return { clientId, clientSecret };
};

const getGithubcredentials = () => {
  const clientId = process.env.GITHUB_ID;
  const clientSecret = process.env.GITHUB_SECRET;
  if (!clientId || clientId?.length == 0) {
    throw new Error("GITHUB_CLIENT_ID not found");
  }
  if (!clientSecret || clientSecret?.length == 0) {
    throw new Error("GITHUB_CLIENT_SECRET not found");
  }
  return { clientId, clientSecret };
};

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  adapter: PrismaAdapter(db),

  providers: [
    GithubProvider({
      clientId: getGithubcredentials().clientId,
      clientSecret: getGithubcredentials().clientSecret,
      allowDangerousEmailAccountLinking: true,
    }),
    GoogleProvider({
      clientId: getGooglecredentials().clientId,
      clientSecret: getGooglecredentials().clientSecret,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      //console.log("The token called from the callback: ", token);
      const dbUser = await db.user.findFirst({
        where: {
          id: token.sub,
        },
      });

      if (!dbUser) {
        if (user) {
          token.id = JSON.parse(user?.id);
        }
        return token;
      }
      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
      };
    },
    async session({ session, token }) {
      //console.log("Session called from the session under call back:", session);
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }
      return session;
    },
    redirect() {
      return "/profile";
    },
  },
};
