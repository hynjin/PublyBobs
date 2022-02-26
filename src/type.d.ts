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
    dayilyMenu_id: string;
    order_id: string;
    choose_id: string;
    updated_at: string;
    chef: ChefType;
    date: DateType;
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
