import dayjs, { OpUnitType } from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import localeData from 'dayjs/plugin/localeData';
import relativeTime from 'dayjs/plugin/relativeTime';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import utc from 'dayjs/plugin/utc';
import _ from 'lodash';
import 'dayjs/locale/ko';
import { ArrowNarrowLeftIcon } from '@heroicons/react/outline';

dayjs.extend(advancedFormat);
dayjs.extend(localizedFormat);
dayjs.extend(localeData);
dayjs.extend(relativeTime);
dayjs.extend(weekOfYear);
dayjs.extend(utc);

dayjs.locale('ko');

const DEFAULT_DATE_STRING_FORMAT = 'YYYY-MM-DD HH:mm:ss';

export type ConfigType = dayjs.ConfigType;

export function now() {
    return dayjs();
}

//utc to local
export function getDateByFormat(dateTime: ConfigType = now(), format?: string) {
    return dayjs
        .utc(dateTime)
        .local()
        .format(format ?? DEFAULT_DATE_STRING_FORMAT);
}

export function getUTCDateByFormat(
    dateTime: ConfigType = now(),
    format?: string
) {
    return dayjs.utc(dateTime).format(format ?? DEFAULT_DATE_STRING_FORMAT);
}

export function convertUTCTimeToLocalTime(dateTime: ConfigType = now()) {
    return dayjs.utc(dateTime, DEFAULT_DATE_STRING_FORMAT).local().fromNow();
}

export function toISOString(dateTime: ConfigType = now()) {
    return dayjs(dateTime).toISOString();
}

export function utcToISOString(dateTime: ConfigType = now()) {
    return dayjs.utc(dateTime, DEFAULT_DATE_STRING_FORMAT).toISOString();
}

export function getDiffHourFromNow(dateTime: ConfigType = now()) {
    return dayjs().diff(dateTime, 'hour', true);
}

export function toDate(dateTime: ConfigType = now()) {
    return dayjs(dateTime).toDate();
}

export function getTimestamp(dateTime: ConfigType = now()) {
    return dayjs(dateTime).unix() || 0;
}

export function getStartOf(dateTime: ConfigType = now(), unit: OpUnitType) {
    return dayjs(dateTime).startOf(unit).utc().toISOString();
}

export function getStartOfMonth(dateTime: ConfigType = now()) {
    return getStartOf(dateTime, 'month');
}

export function getStartOfWeek(dateTime: ConfigType = now()) {
    return getStartOf(dateTime, 'week');
}

export function getEndOf(dateTime: ConfigType = now(), unit: OpUnitType) {
    return dayjs(dateTime).endOf(unit).utc().toISOString();
}

export function getEndOfMonth(dateTime: ConfigType = now()) {
    return getEndOf(dateTime, 'month');
}

export function getEndOfWeek(dateTime: ConfigType = now()) {
    return getEndOf(dateTime, 'week');
}

export function getWeekNumber(dateTiem: ConfigType = now()) {
    return dayjs.utc(dateTiem).week();
}
// export function getDateRangeOfWeek(dateTime: ConfigType = now()) {
// 	const week = dayjs(dateTime).week();
//     const mon = dayjs().week(week).startOf('week').add(1, 'd');
//     const fri = dayjs().week(week).startOf('week').add(5, 'd');
export function getDateRangeOfWeek(weekNumber: number) {
    const mon = dayjs.utc().week(weekNumber).startOf('week').add(1, 'd');
    const fri = dayjs.utc().week(weekNumber).startOf('week').add(5, 'd');

    return { mon, fri };
}
export function getWorkDayRangeOfWeek(weekNumber: number) {
    return _.map(_.range(5), (d, i) => {
        return dayjs()
            .utc()
            .week(weekNumber)
            .startOf('week')
            .add(i + 1, 'd');
    });
}

export function getMonday(dateTime: ConfigType = now()) {
    return dayjs(dateTime).startOf('week').add(1, 'd');
}

export function getFriday(dateTime: ConfigType = now()) {
    return dayjs(dateTime).startOf('week').add(5, 'd');
}

export function isStartBeforeEnd(
    startDate: ConfigType = now(),
    endDate: ConfigType = now()
) {
    const start = dayjs(startDate);
    const end = dayjs(endDate);
    return start.isBefore(end);
}

export function isBeforeNow(dateTime: ConfigType = now()) {
    return isStartBeforeEnd(dateTime, dayjs());
}

export function getYear(dateTime: ConfigType = now()) {
    return dayjs(dateTime).year();
}

export function getYearStr(dateTime: ConfigType = now()) {
    return dayjs(dateTime).year().toString();
}

export function setYear(dateTime: ConfigType = now(), year: number | string) {
    return dayjs(dateTime)
        .set('year', Number(year))
        .format(DEFAULT_DATE_STRING_FORMAT);
}

export function getMonth(dateTime: ConfigType = now()) {
    return dayjs(dateTime).month();
}

export function setMonth(dateTime: ConfigType = now(), month: number | string) {
    return dayjs(dateTime)
        .set('month', Number(month))
        .format(DEFAULT_DATE_STRING_FORMAT);
}

export function addDay(dateTime: ConfigType = now(), days: number) {
    return dayjs(dateTime).add(days, 'd');
}

export function getDay(dateTime: ConfigType = now()) {
    return dayjs(dateTime).get('date');
}

export function getDayOfWeek(dateTime: ConfigType = now()) {
    return dayjs(dateTime).day();
}

export function isValid(dateTime?: ConfigType | null) {
    if (_.isNil(dateTime)) {
        return false;
    }
    return dayjs(dateTime).isValid();
}

export function getWeekDayList() {
    return dayjs.weekdays();
}

export function getDateFromPart(props: {
    year: number;
    month: number;
    day: number;
}) {
    return dayjs(props.year + '-' + props.month + '-' + props.day);
}

export function getPartFromDate(dateTime: ConfigType = now()) {
    return {
        year: _.toNumber(dayjs(dateTime).get('y')),
        month: _.toNumber(dayjs(dateTime).get('month')) + 1,
        day: _.toNumber(dayjs(dateTime).get('date')),
    };
}

export function isSameDay(
    firstDate: ConfigType = now(),
    secondDate: ConfigType = now()
) {
    return dayjs(firstDate).isSame(secondDate, 'd');
}
