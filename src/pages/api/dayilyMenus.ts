import type { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';
import connectToDatabase from '../../libraries/mongoose';
import DayilyMenu from '../../models/DayilyMenu';
import _ from 'lodash';

const getAllDayilyMenus = () => {
    return DayilyMenu.find({}).limit(200);
};

const getAllDayilyMenusByRestaurantsId = (restaurant_id: any) => {
    return DayilyMenu.find({ restaurant_id }).limit(200);
};

const addDayilyMenu = (menus: any) => {
    const chefId = new ObjectId('620e2e53d60ac2177a6c6ab5');
    try {
        console.log('+++ add dayilyMenus post', menus);
        return DayilyMenu.create({
            ...menus,
            restaurant_id: new ObjectId(menus.restaurant_id),
            updated_at: new Date(),
            chef_id: chefId,
        });
    } catch (e) {
        console.log('error at add dayilyMenus');
    }
};

const deleteDayilyMenu = (memu_id: any) => {
    try {
        return DayilyMenu.findOneAndDelete({ _id: memu_id });
    } catch (e) {
        console.log('error at add dayilyMenus');
    }
};

export default async function dayilyMenusHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { query, body, method } = req;

    const client = connectToDatabase();

    switch (method) {
        case 'GET':
            // client.
            // const { restaurant_id } = query;
            // const dayilyMenus = await getAllDayilyMenusByRestaurantsId(
            //     restaurant_id
            // );
            // res.status(200).json(dayilyMenus);
            break;
        case 'POST':
            console.log('+++ call dayilyMenus post');
            const result = await addDayilyMenu(body);
            res.status(200).json(result.insertedId);
            break;
        case 'DELETE':
            const { menu_id } = body;
            console.log('+++ call restaurants delete', menu_id);
            await deleteDayilyMenu(menu_id);
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
