import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';
import Menus from './Menu';

const OrderSchema = new mongoose.Schema({
    restaurant: { _id: ObjectId, name: String },
    menus: [],
    chef: [],
    order_at: Date,
    day_of_week: String,
    test: String,
});

const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema);

export default Order;
