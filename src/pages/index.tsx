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
import { StarIcon } from '@heroicons/react/outline';

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

    const [year, setYear] = useState(DateHelper.getYear(selectedDay));
    const [month, setMonth] = useState(
        DateHelper.getDateByFormatEn(selectedDay, 'MMM')
    );
    useEffect(() => {
        setYear(DateHelper.getYear(selectedDay));
        setMonth(DateHelper.getDateByFormatEn(selectedDay, 'MMM'));
    }, [selectedDay]);

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
                divide-double` // TODO: double ????????? ??????
            }
        >
            <div className="divide-y">
                <div className="px-6 py-8 flex justify-between items-center">
                    <div className="w-44 p-3 border text-xs">
                        <p>????????? ???????????? ?????? ?????????</p>
                        <p>????????? ?????? ????????????</p>
                    </div>
                    <h1>Publy Bobs</h1>
                    <UserDropdown />
                </div>
                <div className="p-3 flex justify-center">
                    {/* TODO: ?????? ????????? (???????????? ??????) */}
                    <p className="">
                        ????????? '?????? ?????????' ?????? ??????????
                    </p>
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
                            // onClick={ TODO: ????????? ?????? ?????? }
                        >
                            <span>??????</span>
                        </button>
                    </div>
                </div>
                
                <div className="flex-1 p-3 pl-0 flex gap-3 divide-x">
                    <div className="pl-3 basis-1/4">
                        <div className="p-3">
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
                                    ???????????? ?????????(?????????) ????????? ???????????????!
                                </p>
                            </div>
                            <div className="flex justify-between">
                                <div className="text-center">
                                    <img
                                        className="mb-2 w-10 h-10 rounded-full bg-gray-50"
                                        src="https://ca.slack-edge.com/T03S4U6N7-U02SBTUN7CJ-264f2a21f531-512" // slack ????????? ????????? url (ex: ??????)
                                    />
                                    <h6>Mon</h6>
                                    <p className="text-xs mt-1">??????</p>
                                </div>
                                <div className="text-center">
                                    <img
                                        className="mb-2 w-10 h-10 rounded-full bg-gray-50"
                                        src="https://ca.slack-edge.com/T03S4U6N7-U02SBTUN7CJ-264f2a21f531-512" // slack ????????? ????????? url (ex: ??????)
                                    />
                                    <h6>Tue</h6>
                                    <p className="text-xs mt-1">??????</p>
                                </div>
                                <div className="text-center">
                                    <img
                                        className="mb-2 w-10 h-10 rounded-full bg-gray-50"
                                        src="https://ca.slack-edge.com/T03S4U6N7-U02SBTUN7CJ-264f2a21f531-512" // slack ????????? ????????? url (ex: ??????)
                                    />
                                    <h6>Wed</h6>
                                    <p className="text-xs mt-1">??????</p>
                                </div>
                                <div className="text-center">
                                    <img
                                        className="mb-2 w-10 h-10 rounded-full bg-gray-50"
                                        src="https://ca.slack-edge.com/T03S4U6N7-U02SBTUN7CJ-264f2a21f531-512" // slack ????????? ????????? url (ex: ??????)
                                    />
                                    <h6>Thu</h6>
                                    <p className="text-xs mt-1">??????</p>
                                </div>
                                {/* ?????? ?????? ??? */}
                                <div className="text-center">
                                    <img
                                        className="mb-2 w-10 h-10 rounded-full bg-gray-50"
                                        src="https://ca.slack-edge.com/T03S4U6N7-U02SBTUN7CJ-264f2a21f531-512" // TODO: empty state ?????????
                                    />
                                    <h6>Fri</h6>
                                    <p className="text-xs mt-1">-</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="pl-3 basis-2/4 divide-y divide-more">
                        <Week
                            menus={[]}
                            weekNumber={weekNumber}
                            setWeekNumber={onChangeWeekNumber}
                            selectedDay={selectedDay}
                            setSelectedDay={onSelectedDay}
                        />
                        <OrderForm
                            weekNumber={weekNumber}
                            selectedDay={selectedDay}
                        />
                    </div>
                    <div className="pl-3 basis-1/4 divide-y divide-more">
                        <div className="p-3 text-center">
                            <h3 className="mb-4">Coming Soon</h3>
                            <div className="mb-3 flex justify-center">
                                <p className="star text-gray-200" />
                                <p className="star text-gray-200" />
                                <p className="star text-gray-200" />
                                <p className="star text-gray-200" />
                                <p className="star text-gray-200" />
                            </div>
                        </div>
                        <div className="p-3 text-center">
                            <div className="py-3">
                                <h3 className="mb-1">More Menus?</h3>
                                <p className="text-xs text-gray-700">???????????? ?????? ?????? ????????? ??????????????????.<br/>?????? ????????? ???????????????!</p>
                            </div>
                            <form className="py-3">
                                <input
                                    className="input"
                                    placeholder="????????? ????????? ???????????????."
                                    type="text"
                                />
                                <button
                                    type="submit"
                                    className="btn btn-light"
                                    // onClick={ ????????? ????????? ??? (???????????? ??????) }
                                >
                                    ????????????
                                </button>
                            </form>
                        </div>
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
