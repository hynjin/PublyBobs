import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';
import Menus from './Menu';

const OrderSchema = new mongoose.Schema({
    dayilyMenu_id: ObjectId,
    choose_menu: Menus,
    orderer_id: ObjectId,
    updated_at: Date,
});

const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema);

export default Order;
