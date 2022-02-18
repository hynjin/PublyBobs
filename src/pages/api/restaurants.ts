import { connectToDatabase } from '../util/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';

export const getRasaurants = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const { db } = await connectToDatabase();

    const restaurants = await db
        .collection('restaurants')
        .find({})
        .limit(200)
        .toArray();

    res.json(restaurants);
};

export const addRasaurants = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    // const {query: {}}
    const { db } = await connectToDatabase();

    const restaurants = await db.collection('restaurants').find({}).limit(200);

    res.json(restaurants);
};
