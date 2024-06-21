import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { api } from '../../../../services/setupApiClient';
import bcrypt from 'bcryptjs';
import registerNewUser from "@/services/signup/registerNewUser";

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

          if (signin.status !== 200) return null;

          const user = signin.data;

          return {
            id: user.id,
            name: user.nome,
            email: user.email,
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
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        try {
          const response = await api.post(`/check-email?email=${user.email}`);
          const { exists, id, googleId } = response.data;

          
          if (exists && !googleId) {
            
            await api.put('/user', {
              email: user.email,
              googleId: account.providerAccountId
            });
           
          } 

          if(!exists || !googleId) {

            const randomPassword = Math.random().toString(36).substring(7);
            const hashedPassword = await bcrypt.hash(randomPassword, 10);

            const data = {
              email: user.email as string,
              nome: user.name as string,
              senha: hashedPassword as string,
              googleId: account.providerAccountId,
            };

            await registerNewUser(data);
          }
          user.id = id // injeto o id do usuário pra usar depois na sessão
          return true;
        } catch (error) {
          console.error('Erro ao verificar/criar usuário:', error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; 
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string; // Adiciona o ID do usuário à sessão
      }
      return session;
    }
  }
};

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST, nextAuthOptions };
