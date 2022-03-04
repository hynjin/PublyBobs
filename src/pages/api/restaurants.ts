import type { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';
import connectToDatabase from '../../libraries/mongoose';
import Restaurant from '../../models/Restaurant';
import Order from '../../models/Order';
import * as DateHelper from '../../helper/DateHelper';
import _ from 'lodash';

const getRestaurants = (params: any) => {
    const { name } = params;
    try {
        return Restaurant.find(
            {
                name: { $regex: name },
            },
            { name: true, url: true, menus: true }
        );
    } catch (e) {
        console.log('error at get chef');
    }
};

const addRestaurant = (params: any) => {
    const { order } = params;
    try {
        _.map(order, async (o) => {
            console.log('+++ add restaurants post from order', o);
            console.log(
                '+++ add restaurants post from order',
                _.flatten(o.menu)
            );
            return Restaurant.findOneAndUpdate(
                {
                    name: o.restaurant.name,
                },
                {
                    $set: {
                        url: o.restaurant.url,
                    },
                    $addToSet: {
                        menus: { $each: o.menu },
                    },
                },
                {
                    upsert: true,
                }
            );
        });
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
