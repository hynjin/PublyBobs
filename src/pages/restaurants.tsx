import { connectToDatabase } from '../util/mongodb';
import Link from 'next/link';
import AddRestaurantForm from '../components/AddRestaurantForm';
import { XIcon } from '@heroicons/react/outline';
import _ from 'lodash';

export default function Restaurants(props: { restaurants: RestaurantType[] }) {
    const { restaurants } = props;

    const onClickDeleteRestaurant = async (restaurant_id: string) => {
        const res = await fetch('/api/restaurants', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ restaurant_id }),
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
                        식당!
                    </p>
                    <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                        식당을 추가해볼까용
                    </p>
                    <AddRestaurantForm />
                </div>

                <div className="mt-10">
                    <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                        {_.map(restaurants, (restaurant) => (
                            <div
                                key={restaurant.name}
                                className="relative border-2 rounded-lg"
                            >
                                <div className="absolute top-0 right-0 -ml-8 pr-2 flex sm:-ml-1">
                                    <button
                                        type="button"
                                        className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                                        onClick={() =>
                                            onClickDeleteRestaurant(
                                                restaurant._id
                                            )
                                        }
                                    >
                                        <XIcon
                                            className="h-6 w-6"
                                            aria-hidden="true"
                                        />
                                    </button>
                                </div>
                                <dt>
                                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                                        {restaurant.name}
                                    </p>
                                </dt>
                                <dd className="mt-2 ml-16 text-base text-gray-500">
                                    {restaurant.description === ''
                                        ? '설명이 없당'
                                        : restaurant.description}
                                </dd>
                                <dd className="mt-2 ml-16 text-base text-gray-500">
                                    {restaurant.url === ''
                                        ? 'url이 없당'
                                        : restaurant.url}
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

    const result = await fetch('http://localhost:3003//api/restaurants');
    const restaurants = await result.json();

    return {
        props: {
            restaurants: JSON.parse(JSON.stringify(restaurants)),
        },
    };
}
