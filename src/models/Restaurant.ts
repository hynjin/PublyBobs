import mongoose from 'mongoose';

const RestaurantSchema = new mongoose.Schema({
    name: String,
    url: String,
    menus: [],
});

const Restaurant =
    mongoose.models.Restaurant ||
    mongoose.model('Restaurant', RestaurantSchema);

export default Restaurant;
