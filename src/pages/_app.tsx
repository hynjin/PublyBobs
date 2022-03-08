import '../styles/globals.css';
import '../foundations/styles/fonts/font.css';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { prefix } from '../../config/config';
import { SessionProvider } from 'next-auth/react';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
    return (
        <>
            <SessionProvider session={session}>
                <Head>
                    <title>퍼블리 밥스</title>
                    <meta name="퍼블리 밥스" content="밥 먹고 일합시다!" />
                    <link rel="icon" href="../../ForkAndKnife.ico" />
                </Head>
                <Component {...pageProps} />
            </SessionProvider>
        </>
    );
}

export default MyApp;
