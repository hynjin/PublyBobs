import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';
import Menus from './Menu';

type OrdererType = {
    userId: ObjectId;
    restaurantNumber: String;
    menuNumber: String;
    option: String;
};
const OrderSchema = new mongoose.Schema({
    // restaurant: { _id: ObjectId, name: String, url: String },
    // menus: [],
    chef: { _id: ObjectId, name: String, profile_image: String },
    orders: [],
    order_at: Date,
    date: {
        day_of_week: Number,
        weekNumber: Number,
        year: Number,
        month: Number,
        day: Number,
    },
    orderers: {},
    // {
    //     order : {
    //         userId: ObjectId,
    //         restaurantNumber: String,
    //         menuNumber: String,
    //         option: String,
    //     },
    // },
});

const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema);

export default Order;
