import type { NextPage } from 'next';
import styles from './styles/Home.module.css';
import Link from 'next/link';
import type { NextApiRequest, NextApiResponse } from 'next';

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
                <Link href="/restaurants">
                    <a className={styles.card}>
                        <h2>식당 &rarr;</h2>
                        <p>MongoDB애 저장되어 있는 식당 목록</p>
                    </a>
                </Link>
                <Link href="/menus">
                    <a className={styles.card}>
                        <h2>메뉴 &rarr;</h2>
                        <p>MongoDB애 저장되어 있는 메뉴 목록</p>
                    </a>
                </Link>
                <Link href="/orders">
                    <a className={styles.card}>
                        <h2>주문 &rarr;</h2>
                        <p>MongoDB애 저장되어 있는 주문 목록</p>
                    </a>
                </Link>
                <Link href="/dayilyMenus">
                    <a className={styles.card}>
                        <h2>오늘의 메뉴 &rarr;</h2>
                        <p>MongoDB애 저장되어 있는 오늘의 메뉴 목록</p>
                    </a>
                </Link>
            </div>
        </div>
    );
};

export async function getServerSideProps() {
    let yesterDay = new Date();
    yesterDay.setDate(yesterDay.getDate() - 1);
    // const baseUrl = req ? `${req.protocol}://${req.get('Host')}` : '';
    const result = await fetch('http://localhost:3003//api/users');
    const dayilyMenus = await result.json();
    // const dayilyMenus = await db.dayilyMenus.findOne({
    //     updated_at: { $gt: yesterDay },
    // });
    // .limit(20)
    // .toArray();

    return {
        props: {
            dayilyMenus: JSON.parse(JSON.stringify(dayilyMenus)),
        },
    };
}

export default Home;
