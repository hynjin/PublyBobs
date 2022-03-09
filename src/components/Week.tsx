import React, {
    useState,
    useMemo,
    useEffect,
    useRef,
    useCallback,
} from 'react';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import * as DateHelper from '../helper/DateHelper';
import _ from 'lodash';
import { RadioGroup } from '@headlessui/react';
import {
    ArrowNarrowLeftIcon,
    ArrowNarrowRightIcon,
} from '@heroicons/react/outline';

type weekProps = {
    menus: any;
    weekNumber: any;
    setWeekNumber: (d: any) => void;
    selectedDay: any;
    setSelectedDay: (d: any) => void;
};

export default function Week(props: weekProps) {
    const { menus, weekNumber, setWeekNumber, selectedDay, setSelectedDay } =
        props;
    const dayOfWeek = ['월', '화', '수', '목', '금'];

    const wholeDay = useMemo(() => {
        return DateHelper.getWorkDayRangeOfWeek(weekNumber);
    }, [weekNumber]);

    const DayButton = useCallback(() => {
        return (
            <RadioGroup
                value={selectedDay}
                onChange={setSelectedDay}
                className="flex-1 flex gap-8 justify-center"
            >
                {_.map(wholeDay, (day, index) => {
                    const isSameDay = DateHelper.isSameDay(day, selectedDay);
                    return (
                        <RadioGroup.Option key={index} value={day}>
                            <RadioGroup.Label as="div" className="text-center">
                                {/*
                                TODO:
                                공휴일 = bg-transparent text-red-500
                                저녁 없는 날 = 공휴일, 지정한 날짜
                                            opacity 0.4 + 클릭 X (비활성화)
                                */}
                                <p
                                    className={`
                                    mb-1 rounded-full w-10 h-10 flex justify-center items-center text-lg
                                    ${
                                        isSameDay
                                            ? 'bg-primary text-white font-bold'
                                            : 'bg-transparent text-gray-500 hover:bg-primary/10'
                                    }
                                `}
                                >
                                    {DateHelper.getDay(wholeDay[index])}
                                </p>
                                <p
                                    className={`text-xs ${
                                        isSameDay
                                            ? 'text-primary'
                                            : 'text-gray-500'
                                    }`}
                                >
                                    {dayOfWeek[index]}
                                </p>
                            </RadioGroup.Label>
                        </RadioGroup.Option>
                    );
                })}
            </RadioGroup>
        );
    }, [selectedDay, wholeDay]);

    return (
        <div className="p-3 pb-4 flex">
            {/* TODO: 이미 식단이 오픈되어 주문받는 중인 주로는 이동할 수 없음 = 이전 버튼 비활성화 (opacity 0.4) */}
            <button
                type="button"
                className="text-center text-gray-500"
                onClick={() => {
                    setWeekNumber(weekNumber - 1);
                    setSelectedDay(DateHelper.addDay(selectedDay, -7));
                }}
            >
                <ArrowNarrowLeftIcon
                    className="m-2 w-6 h-6"
                    aria-hidden="true"
                />
                <span className="text-xs">이전</span>
            </button>
            {DayButton()}
            <button
                type="button"
                className="text-center text-gray-500"
                onClick={() => {
                    setWeekNumber(weekNumber + 1);
                    setSelectedDay(DateHelper.addDay(selectedDay, +7));
                }}
            >
                <ArrowNarrowRightIcon
                    className="m-2 w-6 h-6"
                    aria-hidden="true"
                />
                <span className="text-xs">다음</span>
            </button>
        </div>
    );
}
