import { connectToDatabase } from '../../utils/mongodb';

export default async (req, res) => {
    const { db } = await connectToDatabase();

    const movies = await db
        .collection('movies')
        .find({})
        .sort({ metacritic: -1 })
        .limit(200)
        .toArray();

    res.json(movies);
};
