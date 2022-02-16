import { NextApiRequest, NextApiResponse } from 'next';
// import { Post } from "src/Models/index"
import { connectToDatabase } from '../utils/mongoose';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        await connectToDatabase();
        // const posts = await Post.find()
        // res.json(posts)
    } catch (err) {
        console.log(err);
        res.status(500).send('error');
    }
}
