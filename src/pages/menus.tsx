import { useState, useEffect } from 'react';
import { connectToDatabase } from '../util/mongodb';
import Link from 'next/link';
import SelectRestaurant from '../components/SelectRestaurant';
import _ from 'lodash';
import { PlusIcon } from '@heroicons/react/solid';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Menus(props: {
    menus: MenuType[];
    restaurants: RestaurantType[];
}) {
    const { menus, restaurants } = props;
    const restaurantsById = _.mapKeys(restaurants, '_id');

    const [selectedRestaurant, setSelectedRestaurant] = useState<{
        _id: string;
        name: string;
    }>({
        _id: '',
        name: '식당을 선택하면 이전에 주문했던 메뉴를 볼 수 있어용',
    });
    const [menusByRestaurantId, setMenusByRestaurantId] =
        useState<MenuType[]>();

    const onSelectRestaurant = async (select: RestaurantType) => {
        setSelectedRestaurant(select);

        const result = await fetch(`/api/menus/${select._id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        const resultMenus = await result.json();
        console.log(resultMenus);
        setMenusByRestaurantId(resultMenus);
    };

    const onClickAddMenus = async (formMenus: MenuType[]) => {
        const res = await fetch('/api/menus', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formMenus),
        });
    };

    return (
        <div className="py-12 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:text-center">
                    <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
                        <Link href="/">
                            <a>
                                <p>뒤로가기</p>
                            </a>
                        </Link>
                    </h2>
                    <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                        메뉴!
                    </p>
                    <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                        메뉴와 설명을 추가해볼까용
                    </p>
                    <SelectRestaurant
                        restaurants={restaurants}
                        selectedRestaurant={selectedRestaurant}
                        setSelectedRestaurant={onSelectRestaurant}
                    />
                    <div className="md:flex md:items-center mb-6">
                        <div className="w-full">
                            <button
                                type="button"
                                disabled
                                className="disabled:text-gray-300 rounded-md hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                                onClick={
                                    () => {}
                                    // onClickDeleteRestaurant(
                                    //     restaurant._id
                                    // )
                                }
                            >
                                <PlusIcon
                                    className="h-6 w-6"
                                    aria-hidden="true"
                                />
                            </button>
                            <input
                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded  py-2 px-4 mx-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                id="add-retaurant-name"
                                type="text"
                                placeholder="여기에 식당 이름을"
                                // value={}
                                // onChange={(e) =>
                                //     setRestaurant({
                                //         ...restaurant,
                                //         name: e.target.value,
                                //     })
                                // }
                            />
                            <input
                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded  py-2 px-4 mx-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                id="add-retaurant-name"
                                type="text"
                                placeholder="여기에 메뉴 이름을"
                                // value={}
                                // onChange={(e) =>
                                //     setRestaurant({
                                //         ...restaurant,
                                //         name: e.target.value,
                                //     })
                                // }
                            />
                            <input
                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded  py-2 px-4 mx-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                id="add-retaurant-name"
                                type="text"
                                placeholder="여기에 메뉴 설명을"
                                // value={}
                                // onChange={(e) =>
                                //     setRestaurant({
                                //         ...restaurant,
                                //         name: e.target.value,
                                //     })
                                // }
                            />
                            <button
                                className="disabled:bg-purple-400 shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                                type="button"
                                disabled={true}
                            >
                                메뉴 저장
                            </button>
                        </div>
                    </div>
                    {menusByRestaurantId &&
                        menusByRestaurantId?.length > 0 &&
                        menusByRestaurantId.map((menu) => {
                            return (
                                <div className="md:flex md:items-center mb-6">
                                    <div className="w-full">
                                        <input
                                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded  py-2 px-4 mx-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                            id="add-retaurant-name"
                                            type="text"
                                            placeholder="여기에 식당 이름을"
                                            value={
                                                restaurantsById[
                                                    menu.restaurant_id
                                                ]?.name
                                            }
                                            // onChange={(e) =>
                                            //     setRestaurant({
                                            //         ...restaurant,
                                            //         name: e.target.value,
                                            //     })
                                            // }
                                        />
                                        <input
                                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded  py-2 px-4 mx-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                            id="add-retaurant-name"
                                            type="text"
                                            placeholder="여기에 메뉴 이름을"
                                            value={menu.name}
                                            // onChange={(e) =>
                                            //     setRestaurant({
                                            //         ...restaurant,
                                            //         name: e.target.value,
                                            //     })
                                            // }
                                        />
                                        <input
                                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded  py-2 px-4 mx-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                            id="add-retaurant-name"
                                            type="text"
                                            placeholder="여기에 메뉴 설명을"
                                            value={menu.description}
                                            // onChange={(e) =>
                                            //     setRestaurant({
                                            //         ...restaurant,
                                            //         name: e.target.value,
                                            //     })
                                            // }
                                        />
                                        <button
                                            className="disabled:bg-purple-400 shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                                            type="button"
                                            disabled={true}
                                        >
                                            메뉴 저장
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                </div>

                <div className="mt-10">
                    <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                        {menus.map((menu) => (
                            <div
                                key={menu.name}
                                className="relative border-2 rounded-lg"
                            >
                                <div className="absolute top-0 right-0 -ml-8 pr-2 flex sm:-ml-1">
                                    <button
                                        type="button"
                                        className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                                        onClick={
                                            () => {}
                                            // onClickDeleteRestaurant(
                                            //     menu._id
                                            // )
                                        }
                                    >
                                        {/* <XIcon
                                            className="h-6 w-6"
                                            aria-hidden="true"
                                        /> */}
                                    </button>
                                </div>
                                <dt>
                                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                                        {menu.name}
                                    </p>
                                </dt>
                                <dd className="mt-2 ml-16 text-base text-gray-500">
                                    {restaurantsById[menu.restaurant_id].name ??
                                        ''}
                                </dd>
                                <dd className="mt-2 ml-16 text-base text-gray-500">
                                    {menu.description === ''
                                        ? '설명이 없당'
                                        : menu.description}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    );
}

export async function getServerSideProps() {
    const { db } = await connectToDatabase();

    const menus = await db
        .collection('menus')
        .find({})
        // .limit(20)
        .toArray();

    const restaurants = await db
        .collection('restaurants')
        .find({})
        // .limit(20)
        .toArray();

    return {
        props: {
            menus: JSON.parse(JSON.stringify(menus)),
            restaurants: JSON.parse(JSON.stringify(restaurants)),
        },
    };
}
