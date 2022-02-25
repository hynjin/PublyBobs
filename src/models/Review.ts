import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';

const ReviewSchema = new mongoose.Schema({
    name: String,
    email: String,
    order_history: [],
});

const Review = mongoose.models.Review || mongoose.model('Review', ReviewSchema);

export default Review;
