import { GetServerSideProps } from 'next';
import type { NextPage } from 'next';
import React, {
    useState,
    useCallback,
    useRef,
    useEffect,
    useLayoutEffect,
} from 'react';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import type { NextApiRequest, NextApiResponse } from 'next';
import AddChefForm from '../components/AddChefForm';
import * as DateHelper from '../helper/DateHelper';
import Calendar from '../components/Calendar';
import Week from '../components/Week';
import { ConnectionClosedEvent } from 'mongodb';
import { useForm, useWatch, Control } from 'react-hook-form';
import * as ChefAPI from '../api/Chef';
import { UserDropdown } from '../components/UserDropdown';
import EditMenuForm from '../components/EditMenuForm';

export default function News(props: { chefs: any }) {
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
        <div
            className={
                `${styles.container}
                flex
                flex-col
                divide-y
                divide-double` // ERROR! double 스타일 적용
            }
        >
            <div className="divide-y">
                <div className="px-6 py-8 flex justify-between items-center">
                    <div className="w-44 p-3 border text-xs">
                        <p>퍼블리 저녁식사 신청 시스템</p>
                        <p>퍼블리 밥스 오픈베타</p>
                    </div>
                    <h1>Bobs Editor</h1>
                    <UserDropdown />
                </div>
                <div className="p-3 flex justify-center">
                    <p className="">
                        일주일 식단을 미리 등록하세요! 매주 월요일 정오에
                        오픈됩니다.
                    </p>
                </div>
            </div>
            <div className="flex-1 flex flex-col divide-y">
                <div className="p-3 flex justify-between items-center">
                    <h2 className="p-3">Jan, 2022</h2>
                    <div className="p-3 flex">
                        <button
                            type="button"
                            className="btn btn-ghost btn-gray"
                            // onClick={ 설정 화면으로 전환 }
                        >
                            <span>설정</span>
                        </button>
                    </div>
                </div>
                <div className="flex-1 p-3 pl-0 flex gap-3 divide-x">
                    <div className="pl-3 w-1/4">
                        <AddChefForm
                            date={selectedDay}
                            weekNumber={weekNumber}
                        />
                    </div>
                    <div className="pl-3 w-3/4 divide-y divide-more">
                        <Week
                            menus={[]}
                            weekNumber={weekNumber}
                            setWeekNumber={onChangeWeekNumber}
                            selectedDay={selectedDay}
                            setSelectedDay={onSelectedDay}
                        />
                        <EditMenuForm />
                    </div>
                </div>
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
