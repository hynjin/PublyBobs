import { connectToDatabase } from '../../util/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import _ from 'lodash';
import { ObjectId } from 'mongodb';

const getAllDayilyMenus = async (db: any) => {
    return db.collection('dayilyMenus').find({}).limit(200).toArray();
};

const getAllDayilyMenusByRestaurantsId = async (
    restaurant_id: any,
    db: any
) => {
    return db
        .collection('dayilyMenus')
        .find({ restaurant_id })
        .limit(200)
        .toArray();
};

const addDayilyMenu = async (menus: any, db: any) => {
    const chefId = new ObjectId('620e2e53d60ac2177a6c6ab5');
    try {
        console.log('+++ add dayilyMenus post', menus);
        return db.collection('dayilyMenus').insertOne({
            ...menus,
            restaurant_id: new ObjectId(menus.restaurant_id),
            updated_at: new Date(),
            chef_id: chefId,
        });
    } catch (e) {
        console.log('error at add dayilyMenus');
    }
};

const deleteDayilyMenu = async (memu_id: any, db: any) => {
    try {
        return await db
            .collection('dayilyMenus')
            .findOneAndDelete({ _id: memu_id });
    } catch (e) {
        console.log('error at add dayilyMenus');
    }
};

export default async function dayilyMenusHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { query, body, method } = req;
    const { db, client } = await connectToDatabase();

    switch (method) {
        case 'GET':
            const { restaurant_id } = query;
            const dayilyMenus = await getAllDayilyMenusByRestaurantsId(
                restaurant_id,
                db
            );
            res.status(200).json(dayilyMenus);
            break;
        case 'POST':
            console.log('+++ call dayilyMenus post');
            const result = await addDayilyMenu(body, db);
            res.status(200).json(result.insertedId);
            break;
        case 'DELETE':
            const { menu_id } = body;
            console.log('+++ call restaurants delete', menu_id);
            await deleteDayilyMenu(menu_id, db);
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
    client.close();
    // db.close();
}
