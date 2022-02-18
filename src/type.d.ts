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
    menus: string[];
    chef_id: string;
    updated_ad: string;
};

declare type OrderType = {
    _id: string;
    dayilyMenu_id: string;
    order_id: string;
    choose_id: string;
    updated_at: string;
};
