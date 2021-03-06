import type { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';
import connectToDatabase from '../../util/mongoose';
import Restaurant from '../../models/Restaurant';
import Order from '../../models/Order';
import * as DateHelper from '../../helper/DateHelper';
import _ from 'lodash';

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
    const { selectedDay, order } = params;
    const order_at = DateHelper.getStartOf(selectedDay, 'day');

    try {
        console.log('+++ add order order_at', order_at);
        console.log('+++ add order selectedDay', selectedDay);
        const date = {
            day_of_week: DateHelper.getDayOfWeek(order_at),
            weekNumber: DateHelper.getWeekNumber(order_at),
            year: DateHelper.getYear(order_at),
            month: DateHelper.getMonth(order_at),
            day: DateHelper.getDay(order_at),
        };
        return Order.updateOne(
            { order_at },
            {
                $set: {
                    orders: order,
                    date,
                },
            },
            {
                upsert: true,
                collation: {
                    locale: 'ko',
                    numericOrdering: true,
                },
            }
        );
    } catch (e) {
        console.log('error at add rataurants');
    }
};

const deleteOrder = (restaurant_id: any) => {
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
            const orders = await getOrders(query);
            res.status(200).json(orders);
            break;
        case 'POST':
            console.log('+++ call orders post', body);
            const result = await addOrder(body);
            console.log('+++ result add orders post', result);
            res.status(200).json(result);
            break;
        case 'DELETE':
            const { order_id } = body;
            console.log('+++ call orders delete', order_id);
            await deleteOrder(order_id);
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
