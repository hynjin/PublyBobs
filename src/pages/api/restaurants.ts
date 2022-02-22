import type { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';
import connectToDatabase from '../../libraries/mongoose';
import Restaurant from '../../models/Restaurant';

const getAllRestaurants = () => {
    return Restaurant.find({}).limit(200);
};

const addRestaurant = (restaurant: any) => {
    try {
        console.log('+++ add restaurants post', restaurant);
        return Restaurant.create(restaurant);
    } catch (e) {
        console.log('error at add rataurants');
    }
};

const deleteRestaurant = (restaurant_id: any) => {
    try {
        console.log('+++ delete restaurants post', restaurant_id);
        return Restaurant.findOneAndDelete({
            _id: new ObjectId(restaurant_id),
        });
    } catch (e) {
        console.log('error at add rataurants');
    }
};

export default async function restaurantHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { query, body, method } = req;

    await connectToDatabase();

    switch (method) {
        case 'GET':
            const restaurants = await getAllRestaurants();
            res.status(200).json(restaurants);
            break;
        case 'POST':
            console.log('+++ call restaurants post');
            const result = await addRestaurant(body);
            console.log('+++ result add restaurants post', result);
            res.status(200).json(result);
            break;
        case 'DELETE':
            const { restaurant_id } = body;
            console.log('+++ call restaurants delete', restaurant_id);
            await deleteRestaurant(restaurant_id);
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
