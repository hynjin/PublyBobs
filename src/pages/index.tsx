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
import AddRestaurantForm from '../components/AddRestaurantForm';
import OrderForm from '../components/OrderForm';
import { getSession, signIn, signOut, useSession } from 'next-auth/react';
import _ from 'lodash';

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
                    <h1>Publy Bobs</h1>
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
                <div className="flex-1 p-3 pl-0 flex gap-3 divide-x">
                    <div className="pl-3 w-1/4">
                        <div className="p-3">
                            {/* section title */}
                            <div className="mb-6">
                                <div className="relative h-6 mb-1">
                                    <div
                                        className="
                                        absolute -top-2 -left-4 -rotate-12
                                        w-8 h-4 rounded-[32px/16px] bg-primary
                                        flex justify-center items-center
                                    "
                                    >
                                        <span className="text-[10px] text-white font-bold leading-none">
                                            NOT
                                        </span>
                                    </div>
                                    <h3 className="absolute">
                                        Chefs of The Week
                                    </h3>
                                </div>
                                <p className="text-xs text-gray-700">
                                    천하제일 요리사(※아님) 탈트가 주문합니다!
                                </p>
                            </div>
                            <div className="flex justify-between">
                                <div className="text-center">
                                    <img
                                        className="mb-2 w-10 h-10 rounded-full bg-gray-50"
                                        src="https://ca.slack-edge.com/T03S4U6N7-U02SBTUN7CJ-264f2a21f531-512" // slack 프로필 이미지 url (ex: 종혁)
                                    />
                                    <h6>Mon</h6>
                                    <p className="text-xs mt-1">이름</p>
                                </div>
                                <div className="text-center">
                                    <img
                                        className="mb-2 w-10 h-10 rounded-full bg-gray-50"
                                        src="https://ca.slack-edge.com/T03S4U6N7-U02SBTUN7CJ-264f2a21f531-512" // slack 프로필 이미지 url (ex: 종혁)
                                    />
                                    <h6>Tue</h6>
                                    <p className="text-xs mt-1">이름</p>
                                </div>
                                <div className="text-center">
                                    <img
                                        className="mb-2 w-10 h-10 rounded-full bg-gray-50"
                                        src="https://ca.slack-edge.com/T03S4U6N7-U02SBTUN7CJ-264f2a21f531-512" // slack 프로필 이미지 url (ex: 종혁)
                                    />
                                    <h6>Wed</h6>
                                    <p className="text-xs mt-1">이름</p>
                                </div>
                                <div className="text-center">
                                    <img
                                        className="mb-2 w-10 h-10 rounded-full bg-gray-50"
                                        src="https://ca.slack-edge.com/T03S4U6N7-U02SBTUN7CJ-264f2a21f531-512" // slack 프로필 이미지 url (ex: 종혁)
                                    />
                                    <h6>Thu</h6>
                                    <p className="text-xs mt-1">이름</p>
                                </div>
                                {/* 저녁 없는 날 */}
                                <div className="text-center">
                                    <img
                                        className="mb-2 w-10 h-10 rounded-full bg-gray-50"
                                        src="https://ca.slack-edge.com/T03S4U6N7-U02SBTUN7CJ-264f2a21f531-512" // TODO: empty state 이미지
                                    />
                                    <h6>Fri</h6>
                                    <p className="text-xs mt-1">-</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="pl-3 w-2/4 divide-y divide-more"></div>
                    <OrderForm
                        weekNumber={weekNumber}
                        selectedDay={selectedDay}
                    />
                    <div className="pl-3 w-1/4"></div>
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
