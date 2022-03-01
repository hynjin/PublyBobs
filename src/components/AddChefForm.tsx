import _ from 'lodash';
import { Fragment, useCallback, useEffect, useState } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
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

    const [selected, setSelected] = useState(chefs[0]);

    return (
        <form onSubmit={handleSubmit(onClickAddChef)} className="text-center">
            {_.map(daysOfWeek, (item, index) => {
                return (
                    // TODO: combobox로 바꾸기
                    <div key={index} className="flex-1 mb-2">
                        <section className={'section'} key={index}>
                            <input
                                className=""
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
                className="btn btn-ghost"
                type="submit"
                disabled={isSubmitting}
            >
                {chefs.length > 0 ? '주문자 변경' : '주문자 추가'}
            </button>
        </form>
    );
}
