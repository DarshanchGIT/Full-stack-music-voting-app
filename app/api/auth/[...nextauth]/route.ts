import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prismaClient } from "@/app/lib/db";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async signIn(params) {
      console.log(params);

      //fist check if any user exist or not with that username or not 
      if (!params.user.email) {
        return false;
      }

      try {
        const existingUser = await prismaClient.user.findUnique({
          where: {
            email: params.user.email,
          },
        });

        if (existingUser) {
          return true;
        }
        

        await prismaClient.user.create({
          data: {
            email: params.user.email,
            provider: "Google",
          },
        });

        return true;
      } catch (e) {
        console.error(e);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
