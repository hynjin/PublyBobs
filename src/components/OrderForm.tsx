import _ from 'lodash';
import { useCallback, useEffect, useState, useMemo } from 'react';
import { useForm, useFieldArray, FormProvider } from 'react-hook-form';
import * as DateHelper from '../helper/DateHelper';
import AddMenuForm from './AddMenuForm';
import { useSession } from 'next-auth/react';

type AddOrderProps = {
    selectedDay: string;
    weekNumber: number;
};

export default function OrderForm(props: AddOrderProps): JSX.Element {
    const { data: session } = useSession();
    const user = session?.user;

    const { selectedDay, weekNumber } = props;
    const [weekMenus, setWeekMenus] = useState<_.Dictionary<OrderType>>({});
    const [todayMenu, setTodayMenu] = useState<OrderType>();
    const dayNumber = DateHelper.getDayOfWeek(selectedDay);

    const handlers = useForm();
    const {
        handleSubmit,
        getFieldState,
        register,
        setValue,
        formState: { errors },
    } = handlers;

    const getWeekMenus = useCallback(async (weekNumber) => {
        const query = `?weekNumber=${weekNumber}`;
        const resultOrder = await fetch(`/api/orders` + query, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }).then((res) => res.json());
        const orders = _.keyBy(resultOrder, 'date.day_of_week');
        setWeekMenus(orders);
    }, []);

    useEffect(() => {
        getWeekMenus(weekNumber);
    }, [weekNumber]);

    useEffect(() => {
        const today = weekMenus[dayNumber];
        setTodayMenu(today);
    }, [selectedDay, dayNumber, weekMenus]);

    const onClickOrder = useCallback(
        async (data: any) => {
            const order = _.split(data?.order, '-');

            await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    selectedDay,
                    order,
                    userId: user?.userId,
                    option: data?.option,
                }),
            });
        },
        [selectedDay, user]
    );
    return (
        <FormProvider {...handlers}>
            <div className="px-3 gap-6">
                {_.map(todayMenu?.orders, (orders, index) => {
                    return (
                        <div key={`restaurant-list-${index}`}>
                            {orders?.restaurant.name}
                            {_.map(orders?.menu, (menu: any, idx: number) => {
                                return (
                                    <div
                                        key={`menu-list-${index}-${idx}`}
                                        className="input mb-2"
                                    >
                                        <input
                                            id={`menu-list-${index}-${idx}`}
                                            type="radio"
                                            value={`${index}-${idx}`}
                                            {...register(`order`)}
                                        />
                                        <label
                                            className="radio-label text-xs"
                                            htmlFor={`menu-list-${index}-${idx}`}
                                        >
                                            {menu.name}
                                        </label>
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
                <input
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    type="text"
                    {...register('option')}
                />
                <div className="px-3 py-6 flex items-center">
                    <div className="flex gap-2">
                        <button
                            type="submit"
                            className="btn"
                            onClick={handleSubmit(onClickOrder)} //{ 데이터 저장. 저장하지 않고 다른 이전/다음/설정/GNB메뉴 등을 누르면 저장하라는 alert을 노출 }
                        >
                            주문하기
                        </button>
                    </div>
                </div>
            </div>
        </FormProvider>
    );
}
