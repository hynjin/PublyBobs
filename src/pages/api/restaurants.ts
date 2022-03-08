import type { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';
import connectToDatabase from '../../util/mongoose';
import Restaurant from '../../models/Restaurant';
import Order from '../../models/Order';
import * as DateHelper from '../../helper/DateHelper';
import _ from 'lodash';

const getRestaurants = (params: any) => {
    const { weekNumber } = params;
    const weekNum = !weekNumber && DateHelper.getWeekNumber();
    const rangeOfWeek = DateHelper.getDateRangeOfWeek(weekNumber ?? weekNum);
    try {
        return Order.find(
            {
                order_at: {
                    $gte: DateHelper.toDate(rangeOfWeek.mon),
                    $lte: DateHelper.toDate(rangeOfWeek.fri),
                },
            },
            { restaurant: true, menus: true }
        ).sort({ 'date.day_of_week': 1 });
    } catch (e) {
        console.log('error at get chef');
    }
};

const addRestaurant = (restaurant: any) => {
    try {
        console.log('+++ add restaurants post', restaurant);
        return Restaurant.create(restaurant);
    } catch (e) {
        console.log('error at add rataurants');
    }
};

const deleteRestaurant = (restaurant_id: any) => {
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
            const restaurants = await getRestaurants(query);
            res.status(200).json(restaurants);
            break;
        case 'POST':
            console.log('+++ call restaurants post');
            const result = await addRestaurant(body);
            console.log('+++ result add restaurants post', result);
            res.status(200).json(result);
            break;
        case 'DELETE':
            const { restaurant_id } = body;
            console.log('+++ call restaurants delete', restaurant_id);
            await deleteRestaurant(restaurant_id);
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
