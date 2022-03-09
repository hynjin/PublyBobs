import type { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '../../util/mongoose';
import User from '../../models/User';

const getUsers = (params: any) => {
    const { type } = params;

    if (type === 'permission') {
        try {
            return User.find({ permission: true }, {});
        } catch (e) {
            console.log('error at get permission user list');
        }
    }
    try {
        return User.find({}, { date: true, chef: true, order_at: true });
    } catch (e) {
        console.log('error at get chef');
    }
};

export default async function userHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { query, body, method } = req;

    await connectToDatabase();

    switch (method) {
        case 'GET':
            const users = await getUsers(query);
            res.status(200).json(users);
            break;
        case 'POST':
            try {
                const user = await User.create(req.body);
                res.status(201).json({ success: true, data: user });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
