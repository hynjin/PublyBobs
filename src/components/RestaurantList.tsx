import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import { Fragment, useEffect, useRef, useState } from 'react';
import _ from 'lodash';

type RestaurantListProps = {
    restaurantDetail?: {
        name: string;
        url: string;
        menus: { name: string; description: string }[];
    }[];
    closeList: () => void;
    setRestaurantIndex: (index: number) => void;
    setMenuList: (menu: any) => void;
};
export default function RestaurantList(props: RestaurantListProps) {
    const { restaurantDetail, closeList, setRestaurantIndex, setMenuList } =
        props;

    return (
        <div
        // onBlur={() => {
        //     closeList();
        // }}
        >
            {restaurantDetail &&
                _.map(restaurantDetail, (detail, index) => (
                    <button
                        key={index}
                        className=" appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        onClick={(e) => {
                            e.preventDefault();
                            setRestaurantIndex(index);
                            setMenuList(restaurantDetail[index].menus);
                            closeList();
                        }}
                    >
                        {detail.name}
                    </button>
                ))}
        </div>
    );
}
