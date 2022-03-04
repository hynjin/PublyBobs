import {
    Controller,
    Control,
    FieldValues,
    useFieldArray,
} from 'react-hook-form';
import { Listbox, Transition } from '@headlessui/react';
import { XIcon, SelectorIcon } from '@heroicons/react/solid';
import { Fragment, useEffect, useRef, useState } from 'react';
import _ from 'lodash';

type MenuListProps = {
    control: Control<FieldValues, any>;
    index: number;
    menus?: { name: string; description: string }[];
    // onClickList: () => void;
};
export default function MenuList(props: MenuListProps) {
    const { index, menus, control } = props;

    const { append } = useFieldArray({
        name: `order.${index}.menu`,
        control,
    });

    return (
        <>
            {_.map(menus, (menu, idx) => (
                <button
                    key={idx}
                    className=" appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    onClick={() => {
                        append(menu);
                    }}
                >
                    <p>{menu.name}</p>
                    <p>{menu.description}</p>
                    <XIcon className=" h-4 w-4" />
                </button>
            ))}
        </>
    );
}
