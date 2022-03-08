import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID || '',
            clientSecret: process.env.GOOGLE_SECRET || '',
            authorization: {
                params: {
                    prompt: 'consent',
                    access_type: 'offline',
                    response_type: 'code',
                },
            },
        }),
    ],
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
