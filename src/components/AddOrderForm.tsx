import _ from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import {
    useForm,
    useFieldArray,
    useWatch,
    Control,
    Controller,
    FormProvider,
} from 'react-hook-form';
import * as DateHelper from '../helper/DateHelper';
import AddRestaurantForm from './AddRestaurantForm';
import AddMenuForm from './AddMenuForm';

type AddOrderProps = {
    selectedDay: string;
    weekNumber: number;
};

export default function AddChefForm(props: AddOrderProps): JSX.Element {
    const { selectedDay, weekNumber } = props;
    const [weekMenus, setWeekMenus] = useState<OrderType[]>([]);
    const [todayMenu, setTodayMenu] = useState<OrderType>();
    const dayNumber = DateHelper.getDayOfWeek(selectedDay) - 1;

    const emptyOrder = {
        restaurant: {
            name: '',
            url: '',
        },
        menu: [
            {
                name: '',
                discription: '',
            },
        ],
    };
    const getWeekMenus = useCallback(async (weekNumber) => {
        const query = `?weekNumber=${weekNumber}`;
        const resultChefs = await fetch(`/api/edit-orders` + query, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }).then((res) => res.json());
        setWeekMenus(resultChefs);
        console.log('+++ weekmenu', weekMenus);
    }, []);

    useEffect(() => {
        getWeekMenus(weekNumber);
    }, [weekNumber]);

    useEffect(() => {
        console.log('+++ todayMenu ???', dayNumber, weekMenus[dayNumber]);
        setTodayMenu(weekMenus[dayNumber]);
        append(weekMenus[dayNumber]?.orders ?? emptyOrder);
    }, [selectedDay, dayNumber]);

    const restaurantFormHandlers = useForm();
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = restaurantFormHandlers;

    const { fields, append, remove } = useFieldArray({
        name: `order`,
        control,
    });

    // const { fields: menufields, append: menuAppend, remove:munuRemove } = useFieldArray({
    //     name: `order.menu`,
    //     control,
    // });

    const onSubmit = (data: any) => console.log('+++ data', data);
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
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
                        onClick={() => append(emptyOrder)}
                    >
                        식당 추가
                    </button>
                    <button
                        type="submit"
                        className="btn"
                        // onClick={ 데이터 저장. 저장하지 않고 다른 이전/다음/설정/GNB메뉴 등을 누르면 저장하라는 alert을 노출 }
                    >
                        저장
                    </button>
                </div>
            </div>
            <div className="px-3 grid grid-cols-3 gap-6">
                {/* <AddRestaurantForm control={control} /> */}
                {fields.map((field, index) => {
                    return (
                        <div key={field.id}>
                            <section className={'section'} key={field.id}>
                                <AddRestaurantForm
                                    control={control}
                                    index={index}
                                />
                                <AddMenuForm control={control} index={index} />
                                <button
                                    type="button"
                                    className="btn"
                                    onClick={() => remove(index)}
                                >
                                    식당 삭제
                                </button>
                            </section>
                        </div>
                    );
                })}
            </div>
        </form>
    );
}
