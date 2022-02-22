import { GetServerSideProps } from 'next';
import { connectToDatabase } from '../util/mongodb';
import Link from 'next/link';
import _ from 'lodash';
import { useState } from 'react';

type OderProps = {
    dayilyMenus: DayilyMenuType;
};

export default function Orders(props: OderProps) {
    const { dayilyMenus } = props;
    const [selectMenu, setSelectMenu] = useState<MenuType>();

    const onClickOrder = async () => {
        const result = await fetch(`/api/orders`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                dayilyMenu_id: dayilyMenus._id,
                choose_menu: selectMenu,
            }),
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
                        주문!
                    </p>
                    <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                        오늘의 메뉴를 보고 주문해보아용
                    </p>
                    {/* <AddRestaurantForm /> */}
                </div>

                <div className="mt-10">
                    <p className="mt-4 max-w-xl text-2xl text-gray-900 lg:mx-auto lg:text-center">
                        {dayilyMenus?.restaurant_name}
                    </p>
                    <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                        <div className="flex justify-center">
                            <div>
                                {_.map(dayilyMenus.menus, (menu) => (
                                    <div
                                        key={menu._id}
                                        className="relative border-2 rounded-lg"
                                    >
                                        <div className="form-check">
                                            <input
                                                className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                                type="radio"
                                                name="flexRadioDefault"
                                                id="flexRadioDefault1"
                                                onChange={() =>
                                                    setSelectMenu(menu)
                                                }
                                            />
                                            <label
                                                className="form-check-label inline-block text-gray-800"
                                                htmlFor="flexRadioDefault1"
                                            >
                                                {menu.name}
                                                <p>{menu.description}</p>
                                            </label>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <button
                            className="disabled:bg-purple-400 shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                            type="button"
                            onClick={() => {
                                onClickOrder();
                            }}
                        >
                            주문
                        </button>
                    </dl>
                </div>
            </div>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const baseUrl = `http://${ctx.req.headers.host}`;

    const result = await fetch(baseUrl + '/api/dayilyMenus');
    const dayilyMenus = await result.json();

    // let yesterDay = new Date();
    // yesterDay.setDate(yesterDay.getDate() - 1);
    // const dayilyMenus = await db.dayilyMenus.findOne({
    //     updated_at: { $gt: yesterDay },
    // });
    // .limit(20)
    // .toArray();

    return {
        props: {
            dayilyMenus,
        },
    };
};
