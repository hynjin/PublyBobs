import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';

const MenuSchema = new mongoose.Schema({
    name: String,
    description: String,
    restaurant_id: ObjectId,
    updated_ad: Date,
});

const Menu = mongoose.models.Menu || mongoose.model('Menu', MenuSchema);

export default Menu;
