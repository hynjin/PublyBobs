import { connectToDatabase } from '../util/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { db } = await connectToDatabase();

    const restaurants = await db.collection('restaurants').find({}).limit(200);

    res.json(restaurants);
};
