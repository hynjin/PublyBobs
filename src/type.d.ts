declare type UserType = {
    _id: string;
    name: string;
    email: string;
    image: string;
    permission: boolean;
};

declare type RestaurantType = {
    _id: string;
    name: string;
    url: string;
    description: string;
};

declare type MenuType = {
    _id: string;
    name: string;
    description: string;
    restaurant_id: string;
    orderer: [];
};

declare type DayilyMenuType = {
    _id: string;
    restaurant_id: string;
    restaurant_name: string;
    menus: { [id: string]: MenuType };
    chef_id: string;
    updated_ad: string;
};

declare type OrderType = {
    _id: string;
    chef: ChefType;
    date: DateType;
    orders: { restaurant: RestaurantType; menu: MenuType[] }[];
    order_at: Date;
    orderers: {
        [key: string]: {
            userId: string;
            restaurantNumber: string;
            menuNumber: string;
            option: string;
        };
    };
};

declare type ChefType = {
    name: string;
    profile_image: any;
};

declare type DateType = {
    day_of_week: number;
    weekNumber: number;
    year: number;
    month: number;
    day: number;
};
