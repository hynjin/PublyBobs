import type { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';
import connectToDatabase from '../../util/mongoose';
import Order from '../../models/Order';
import _ from 'lodash';

const getAllOrders = () => {
    return Order.find({}).limit(200);
};

const getAllOrdersByRestaurantsId = (restaurant_id: any) => {
    return Order.find({ restaurant_id }).limit(200);
};

const addOrder = (order: any) => {
    const id = new ObjectId('620e2e53d60ac2177a6c6ab5');

    try {
        console.log('+++ add orders post', order);
        return Order.create({
            ...order,
            dayilyMenu_id: new ObjectId(order.dayilyMenu_id),
            orderer_id: id,
            updated_at: new Date(),
        });
    } catch (e) {
        console.log('error at add menordersus');
    }
};

const deleteOrder = (memu_id: any) => {
    try {
        return Order.findOneAndDelete({ _id: memu_id });
    } catch (e) {
        console.log('error at add orders');
    }
};

export default async function ordersHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { query, body, method } = req;

    await connectToDatabase();

    switch (method) {
        case 'GET':
            const { restaurant_id } = query;
            const orders = await getAllOrdersByRestaurantsId(restaurant_id);
            res.status(200).json(orders);
            break;
        case 'POST':
            console.log('+++ call menus post');
            const result = await addOrder(body);
            res.status(200).json(result.insertedId);
            break;
        case 'DELETE':
            const { menu_id } = body;
            console.log('+++ call restaurants delete', menu_id);
            await deleteOrder(menu_id);
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
