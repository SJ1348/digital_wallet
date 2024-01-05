import CredentialsProvider from "next-auth/providers/credentials";

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
      //main code to check if user is present in db and if all three credentials are correct
      async authorize(credentials) {
        const user = { username: credentials.email };
        console.log(credentials);
        if (user) {
          return user;
        }
        return null;
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
