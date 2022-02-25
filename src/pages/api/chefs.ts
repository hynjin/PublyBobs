import type { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '../../libraries/mongoose';
import Order from '../../models/Order';
import * as DateHelper from '../../helper/DateHelper';
import _ from 'lodash';

// 오늘의 주문을 담당한 쉐프!
// 날짜별로 지정
const getChef = (prams: any) => {
    const { weekAgo = 0 } = prams;

    const startOfWeek = DateHelper.getDateRangeOfWeek(weekAgo);
    const endOfWeek = DateHelper.getDateRangeOfWeek(weekAgo);
    try {
        console.log('+++ get chef post', startOfWeek, '~', endOfWeek);
        return Order.find(
            { order_at: { $gte: startOfWeek, $lte: endOfWeek } },
            { day: true, chef: true, order_at: true }
        );
    } catch (e) {
        console.log('error at get chef');
    }
};

const addChef = (prams: any) => {
    const { weekNumber, chef } = prams;
    const weekNumberOrToday = DateHelper.getWeekNumber();
    const { mon, fri } = DateHelper.getDateRangeOfWeek(
        weekNumber ?? weekNumberOrToday
    );

    try {
        console.log(
            '+++ add chef post',
            weekNumber,
            chef,
            DateHelper.getDateByFormat(mon),
            DateHelper.getDateByFormat(fri)
        );
        _.map(chef, async (c, index) => {
            const order_at = DateHelper.addDay(mon, _.toNumber(index));
            const day_of_week = index;
            await Order.updateOne(
                { order_at },
                {
                    $set: {
                        chef: c,
                        day_of_week: _.toNumber(index),
                    },
                },
                {
                    upsert: true,
                }
            );
        });
    } catch (e) {
        console.log('error at add chef');
    }
};

export default async function chefHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { query, body, method } = req;

    await connectToDatabase();

    switch (method) {
        case 'GET':
            const chefs = await getChef(body);
            res.status(200).json(chefs);
            break;
        case 'POST':
            const result = await addChef(body);
            console.log('+++ result add restaurants post', result);
            res.status(200).json(result);
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
