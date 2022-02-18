import { useState, useEffect } from 'react';

export default function AddRestaurantForm() {
    const [restaurant, setRestaurant] = useState({
        name: '',
        url: '',
        description: '',
    });

    const onClickAddRestaurant = async () => {
        const res = await fetch('/api/restaurants', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(restaurant),
        });
    };

    return (
        <form
            className="lg:mx-auto max-w-xl lg:px-8 mt-4"
            onSubmit={onClickAddRestaurant}
        >
            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/4">
                    <label
                        className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                        htmlFor="add-retaurant-name"
                    >
                        식당 이름
                    </label>
                </div>
                <div className="md:w-2/4">
                    <input
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="add-retaurant-name"
                        type="text"
                        placeholder="여기에 식당 이름을"
                        value={restaurant.name}
                        onChange={(e) =>
                            setRestaurant({
                                ...restaurant,
                                name: e.target.value,
                            })
                        }
                    />
                </div>
            </div>
            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/4">
                    <label
                        className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                        htmlFor="add-retaurant-url"
                    >
                        URL
                    </label>
                </div>
                <div className="md:w-2/4">
                    <input
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="add-retaurant-url"
                        type="text"
                        placeholder="여기에 식당 url을"
                        value={restaurant.url}
                        onChange={(e) =>
                            setRestaurant({
                                ...restaurant,
                                url: e.target.value,
                            })
                        }
                    />
                </div>
            </div>
            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/4">
                    <label
                        className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                        htmlFor="add-retaurant-description"
                    >
                        식당 설명
                    </label>
                </div>
                <div className="md:w-2/4">
                    <input
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="add-retaurant-description"
                        type="text"
                        placeholder="여기에 식당 설명을"
                        value={restaurant.description}
                        onChange={(e) =>
                            setRestaurant({
                                ...restaurant,
                                description: e.target.value,
                            })
                        }
                    />
                </div>
            </div>
            <div className="md:flex md:items-center">
                <div className="md:w-1/4"></div>
                <div className="md:w-2/4">
                    <button
                        className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                        type="submit"
                    >
                        식당 추가
                    </button>
                </div>
            </div>
        </form>
    );
}
