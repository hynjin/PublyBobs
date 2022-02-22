import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';

const DayilyMenuSchema = new mongoose.Schema({
    menus: Object,
    restaurant_id: ObjectId,
    restaurant_name: String,
    updated_at: Date,
    chef_id: ObjectId,
});

const DayilyMenu =
    mongoose.models.DayilyMenu ||
    mongoose.model('DayilyMenu', DayilyMenuSchema);

export default DayilyMenu;
