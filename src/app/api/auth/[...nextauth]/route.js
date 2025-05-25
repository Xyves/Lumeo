import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import GithubProvider from 'next-auth/providers/github';

import { prismaDB } from '@/lib/prismaDB';

export const authOptions = {
  adapter: PrismaAdapter(prismaDB),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        name: { label: 'name', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials.name || !credentials.password) {
          return null;
        }
        const user = await prismaDB.user.findUnique({
          where: {
            name: credentials.name,
          },
        });
        if (!user || !user?.passwordHash) {
          return null;
        }
        const passwordsMatch = await bcrypt.compare(
          credentials.password,
          user.passwordHash
        );
        if (!passwordsMatch) {
          return null;
        }
        return user;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
      }
      return session;
    },
  },
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
