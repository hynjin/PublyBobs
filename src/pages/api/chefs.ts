import type { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '../../libraries/mongoose';
import Order from '../../models/Order';
import * as DateHelper from '../../helper/DateHelper';
import _ from 'lodash';

// 오늘의 주문을 담당한 쉐프!
// 날짜별로 지정
const getChef = (prams: any) => {
    const { weekNumber } = prams;
    const weekNum = DateHelper.getWeekNumber();
    const rangeOfWeek = DateHelper.getDateRangeOfWeek(weekNumber ?? weekNum);
    try {
        return Order.find(
            {
                order_at: {
                    $gte: DateHelper.toDate(rangeOfWeek.mon),
                    $lte: DateHelper.toDate(rangeOfWeek.fri),
                },
            },
            { date: true, chef: true, order_at: true }
        ).sort({ 'date.day_of_week': 1 });
    } catch (e) {
        console.log('error at get chef');
    }
};

const addChef = (prams: any) => {
    const { date, chefs } = prams;
    const weekNumber = DateHelper.getWeekNumber(date);
    const { mon } = DateHelper.getDateRangeOfWeek(weekNumber);
    console.log('+++', chefs);
    try {
        _.map(chefs, async (chef, index) => {
            const order_at = DateHelper.addDay(mon, _.toNumber(index));

            const date = {
                day_of_week: _.toNumber(index),
                weekNumber: weekNumber,
                year: DateHelper.getYear(order_at),
                month: DateHelper.getMonth(order_at),
                day: DateHelper.getDay(order_at),
            };
            await Order.updateOne(
                { order_at },
                {
                    $set: {
                        chef,
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
            const chefs = await getChef(query);
            res.status(200).json(chefs);
            break;
        case 'POST':
            const result = await addChef(body);
            console.log('+++ result add order post', result);
            res.status(200).json(result);
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
