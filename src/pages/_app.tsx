import './styles/globals.css';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { PortfolioProvider } from '../../context/context';
import { prefix } from '../../config/config';
function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <PortfolioProvider value={{ prefix }}>
                <Head>
                    <title>퍼블리 밥스</title>
                    <meta
                        name="퍼블리 밥스"
                        content="밥 먹고 일합시다!"
                    />
                    <link rel="icon" href="../../ForkAndKnife.ico" />
                </Head>
                <Component {...pageProps} />
            </PortfolioProvider>
        </>
    );
}

export default MyApp;
