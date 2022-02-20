import { useState, useEffect } from 'react';
import { connectToDatabase } from './util/mongodb';
import Link from 'next/link';
import { XIcon } from '@heroicons/react/outline';
import SelectRestaurant from '../components/SelectRestaurant';
import _ from 'lodash';
import { PlusIcon } from '@heroicons/react/solid';

type DatypeMenuProps = {
    dayilyMenus: DayilyMenuType[];
    menus: MenuType[];
    restaurants: RestaurantType[];
};

export default function DayilyMenus(props: DatypeMenuProps) {
    const { dayilyMenus, restaurants, menus } = props;

    useEffect(() => {
        restaurants.unshift({
            _id: '',
            name: '직접 추가 ->',
            description: '',
            url: '',
        });
    }, []);
    const restaurantsById = _.mapKeys(restaurants, '_id');
    const [selectedRestaurant, setSelectedRestaurant] = useState<{
        _id: string;
        name: string;
    }>({
        _id: '',
        name: '직접 추가 ->',
    });

    const [menusByRestaurantId, setMenusByRestaurantId] =
        useState<MenuType[]>();

    const [addDaliyMenus, setAddDaliyMenus] = useState<MenuType[]>();
    const [newDaliyMenus, setNewDaliyMenus] =
        useState<({ name: string; description: string } | MenuType)[]>();

    const onSelectRestaurant = async (select: RestaurantType) => {
        setSelectedRestaurant(select);

        const result = await fetch(`/api/menus/${select._id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        const resultMenus = await result.json();
        setMenusByRestaurantId(resultMenus);
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
                        오늘의 메뉴!
                    </p>
                    <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                        오늘의 메뉴를 추가해볼까용
                    </p>
                </div>

                <div className="mt-10">
                    <p className="mt-4 max-w-xl text-2xl text-gray-900 lg:mx-auto lg:text-center">
                        이전에 주문했던 식당을 선택하면 식당의 메뉴를 볼 수
                        있어요
                    </p>

                    <div className="lg:text-center">
                        <SelectRestaurant
                            restaurants={restaurants}
                            selectedRestaurant={selectedRestaurant}
                            setSelectedRestaurant={onSelectRestaurant}
                        />

                        <p className="mt-4 max-w-xl text-2xl text-gray-900 lg:mx-auto lg:text-center">
                            {selectedRestaurant.name}

                            {!selectedRestaurant._id && (
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
                            )}
                        </p>
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
                                                id={`add-menu-${menu._id}`}
                                                className="disabled:bg-purple-400 shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                                                type="button"
                                                onClick={() => {
                                                    setAddDaliyMenus([
                                                        ...(addDaliyMenus ??
                                                            []),
                                                        menu,
                                                    ]);
                                                }}
                                            >
                                                메뉴 추가
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        <div className="md:flex md:items-center mb-6">
                            <div className="w-full">
                                <button
                                    type="button"
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
                                    onClick={() => {
                                        setAddDaliyMenus([
                                            ...(addDaliyMenus ?? []),
                                            {
                                                _id: '',
                                                name: '',
                                                description: '',
                                                restaurant_id: '',
                                            },
                                        ]);

                                        setNewDaliyMenus([
                                            ...(newDaliyMenus ?? []),
                                            {
                                                name: '',
                                                description: '',
                                            },
                                        ]);
                                    }}
                                >
                                    메뉴 추가
                                </button>
                            </div>
                        </div>
                        <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                            {/* <input
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded  py-2 px-4 mx-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            id="add-retaurant-name"
                            type="text"
                            placeholder="여기에 식당 이름을"
                            value={
                                restaurantsById[selectedRestaurant._id]?.name
                            }
                            // onChange={(e) =>
                            //     setRestaurant({
                            //         ...restaurant,
                            //         name: e.target.value,
                            //     })
                            // }
                        /> */}
                            {_.map(addDaliyMenus, (menu, index) => (
                                <div
                                    key={menu._id}
                                    className="relative border-2 rounded-lg"
                                >
                                    <div className="absolute top-0 right-0 -ml-8 pr-2 flex sm:-ml-1">
                                        <button
                                            type="button"
                                            className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                                            onClick={() => {
                                                console.log('+++ menu', menu);
                                                setAddDaliyMenus(
                                                    _.filter(
                                                        addDaliyMenus,
                                                        (v, i) => i !== index
                                                    )
                                                );
                                            }}
                                        >
                                            <XIcon
                                                className="h-6 w-6"
                                                aria-hidden="true"
                                            />
                                        </button>
                                    </div>
                                    <dt>
                                        <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                                            {menu.name}
                                        </p>
                                    </dt>
                                    <dd className="mt-2 ml-16 text-base text-gray-500">
                                        {menu.description}
                                    </dd>
                                </div>
                            ))}
                        </dl>

                        <button
                            className="disabled:bg-purple-400 shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                            type="button"
                        >
                            오늘의 메뉴 저장
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export async function getServerSideProps() {
    const { db } = await connectToDatabase();

    const dayilyMenus = await db
        .collection('dayilyMenus')
        .find({})
        // .limit(20)
        .toArray();

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
            dayilyMenus: JSON.parse(JSON.stringify(dayilyMenus)),
            menus: JSON.parse(JSON.stringify(menus)),
            restaurants: JSON.parse(JSON.stringify(restaurants)),
        },
    };
}
