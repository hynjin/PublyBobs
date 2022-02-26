import React, {
    useState,
    useMemo,
    useEffect,
    useRef,
    useCallback,
} from 'react';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import { Calendar, DayValue } from 'react-modern-calendar-datepicker';
import * as DateHelper from '../helper/DateHelper';
import _ from 'lodash';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { RadioGroup } from '@headlessui/react';

type weekProps = {
    menus: any;
    weekNumber: any;
    setWeekNumber: (d: any) => void;
    selectedDay: any;
    setSelectedDay: (d: any) => void;
};

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

export default function Week(props: weekProps) {
    const { menus, weekNumber, setWeekNumber, selectedDay, setSelectedDay } =
        props;
    const dayOfWeek = ['월', '화', '수', '목', '금'];

    const wholeDay = useMemo(() => {
        return DateHelper.getWorkDayRangeOfWeek(weekNumber);
    }, [weekNumber]);

    const DayButton = () => {
        return (
            <div className="inline-block px-2">
                <RadioGroup
                    value={selectedDay}
                    onChange={setSelectedDay}
                    className="mt-2"
                >
                    <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                        {_.map(wholeDay, (day, index) => {
                            return (
                                <RadioGroup.Option
                                    key={index}
                                    value={day}
                                    className={({ checked }) =>
                                        classNames(
                                            checked
                                                ? ' text-white border-indigo-500 bg-gray-50'
                                                : 'bg-white border-gray-200 text-gray-900 ',
                                            'border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1'
                                        )
                                    }
                                >
                                    <RadioGroup.Label as="div">
                                        <>
                                            <div className="font-medium text-gray-900">
                                                {DateHelper.getDay(
                                                    wholeDay[index]
                                                )}
                                            </div>
                                            <div className="ml-1 text-gray-500 sm:ml-0">
                                                {dayOfWeek[index]}
                                            </div>
                                        </>
                                    </RadioGroup.Label>
                                </RadioGroup.Option>
                            );
                        })}
                    </div>
                </RadioGroup>
            </div>
        );
    };

    return (
        <div className="flex space-x-2 justify-center">
            <div>
                <button
                    type="button"
                    className="inline-block px-6 py-2.5 bg-gray-200 text-gray-700 font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out"
                    onClick={() => {
                        setWeekNumber(weekNumber - 1);
                        setSelectedDay(DateHelper.addDay(selectedDay, -7));
                    }}
                >
                    <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                </button>
                {DayButton()}
                <button
                    type="button"
                    className="inline-block px-6 py-2.5 bg-gray-200 text-gray-700 font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out"
                    onClick={() => {
                        setWeekNumber(weekNumber + 1);
                        setSelectedDay(DateHelper.addDay(selectedDay, +7));
                    }}
                >
                    <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                </button>
            </div>
        </div>
    );
}
