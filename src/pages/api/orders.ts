import { connectToDatabase } from '../../util/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import _ from 'lodash';
import { ObjectId } from 'mongodb';

const getAllOrders = async (db: any) => {
    return db.collection('orders').find({}).limit(200).toArray();
};

const getAllOrdersByRestaurantsId = async (restaurant_id: any, db: any) => {
    return db.collection('orders').find({ restaurant_id }).limit(200).toArray();
};

const addOrder = async (order: any, db: any) => {
    const id = new ObjectId('620e2e53d60ac2177a6c6ab5');

    try {
        console.log('+++ add orders post', order);
        return db.collection('orders').insertOne({
            ...order,
            dayilyMenu_id: new ObjectId(order.dayilyMenu_id),
            orderer_id: id,
            updated_at: new Date(),
        });
    } catch (e) {
        console.log('error at add menordersus');
    }
};

const deleteOrder = async (memu_id: any, db: any) => {
    try {
        return await db.collection('orders').findOneAndDelete({ _id: memu_id });
    } catch (e) {
        console.log('error at add orders');
    }
};

export default async function ordersHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { query, body, method } = req;
    const { db, client } = await connectToDatabase();

    switch (method) {
        case 'GET':
            const { restaurant_id } = query;
            const orders = await getAllOrdersByRestaurantsId(restaurant_id, db);
            res.status(200).json(orders);
            break;
        case 'POST':
            console.log('+++ call menus post');
            const result = await addOrder(body, db);
            res.status(200).json(result.insertedId);
            break;
        case 'DELETE':
            const { menu_id } = body;
            console.log('+++ call restaurants delete', menu_id);
            await deleteOrder(menu_id, db);
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
    client.close();
    // db.close();
}
