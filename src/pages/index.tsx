import { GetServerSideProps } from 'next';
import type { NextPage } from 'next';
import styles from './styles/Home.module.css';
import Link from 'next/link';
import type { NextApiRequest, NextApiResponse } from 'next';
import React, { useState } from 'react';

import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import { Calendar, DayValue } from 'react-modern-calendar-datepicker';
import * as DateHelper from '../helper/DateHelper';
import _ from 'lodash';
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
    const App = () => {
        const getMonday = (e?: DayValue) => {
            const current = DateHelper.getDateFromPart(e ?? defaultValue);
            const monday = DateHelper.getMonday(current);
            return monday;
        };

        const rangeDate = (mon: string) => {
            return _.map(_.range(5), (index) => {
                const dateTime = DateHelper.addDay(mon, index);
                return {
                    year: DateHelper.getYear(dateTime),
                    month: DateHelper.getMonth(dateTime) + 1,
                    day: DateHelper.getDay(dateTime),
                    className: 'bg-slate-400',
                };
            });
        };

        const defaultValue = {
            year: DateHelper.getYear(),
            month: DateHelper.getMonth() + 1,
            day: DateHelper.getDay(),
        };
        const defaultRange = rangeDate(getMonday().toString());

        const [selectedDay, setSelectedDay] = useState<DayValue>(defaultValue);
        const [dayRange, setDayRange] = useState<
            {
                year: number | undefined;
                month: number | undefined;
                day: number;
                className: string;
            }[]
        >(defaultRange);

        return (
            <div className="shadow-none">
                <Calendar
                    value={selectedDay}
                    onChange={(e) => {
                        setSelectedDay(e);
                        setDayRange(rangeDate(getMonday(e).toString()));
                    }}
                    colorPrimary="#9c88ff"
                    calendarClassName="custom-calendar"
                    calendarTodayClassName="custom-today-day"
                    shouldHighlightWeekends
                    // customDaysClassName={dayRange} //일단 무시
                />
            </div>
        );
    };
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Coming soon Publy Bobs!</h1>
            <p className={styles.description}>
                Get started by editing{' '}
                <code className={styles.code}>src/pages/index.js</code>
            </p>
            <div className={styles.grid}>
                <App />
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
                <Link href="/bobNews">
                    <a className={styles.card}>
                        <h2>bob new &rarr;</h2>
                        <p>MongoDB애 저장되어 있는 오늘의 메뉴 목록</p>
                    </a>
                </Link>
            </div>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const baseUrl = `http://${ctx.req.headers.host}`;
    let yesterDay = new Date();
    yesterDay.setDate(yesterDay.getDate() - 1);
    const chefs = await await fetch(baseUrl + '/api/chefs').then((res) =>
        res.json()
    );

    return {
        props: {
            chefs,
        },
    };
};

export default Home;
