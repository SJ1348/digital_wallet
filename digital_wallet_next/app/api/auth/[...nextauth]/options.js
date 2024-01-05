import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "../../../../prisma/index.js";

export const options = {
  providers: [
    CredentialsProvider({
      name: "Wallet Credentials",

      credentials: {
        phone: {
          label: "Phone",
          type: "number",
        },
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@email.com",
        },
        password: { label: "Password", type: "password" },
      },
      //logic to check if user is present in db and if credentials are correct
      async authorize(credentials) {
        try {
          const user = await prisma.user.findFirst({
            where: {
              email: credentials.email,
              password: credentials.password,
            },
          });

          if (user) {
            console.log("Found user:", user);

            return user;
          } else {
            console.log("User not found");
            return null;
          }
        } catch (error) {
          console.error("Error finding user:", error);
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      if (session?.user) session.user.role = token.role;
      return session;
    },
  },
};
