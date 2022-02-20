import { connectToDatabase } from '../../util/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';

const getAllRestaurants = async (db: any) => {
    return db.collection('restaurants').find({}).limit(200).toArray();
};

const addRestaurant = async (restaurant: any, db: any) => {
    try {
        console.log('+++ add restaurants post', restaurant);
        return await db.collection('restaurants').insertOne(restaurant);
    } catch (e) {
        console.log('error at add rataurants');
    }
};

const deleteRestaurant = async (restaurant_id: any, db: any) => {
    try {
        console.log('+++ delete restaurants post', restaurant_id);
        return await db
            .collection('restaurants')
            .findOneAndDelete({ _id: new ObjectId(restaurant_id) });
    } catch (e) {
        console.log('error at add rataurants');
    }
};

export default async function restaurantHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { query, body, method } = req;
    const { db, client } = await connectToDatabase();

    switch (method) {
        case 'GET':
            const restaurants = getAllRestaurants(db);
            res.status(200).json(restaurants);
            break;
        case 'POST':
            console.log('+++ call restaurants post');
            const result = await addRestaurant(body, db);
            console.log('+++ result add restaurants post', result);
            res.status(200).json(result);
            break;
        case 'DELETE':
            const { restaurant_id } = body;
            console.log('+++ call restaurants delete', restaurant_id);
            await deleteRestaurant(restaurant_id, db);
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
    client.close();
}
