import NextAuth, { NextAuthOptions, User } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { NextApiRequest, NextApiResponse } from 'next';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from '../../../util/mognodb';

export default NextAuth({
    session: {
        strategy: 'database',
        maxAge: 60 * 60 * 24 * 365 * 20,
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID || '',
            clientSecret: process.env.GOOGLE_SECRET || '',
        }),
    ],

    database: process.env.MONGODB_URI,
    adapter: MongoDBAdapter(clientPromise),

    pages: {
        signIn: '/login',
        error: '/login',
    },
    secret: process.env.SECRET,
    callbacks: {
        async signIn({ account, profile }) {
            if (account.provider === 'google') {
                return (
                    profile.email_verified! &&
                    profile.email?.endsWith('@publy.co')
                );
            }
            return true;
        },
    },
});
