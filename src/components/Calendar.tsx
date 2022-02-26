import React, { useState } from 'react';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import { Calendar, DayValue } from 'react-modern-calendar-datepicker';
import * as DateHelper from '../helper/DateHelper';
import _ from 'lodash';

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
            customDaysClassName={dayRange} //일단 무시
        />
    );
};

export default App;
