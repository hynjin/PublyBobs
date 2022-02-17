import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Link from 'next/link';

export default function Home() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Grand Opening Publy Bobs!</h1>
            <p className={styles.description}>
                Get started by editing{' '}
                <code className={styles.code}>pages/index.js</code>
            </p>
            <div className={styles.grid}>
                <Link href="/restaurants">
                    <a className={styles.card}>
                        <h2>식당 &rarr;</h2>
                        <p>MongoDB애 저장되어 있는 식당 목록</p>
                    </a>
                </Link>
                <Link href="/restaurants">
                    <a className={styles.card}>
                        <h2>메뉴 &rarr;</h2>
                        <p>MongoDB애 저장되어 있는 메뉴 목록</p>
                    </a>
                </Link>
                <Link href="/restaurants">
                    <a className={styles.card}>
                        <h2>주문 &rarr;</h2>
                        <p>MongoDB애 저장되어 있는 주문 목록</p>
                    </a>
                </Link>
                <Link href="/restaurants">
                    <a className={styles.card}>
                        <h2>오늘의 메뉴 &rarr;</h2>
                        <p>MongoDB애 저장되어 있는 오늘의 메뉴 목록</p>
                    </a>
                </Link>
            </div>
        </div>
    );
}
