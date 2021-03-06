import { GetServerSideProps } from 'next';
import React, { useState, useCallback, useEffect } from 'react';
import styles from '../styles/Home.module.css';
import AddChefForm from '../components/AddChefForm';
import * as DateHelper from '../helper/DateHelper';
import Week from '../components/Week';
import { UserDropdown } from '../components/UserDropdown';
import AddOrderForm from '../components/AddOrderForm';
import { getSession } from 'next-auth/react';
import _ from 'lodash';

export default function Editor() {
    const [weekNumber, setWeekNumber] = useState(DateHelper.getWeekNumber());
    const onChangeWeekNumber = useCallback((num: number) => {
        setWeekNumber(num);
    }, []);

    const [selectedDay, setSelectedDay] = useState(
        DateHelper.getDateByFormat()
    );
    const onSelectedDay = useCallback((day: any) => {
        setSelectedDay(day);
    }, []);

    const [year, setYear] = useState(DateHelper.getYear(selectedDay));
    const [month, setMonth] = useState(
        DateHelper.getDateByFormatEn(selectedDay, 'MMM')
    );
    useEffect(() => {
        setYear(DateHelper.getYear(selectedDay));
        setMonth(DateHelper.getDateByFormatEn(selectedDay, 'MMM'));
    }, [selectedDay]);

    return (
        <div
            className={
                `${styles.container}
                flex
                flex-col
                divide-y
                divide-double` // TODO: double 스타일 적용
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
                <div className="p-3 text-center">
                    <span className="">
                        일주일 식단을 미리 등록하세요! 매주 월요일 정오에 오픈됩니다.
                    </span>
                </div>
            </div>
            <div className="flex-1 flex flex-col divide-y">
                <div className="p-3 flex justify-between items-center">
                    <h2 className="p-3">
                        {month}, {year}
                    </h2>
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
                    <div className="pl-3 basis-1/4">
                        <AddChefForm
                            date={selectedDay}
                            weekNumber={weekNumber}
                        />
                    </div>
                    <div className="pl-3 basis-3/4 divide-y divide-more">
                        <Week
                            menus={[]}
                            weekNumber={weekNumber}
                            setWeekNumber={onChangeWeekNumber}
                            selectedDay={selectedDay}
                            setSelectedDay={onSelectedDay}
                        />
                        <AddOrderForm
                            weekNumber={weekNumber}
                            selectedDay={selectedDay}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const session = await getSession(ctx);

    if (!session) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    }
    // const baseUrl = `http://${ctx.req.headers.host}`;
    // const chefs = await fetch(baseUrl + '/api/chefs').then((res) => res.json());

    return {
        props: {},
    };
};
