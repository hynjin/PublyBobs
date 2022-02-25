import _ from 'lodash';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import * as DateHelper from '../helper/DateHelper';

type AddChefProps = {
    date: DateHelper.ConfigType;
};

export default function AddChefForm(props: AddChefProps): JSX.Element {
    const { date } = props;
    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm();

    const onClickAddRestaurant = useCallback(async (data: any) => {
        const { daysOfWeek } = data;
        console.log('+++', date);
        await fetch('/api/chefs', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                date: DateHelper.getDay(date),
                chef: daysOfWeek,
            }),
        });
    }, []);

    const daysOfWeek = DateHelper.getWeekDayList().slice(1, 6);

    return (
        <form
            onSubmit={handleSubmit(onClickAddRestaurant)}
            className="lg:mx-auto max-w-xl lg:px-8 mt-4"
        >
            {_.map(daysOfWeek, (item, index) => {
                return (
                    <div key={index} className="md:flex md:items-center mb-6">
                        <section className={'section'} key={index}>
                            <input
                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                id={`add-chef-${index}`}
                                type="text"
                                placeholder={daysOfWeek[index]}
                                {...register(`daysOfWeek[${index}]` as const)}
                            />
                        </section>
                    </div>
                );
            })}
            <button
                className="disabled:bg-purple-400 shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="submit"
                disabled={isSubmitting}
            >
                주문자 추가
            </button>
        </form>
    );
}
