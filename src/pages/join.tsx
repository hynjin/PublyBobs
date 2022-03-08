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
import AddRestaurantForm from '../components/AddRestaurantForm';
import AddOrderFrom from '../components/AddOrderForm';
import { GuestDropdown } from '../components/GuestDropdown';

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
                        <p>
                            퍼블리 저녁식사 신청 시스템
                            <br />
                            퍼블리 밥스 오픈베타
                        </p>
                    </div>
                    <h1>Publy Bobs</h1>
                    <GuestDropdown />
                </div>
                <div className="p-3 text-center">
                    <span>저녁 걱정 덜어주기 제도를 더 알고 싶다면?</span>
                    <a
                        className="pl-2 text-primary underline"
                        target="_blank"
                        href="https://publyco.atlassian.net/wiki/spaces/all/pages/2852257793/-"
                    >
                        자세히보기
                    </a>
                </div>
            </div>
            <div className="py-[80px] flex-1 flex flex-col items-center">
                <div className="w-full max-w-xs">
                    <form>
                        <label>이름</label>
                        <input
                            className="input"
                            type="text"
                            placeholder={'김밥스'}
                        />
                        <p className="description">
                            * flex에 등록된 이름을 적어주세요.
                        </p>
                    </form>
                    <form>
                        <label>이메일</label>
                        <div className="input flex">
                            <input
                                className="flex-1"
                                type="text"
                                placeholder={'email'}
                            />
                            <span>@publy.co</span>
                        </div>
                        <p className="description">
                            * flex에 등록된 이메일을 적어주세요.
                        </p>
                    </form>
                    <form>
                        <label>비밀번호</label>
                        <input
                            className="input"
                            type="password"
                            placeholder={'●●●●●●'}
                        />
                        {/* 조건을 충족하지 않을 경우 각각에 error 클래스 추가 (카피 그대로) */}
                        <p className="description">
                            * 영문과 숫자를 모두 포함해주세요.
                        </p>
                        <p className="description">
                            * 6자 이상으로 만들어주세요.
                        </p>
                    </form>
                    <form>
                        <label>비밀번호 확인</label>
                        <input
                            className="input"
                            type="password"
                            placeholder={'●●●●●●'}
                        />
                        {/* 조건을 충족하지 않을 경우 error 클래스 추가 (카피 그대로) */}
                        <p className="description">
                            * 비밀번호를 다시 입력해주세요.
                        </p>
                    </form>
                </div>
                <button type="submit" className="mx-auto btn">
                    회원가입
                </button>
            </div>
        </div>
    );
}
