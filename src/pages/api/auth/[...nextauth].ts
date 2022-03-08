import NextAuth, { NextAuthOptions, User } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { JWT } from 'next-auth/jwt';
import { NextApiRequest, NextApiResponse } from 'next';

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
    // jwt: {
    //     encryption: true,
    // },
    // secret: 'secret token',
    // secret: process.env.SECRET,

    // session: {
    //     jwt: true,
    //     // TODO : check jwt age
    //     maxAge: 60 * 60 * 24 * 365 * 20,
    // },

    // jwt: {
    //     secret: process.env.JWT_SECRET,
    //     encryption: false,
    //     signingKey: process.env.JWT_SIGNING_KEY,
    // },

    // pages: {
    //     signIn: '/login',
    //     error: '/login',
    // },
    callbacks: {
        // session({ session, token, user }) {
        //     return session; // The return type will match the one returned in `useSession()`
        // },
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
    // async session(session, token) {
    //     session.user = (token as JWT).user;
    //     const { data: workspaceMember } = await getWorkspaceMemberBySession(
    //         session
    //     );
    //     session.user.workspaceMember = workspaceMember;

    //     return session;
    // },
    // jwt(token, user, account, profile) {
    //     if (!user) {
    //         return token;
    //     }

    //     // 유저가 처음 로그인 - 토큰 최초 발행
    //     token.user = _.pick(user, [
    //         'userId',
    //         'email',
    //         'profile',
    //         'access_token',
    //     ]) as User;

    //     // 등록한 device id Set-Cookie
    //     if (!deviceIdCookieValue) {
    //         res.setHeader(
    //             'Set-Cookie',
    //             `${DEVICE_ID_COOKIE_NAME}=${deviceId}; path=/; max-age=${
    //                 60 * 60 * 24 * 365 * 20
    //             }; httponly; secure`
    //         );
    //     }

    //     return _.pick(token, ['user']) as JWT;
    // },
});
