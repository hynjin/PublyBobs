import _ from 'lodash';
import { useCallback, useEffect, Fragment, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as DateHelper from '../helper/DateHelper';
import { Combobox, Transition, Listbox } from '@headlessui/react';

type AddChefProps = {
    date: DateHelper.ConfigType;
    weekNumber: number;
};

export default function AddChefForm(props: AddChefProps): JSX.Element {
    const { date, weekNumber } = props;
    const daysOfWeek = DateHelper.getWeekDayList().slice(1, 6);
    const [chefs, setChefs] = useState<any[]>([]);
    const [chefLists, setChefLists] = useState<any[]>([]);

    const {
        register,
        setValue,
        handleSubmit,
        control,
        formState: { isSubmitting },
    } = useForm({});

    const getChefs = useCallback(async () => {
        const query = `?weekNumber=${weekNumber}`;
        const resultChefs = await fetch(`/api/chefs` + query, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }).then((res) => res.json());
        setChefs(resultChefs);
    }, [weekNumber]);

    useEffect(() => {
        getChefs();
    }, [weekNumber]);

    useEffect(() => {
        const getChefLists = async () => {
            const query = `?type=permission`;
            const resultChefs = await fetch(`/api/users` + query, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            }).then((res) => res.json());
            setChefLists(resultChefs);
        };
        getChefLists();
    }, []);

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

    const ChefComboBox = (
        value: any,
        onChange: any,
        index: number,
        dayName: string
    ) => {
        return (
            <div key={index}>
                <Listbox value={value} onChange={onChange}>
                    <div className="relative">
                        <div className="relative input mb-2 cursor-default overflow-hidden">
                            <span className="block truncate">
                                {value?.name ?? dayName}
                            </span>
                            <Listbox.Button className="absolute inset-0 flex items-center justify-end pr-3 focus:outline-none">
                                <div className="flex flex-col gap-1">
                                    <div className="triangle-up" />
                                    <div className="triangle-down" />
                                </div>
                            </Listbox.Button>
                        </div>
                        <Transition
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options className="absolute w-full border overflow-auto bg-white max-h-56 text-sm z-10 focus:outline-none">
                                {_.map(chefLists, (chef, idx) => (
                                    <div key={`${index}-${idx}-${chef.userId}`}>
                                        {/* TODO: selected 스타일이 적용되지 않는 문제 */}
                                        <Listbox.Option
                                            key={chef._id}
                                            className={({ selected, active }) =>
                                                `cursor-default select-none p-3 text-gray-900 ${selected && 'bg-primary/10'} ${active && 'bg-gray-50'}`
                                            }
                                            value={chef}
                                        >
                                            <span className="block truncate">
                                                {chef.name}
                                            </span>
                                        </Listbox.Option>
                                    </div>
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </div>
                </Listbox>
            </div>
        );
    };

    return (
        <div className="p-3">
            {/* section title */}
            <div className="mb-6">
                <div className="relative h-6 mb-1">
                    <div
                        className="
                        absolute -top-2 -left-4 -rotate-12
                        w-8 h-4 rounded-[32px/16px] bg-primary
                        flex justify-center items-center
                    "
                    >
                        <span className="text-[10px] text-white font-bold leading-none">
                            NOT
                        </span>
                    </div>
                    <h3 className="absolute">Chefs of The Week</h3>
                </div>
                <p className="text-xs text-gray-700">
                    일주일의 주문자를 등록해주세요.
                </p>
            </div>
            <form onSubmit={handleSubmit(onClickAddChef)}>
                {_.map(daysOfWeek, (item, index) => {
                    return (
                        <div key={index}>
                            <Controller
                                control={control}
                                name={`addChef.${index}`}
                                render={({ field: { value, onChange } }) =>
                                    ChefComboBox(value, onChange, index, item)
                                }
                            />
                        </div>
                    );
                })}
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="btn"
                        disabled={isSubmitting}
                    >
                        저장
                    </button>
                </div>
            </form>
        </div>
    );
}
