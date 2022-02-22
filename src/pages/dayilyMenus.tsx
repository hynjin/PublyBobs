import { GetServerSideProps } from 'next';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { XIcon } from '@heroicons/react/outline';
import SelectRestaurant from '../components/SelectRestaurant';
import AddRestaurantForm from '../components/AddRestaurantForm';
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

    const [addDayilyMenus, setAddDayilyMenus] = useState<MenuType[]>();
    const [addNewDaliyMenus, setAddNewDaliyMenus] = useState<MenuType[]>();
    const [newDaliyMenus, setNewDaliyMenus] = useState<
        ({ name: string; description: string } | MenuType)[]
    >([
        {
            name: '',
            description: '',
        },
    ]);

    const onSelectRestaurant = async (select: RestaurantType) => {
        setSelectedRestaurant(select);

        const result = await fetch(`/api/menus/${select._id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        const resultMenus = await result.json();
        setMenusByRestaurantId(resultMenus);
    };

    const onClickAddDayilyMenus = async () => {
        const newAddDayilyMenus = {
            menus: _.mapKeys(addDayilyMenus, '_id'),
            restaurant_id: selectedRestaurant._id,
            restaurant_name: selectedRestaurant.name,
        };
        const res = await fetch('/api/dayilyMenus', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newAddDayilyMenus),
        });
    };

    const onClickAddNewMenus = async (newMenu: {
        name: string;
        description: string;
    }) => {
        const res = await fetch('/api/menus', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...newMenu,
                restaurant_id: selectedRestaurant._id,
            }),
        });
        return res;
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

                            {!selectedRestaurant._id && <AddRestaurantForm />}
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
                                                    setAddDayilyMenus([
                                                        ...(addDayilyMenus ??
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
                        {selectedRestaurant._id &&
                            _.map(newDaliyMenus, (newMenu, index) => {
                                return (
                                    <div className="md:flex md:items-center mb-6">
                                        <div className="w-full">
                                            <button
                                                hidden={
                                                    newDaliyMenus.length !==
                                                    index + 1
                                                }
                                                type="button"
                                                className="disabled:text-gray-300 rounded-md hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                                                onClick={() => {
                                                    setNewDaliyMenus([
                                                        ...(newDaliyMenus ??
                                                            []),
                                                        {
                                                            name: '',
                                                            description: '',
                                                        },
                                                    ]);
                                                }}
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
                                                value={newMenu.name}
                                                onChange={(e) => {
                                                    const newMenus = [
                                                        ...newDaliyMenus,
                                                    ];
                                                    newMenus[index].name =
                                                        e.target.value;
                                                    setNewDaliyMenus(newMenus);
                                                }}
                                            />
                                            <input
                                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded  py-2 px-4 mx-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                                id="add-retaurant-name"
                                                type="text"
                                                placeholder="여기에 메뉴 설명을"
                                                value={newMenu.description}
                                                onChange={(e) => {
                                                    const newMenus = [
                                                        ...newDaliyMenus,
                                                    ];
                                                    newMenus[
                                                        index
                                                    ].description =
                                                        e.target.value;
                                                    setNewDaliyMenus(newMenus);
                                                }}
                                            />
                                            <button
                                                className="disabled:bg-purple-400 shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                                                type="button"
                                                onClick={async () => {
                                                    const result =
                                                        await onClickAddNewMenus(
                                                            newMenu
                                                        );
                                                    const addNew =
                                                        await result.json();

                                                    setAddDayilyMenus([
                                                        ...(addDayilyMenus ??
                                                            []),
                                                        {
                                                            _id: addNew,
                                                            name: newMenu.name,
                                                            description:
                                                                newMenu.description,
                                                            restaurant_id:
                                                                selectedRestaurant._id,
                                                        },
                                                    ]);
                                                }}
                                            >
                                                메뉴 추가
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
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
                            {_.map(addDayilyMenus, (menu, index) => (
                                <div
                                    key={index}
                                    className="relative border-2 rounded-lg"
                                >
                                    <div className="absolute top-0 right-0 -ml-8 pr-2 flex sm:-ml-1">
                                        <button
                                            type="button"
                                            className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                                            onClick={() => {
                                                console.log('+++ menu', menu);
                                                setAddDayilyMenus(
                                                    _.filter(
                                                        addDayilyMenus,
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

                        {selectedRestaurant._id && (
                            <button
                                className="disabled:bg-purple-400 shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                                type="button"
                                onClick={() => {
                                    onClickAddDayilyMenus();
                                }}
                            >
                                오늘의 메뉴 저장
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const baseUrl = `http://${ctx.req.headers.host}`;

    const dayilyMenus = await fetch(baseUrl + '/api/dayilyMenus').then((res) =>
        res.json()
    );
    const menus = await fetch(baseUrl + '/api/menus').then((res) => res.json());
    const restaurants = await fetch(baseUrl + '/api/restaurants').then((res) =>
        res.json()
    );

    return {
        props: {
            dayilyMenus,
            menus,
            restaurants,
        },
    };
};
