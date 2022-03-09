import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';
import Menus from './Menu';

const OrderSchema = new mongoose.Schema({
    chef: { _id: ObjectId, name: String, email: String, iamge: String },
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
});

const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema);

export default Order;
