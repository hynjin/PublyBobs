import { GetServerSideProps } from 'next';
import type { NextPage } from 'next';
import React, {
    useState,
    useCallback,
    useRef,
    useEffect,
    useLayoutEffect,
} from 'react';
import styles from './styles/Home.module.css';
import Link from 'next/link';
import type { NextApiRequest, NextApiResponse } from 'next';
import AddChefForm from '../components/AddChefForm';
import * as DateHelper from '../helper/DateHelper';
import Calendar from '../components/Calendar';
import Week from '../components/Week';
import { ConnectionClosedEvent } from 'mongodb';
import { useForm, useWatch, Control } from 'react-hook-form';
import * as ChefAPI from '../api/Chef';

export default function News(props: { chefs: any }) {
    // const { chefs } = props;
    const today = DateHelper.getDateByFormat();
    const [weekNumber, setWeekNumber] = useState(DateHelper.getWeekNumber());
    const onChangeWeekNumber = useCallback((num: number) => {
        setWeekNumber(num);
    }, []);
    const [selectedDay, setSelectedDay] = useState(today);
    const onSelectedDay = useCallback((day: any) => {
        setSelectedDay(day);
    }, []);

    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm();

    const onSubmit = (data: any) => console.log(data);

    return (
        <div className={styles.container}>
            <div className="lg:text-center">
                <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                    오늘의 메뉴!
                </p>
                <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                    주문 받아용
                </p>
            </div>
            <div className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                <Week
                    menus={[]}
                    weekNumber={weekNumber}
                    setWeekNumber={onChangeWeekNumber}
                    selectedDay={selectedDay}
                    setSelectedDay={onSelectedDay}
                />
            </div>
            <div className={styles.grid}>
                <Calendar />
            </div>
            <div className={styles.grid}>
                <AddChefForm date={selectedDay} weekNumber={weekNumber} />
            </div>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const baseUrl = `http://${ctx.req.headers.host}`;
    const chefs = await fetch(baseUrl + '/api/chefs').then((res) => res.json());

    return {
        props: {
            chefs,
        },
    };
};
