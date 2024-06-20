import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { api } from '../../../../services/setupApiClient';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import registerNewUser from "@/services/signup/registerNewUser";
import GetDataUser from "@/services/getEvents/getDataUser/getDataUser";

const nextAuthOptions: NextAuthOptions = {
  pages: {
    signIn: "/"
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        const { email, password } = credentials;

        try {

          const signin = await api.post('/session', {
            email,
            password
          });

          return {
            id: signin.data.id,
            name: signin.data.nome,
            email: signin.data.email,
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
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google') {
        try {

          const response = await api.post(`/check-email?email=${user.email}`);
          const { exists } = response.data;

          if (exists && !exists.googleId) {

            await api.put('/user', {

              email: user.email,
              googleId: account.providerAccountId

            });

          } else {

            const randomPassword = Math.random().toString(36).substring(7);
            const hashedPassword = await bcrypt.hash(randomPassword, 10);

            const data = {
              email: user.email as string,
              nome: user.name as string,
              senha: hashedPassword as string,
              googleId: account.providerAccountId,
            }

            await registerNewUser(data)
              
           
        }
          return true;
      } catch (error) {
        console.error('Erro ao verificar/criar usuário:', error);
        return false;
      }
    }
      return true;
  },
  async jwt({ token, user  }) {
    if (user) {
      const email = user.email as string
      const userData = await GetDataUser(email) 
      
      token.googleID = user.id; 
      token.id = userData.id
      
    }
    return token
  }
},

};

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST, nextAuthOptions };
