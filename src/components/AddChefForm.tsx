import _ from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as DateHelper from '../helper/DateHelper';

type AddChefProps = {
    date: DateHelper.ConfigType;
    weekNumber: number;
};

export default function AddChefForm(props: AddChefProps): JSX.Element {
    const { date, weekNumber } = props;
    const daysOfWeek = DateHelper.getWeekDayList().slice(1, 6);
    const [chefs, setChefs] = useState<any[]>([]);

    const {
        register,
        setValue,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm({});

    const getChefs = useCallback(async () => {
        const query = `?weekNumber=${weekNumber}`;
        const result = await fetch(`/api/chefs` + query, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        const resultChefs = await result.json();
        console.log('+++ get chef', resultChefs, weekNumber);
        setChefs(resultChefs);
    }, [weekNumber]);

    useEffect(() => {
        getChefs();
    }, [weekNumber]);

    useEffect(() => {
        _.map(daysOfWeek, (day, i) => {
            setValue(`addChef.${i}`, chefs[i]?.chef);
        });
    }, [chefs]);

    const onClickAddChef = useCallback(
        async (data: any) => {
            const { addChef } = data;
            console.log('+++ click', addChef);
            await fetch('/api/chefs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    date,
                    chefs: addChef,
                    weekNumber: weekNumber,
                }),
            });
        },
        [date]
    );

    return (
        <form
            onSubmit={handleSubmit(onClickAddChef)}
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
                                placeholder={item}
                                {...register(`addChef.${index}`)}
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
                {chefs.length > 0 ? '주문자 변경' : '주문자 추가'}
            </button>
        </form>
    );
}
