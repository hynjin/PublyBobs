import _ from 'lodash';
import { useCallback, useEffect, Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as DateHelper from '../helper/DateHelper';
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'

type AddChefProps = {
    date: DateHelper.ConfigType;
    weekNumber: number;
};

const people = [
    { id: 1, name: '소리' },
    { id: 2, name: '솔' },
    { id: 3, name: '종혁' },
    { id: 4, name: '윤하' },
    { id: 5, name: '서륜' },
    { id: 6, name: '현선' },
    { id: 7, name: '민지' },
    { id: 8, name: '은지' },
]

export default function AddChefForm(props: AddChefProps): JSX.Element {
    const { date, weekNumber } = props;
    const daysOfWeek = DateHelper.getWeekDayList().slice(1, 6);
    const [chefs, setChefs] = useState<any[]>([]);

    const [selected, setSelected] = useState(people[0])
    const [query, setQuery] = useState('')

    const filteredPeople =
        query === ''
            ? people
            : people.filter((person) =>
                person.name
                    .toLowerCase()
                    .replace(/\s+/g, '')
                    .includes(query.toLowerCase().replace(/\s+/g, ''))
        );

    const {
        register,
        setValue,
        handleSubmit,
        formState: { isSubmitting, isSubmitted },
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
            {/* combobox sample */}
            <Combobox value={selected} onChange={setSelected}>
                <div className="relative">
                    <div className="relative input mb-2 cursor-default focus:outline-none overflow-hidden">
                        <Combobox.Input
                            className="w-full border-none focus:ring-0 pr-10 text-sm text-gray-900"
                            displayValue={(person) => person.name}
                            onChange={(event) => setQuery(event.target.value)}
                        />
                        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-3">
                            <div className="flex flex-col gap-1">
                                <div className="triangle-up" />
                                <div className="triangle-down" />
                            </div>
                        </Combobox.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setQuery('')}
                    >
                        <Combobox.Options className="absolute w-full border overflow-auto bg-white max-h-56 text-sm">
                            {filteredPeople.length === 0 && query !== '' ? (
                                <p className="cursor-default select-none relative px-3 py-4 text-gray-500">
                                    주문자로 등록되어있지 않아요.
                                </p>
                            ) : (
                                filteredPeople.map((person) => (
                                <Combobox.Option
                                    key={person.id}
                                    className={({ selected, active }) =>`cursor-default select-none p-3 ${active && 'bg-gray-50'} ${selected && 'bg-secondary'}`}
                                    value={person}
                                >
                                    <span className="block truncate">{person.name}</span>
                                </Combobox.Option>
                            ))
                        )}
                        </Combobox.Options>
                    </Transition>
                </div>
            </Combobox>
            <form onSubmit={handleSubmit(onClickAddChef)}>
                {_.map(daysOfWeek, (item, index) => {
                    return (
                        // TODO: combobox로 바꾸기
                        <div key={index} className="input mb-2">
                            <input
                                id={`add-chef-${index}`}
                                type="text"
                                placeholder={item}
                                {...register(`addChef.${index}`)}
                            />
                        </div>
                    );
                })}
            </form>
            <div className="flex justify-center">
                <button
                    type="submit"
                    className="btn"
                    disabled={isSubmitting}
                >
                    저장
                </button>
            </div>
        </div>
    );
}
