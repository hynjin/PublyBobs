import type { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';
import connectToDatabase from '../../util/mongoose';
import Order from '../../models/Order';
import _ from 'lodash';
import * as DateHelper from '../../helper/DateHelper';

const getAllOrders = () => {
    return Order.find({}).limit(200);
};

const getOrders = async (params: any) => {
    const { weekNumber } = params;
    const weekNum = !weekNumber && DateHelper.getWeekNumber();
    const rangeOfWeek = DateHelper.getDateRangeOfWeek(weekNumber ?? weekNum);
    try {
        const data = await Order.find(
            {
                order_at: {
                    $gte: DateHelper.toDate(rangeOfWeek.mon),
                    $lte: DateHelper.toDate(rangeOfWeek.fri),
                },
            },
            { orders: true, date: true, orderers: true }
        ).sort({ 'date.day_of_week': 1 });
        return _.keyBy(data, 'date.day_of_week');
    } catch (e) {
        console.log('error at get chef');
    }
};

const addOrder = (params: any) => {
    const { selectedDay, order, userId, option } = params;
    const objectUserId = new ObjectId(userId);
    const order_at = DateHelper.getStartOf(selectedDay, 'day');

    try {
        return Order.findOneAndUpdate(
            { order_at },
            {
                $set: {
                    [`orderers.${userId}`]: {
                        userId: objectUserId,
                        restaurantNumber: order[0],
                        menuNumber: order[1],
                        option,
                    },
                },
            },
            {
                upsert: true,
            }
        );
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
            const orders = await getOrders(query);
            res.status(200).json(orders);
            break;
        case 'POST':
            console.log('+++ call menus post');
            const result = await addOrder(body);
            res.status(200).json(result);
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
