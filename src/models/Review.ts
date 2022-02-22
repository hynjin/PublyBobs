import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';

const ReviewSchema = new mongoose.Schema({
    name: String,
    email: String,
});

const Review = mongoose.models.Review || mongoose.model('Review', ReviewSchema);

export default Review;
