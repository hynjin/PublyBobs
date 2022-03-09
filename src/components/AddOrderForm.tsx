import _ from 'lodash';
import { useCallback, useEffect, useState, useMemo } from 'react';
import { useForm, useFieldArray, FormProvider } from 'react-hook-form';
import * as DateHelper from '../helper/DateHelper';
import AddRestaurantForm from './AddRestaurantForm';
import AddMenuForm from './AddMenuForm';
import { fetcher, postFetcher } from '../helper/Helper';
import useSWR from 'swr';

type AddOrderProps = {
    selectedDay: string;
    weekNumber: number;
};

export default function AddOrderForm(props: AddOrderProps): JSX.Element {
    const { selectedDay, weekNumber } = props;
    const { data } = useSWR(
        `/api/edit-orders?weekNumber=${weekNumber}`,
        fetcher
    );

    const [weekMenus, setWeekMenus] = useState<_.Dictionary<OrderType>>({});
    const [todayMenu, setTodayMenu] = useState<OrderType>();
    const dayNumber = DateHelper.getDayOfWeek(selectedDay);

    const handlers = useForm();
    const {
        control,
        handleSubmit,
        getFieldState,
        formState: { errors },
        reset,
    } = handlers;

    const { fields, append, remove } = useFieldArray({
        name: `order`,
        control,
    });

    const emptyOrder = {
        restaurant: {
            name: '',
            url: '',
        },
        menu: [
            {
                name: '',
                description: '',
            },
        ],
    };

    const focusOption = useMemo(() => {
        return {
            shouldFocus: true,
            focusName: `order.${fields.length}.restaurant.name`,
        };
    }, [fields.length]);

    useEffect(() => {
        const orders = _.keyBy(data, 'date.day_of_week');
        setWeekMenus(orders);
    }, [data]);

    useEffect(() => {
        setTodayMenu(weekMenus[dayNumber]);
        const resetOrder = async () => {
            await reset();
            weekMenus[dayNumber]?.orders.length > 0
                ? append(weekMenus[dayNumber]?.orders, {
                      shouldFocus: false,
                  })
                : append(emptyOrder, {
                      shouldFocus: false,
                  });
        };
        resetOrder();
    }, [selectedDay, dayNumber, weekMenus]);

    const onClickAddOrder = useCallback(
        async (data: any) => {
            const { order } = data;
            const body = {
                selectedDay,
                order,
            };
            await postFetcher('/api/edit-orders', body);
        },
        [selectedDay]
    );
    return (
        <FormProvider {...handlers}>
            <div className="px-3 py-6 flex items-center">
                <div // TODO: rolling text
                    className="flex-1 text-sm"
                >
                    <p>
                        Tip: 설정에서 주문한 적 있는 식당/메뉴와 주문자 목록을
                        관리할 수 있어요.
                    </p>
                </div>
                <div className="flex gap-2">
                    <button
                        type="button"
                        className="btn btn-ghost"
                        onClick={() => append(emptyOrder, focusOption)}
                    >
                        식당 추가
                    </button>
                    <button
                        type="submit"
                        className="btn"
                        onClick={handleSubmit(onClickAddOrder)} //{ 데이터 저장. 저장하지 않고 다른 이전/다음/설정/GNB메뉴 등을 누르면 저장하라는 alert을 노출 }
                    >
                        저장
                    </button>
                </div>
            </div>
            <div className="py-3 grid grid-cols-3 divide-x divide-gray-100">
                {fields.map((field, index) => {
                    return (
                        <div key={field.id}>
                            <section className="section p-3" key={field.id}>
                                <AddRestaurantForm
                                    control={control}
                                    index={index}
                                    orders={todayMenu?.orders}
                                />
                                <AddMenuForm control={control} index={index} />
                                <button
                                    type="button"
                                    className="mt-8 p-3"
                                    onClick={() => remove(index)}
                                >
                                    식당 삭제
                                </button>
                            </section>
                        </div>
                    );
                })}
            </div>
        </FormProvider>
    );
}
