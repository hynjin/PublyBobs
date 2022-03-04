import { Controller, Control, FieldValues, useWatch } from 'react-hook-form';
import _ from 'lodash';
import { useCallback, useState, useEffect, useMemo } from 'react';
import RestaurantList from './RestaurantList';
import MenuList from './MenuList';

type AddRestaurantFormProps = {
    control: Control<FieldValues, any>;
    index: number;
    orders: any;
};

export default function AddRestaurantForm(props: AddRestaurantFormProps) {
    const { control, index, orders } = props;
    //기존 메뉴 불러오기... 구조상 문제 심각...
    // const [showList, setShowList] = useState(false);

    // const restaurantName = useWatch({
    //     name: `order.${index}.restaurant.name`,
    //     control,
    // });
    // const [restaurantDetail, setRestaurantDetail] = useState<
    //     {
    //         name: string;
    //         url: string;
    //         menus: { name: string; description: string }[];
    //     }[]
    // >();
    // const [menuList, setMenuList] =
    //     useState<{ name: string; description: string }[]>();
    // const [restaurantIndex, setRestaurantIndex] = useState(-1);

    // const fetchRestaurantDetail = async () => {
    //     const result = await fetch(`/api/restaurants?name=${restaurantName}`, {
    //         method: 'GET',
    //         headers: { 'Content-Type': 'application/json' },
    //     }).then((res) => res.json());
    //     setRestaurantDetail(result);
    // };

    // const debounceGetRestaurantDetail = useMemo(
    //     () => _.debounce(fetchRestaurantDetail, 500),
    //     [restaurantName, setRestaurantDetail]
    // );

    // useEffect(() => {
    //     debounceGetRestaurantDetail();

    //     return () => debounceGetRestaurantDetail?.cancel();
    // }, [restaurantName]);

    return (
        <>
            <div key={`add-restaurant-${index}`}>
                <div className="mb-6">
                    <Controller
                        control={control}
                        name={`order.${index}.restaurant.name`}
                        render={({ field }) => (
                            <input
                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                type="text"
                                placeholder="식당 이름"
                                autoFocus={false}
                                {...field}
                                // onFocus={() => {
                                //     setShowList(true);
                                // }}
                            />
                        )}
                    />
                </div>
                {/* {showList && restaurantDetail && restaurantDetail?.length > 0 && (
                    <RestaurantList
                        restaurantDetail={restaurantDetail}
                        setRestaurantIndex={(index: number) => {
                            setRestaurantIndex(index);
                        }}
                        setMenuList={(menus: any) => {
                            setMenuList(menus);
                        }}
                        closeList={() => {
                            setShowList(false);
                        }}
                    />
                )} */}
            </div>
            {/* {restaurantDetail && restaurantDetail?.length > 0 && (
                <MenuList index={index} menus={menuList} control={control} />
            )} */}
            <div className="mb-6">
                <Controller
                    control={control}
                    name={`order.${index}.restaurant.url`}
                    render={({ field }) => (
                        <input
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            type="text"
                            placeholder="URL"
                            autoFocus={false}
                            {...field}
                        />
                    )}
                />
            </div>
        </>
    );
}
