import { GetServerSideProps } from 'next';
import type { NextPage } from 'next';
import styles from './styles/Home.module.css';
import Link from 'next/link';
import type { NextApiRequest, NextApiResponse } from 'next';
import AddChefForm from '../components/AddChefForm';
import * as DateHelper from '../helper/DateHelper';

// import { useRouter } from 'next/router'
// import useSwr from 'swr'

// const fetcher = (url) => fetch(url).then((res) => res.json())

// export default function User() {
//   const router = useRouter()
//   const { data, error } = useSwr(
//     router.query.id ? `/api/user/${router.query.id}` : null,
//     fetcher
//   )

//   if (error) return <div>Failed to load user</div>
//   if (!data) return <div>Loading...</div>

//   return <div>{data.name}</div>
// }

const Home: NextPage = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Coming soon Publy Bobs!</h1>
            <p className={styles.description}>
                Get started by editing{' '}
                <code className={styles.code}>src/pages/index.js</code>
            </p>
            <div className={styles.grid}>
                <AddChefForm date={DateHelper.toDate()} />
            </div>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const baseUrl = `http://${ctx.req.headers.host}`;
    let yesterDay = new Date();
    yesterDay.setDate(yesterDay.getDate() - 1);
    const users = await await fetch(baseUrl + '/api/users').then((res) =>
        res.json()
    );

    return {
        props: {
            users,
        },
    };
};

export default Home;
