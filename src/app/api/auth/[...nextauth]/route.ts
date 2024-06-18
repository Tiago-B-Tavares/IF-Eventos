import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { api } from '../../../../services/setupApiClient';
import { cookies } from 'next/headers'

const nextAuthOptions: NextAuthOptions = {
  pages: {
    signIn: "/"
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },

      async authorize(credentials) {

        if (!credentials) {
          return null
        }

        const { email, password } = credentials;

        try {
          const response = await api.post('/session', {
            email,
            password
          });
          if (response.status !== 200) return null;

          const authToken = await response.data.token;

          if (!authToken) return null;

          cookies().set("jwt", authToken);

          return {
            id: response.data.id,
            name: response.data.nome,
            email: response.data.email,
          };
        } catch (error) {
          console.log("Erro na autenticação");
          return null;
        }
      }
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
  ]
}
const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST, nextAuthOptions };
