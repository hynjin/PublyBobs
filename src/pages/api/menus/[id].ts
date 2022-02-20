import { connectToDatabase } from '../../util/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';

const getAllMenus = async (db: any) => {
    return db.collection('menus').find({}).limit(200).toArray();
};

const getAllMenusByRestaurantsId = async (restaurant_id: any, db: any) => {
    return db
        .collection('menus')
        .find({ restaurant_id: new ObjectId(restaurant_id) })
        .limit(200)
        .toArray();
};

const addMenu = async (menu: any, db: any) => {
    try {
        console.log('+++ add menus post', menu);
        return await db.collection('menus').insertOne(menu);
    } catch (e) {
        console.log('error at add menus');
    }
};

const deleteMenu = async (memu_id: any, db: any) => {
    try {
        console.log('+++ delete menus post', memu_id);
        return await db.collection('menus').findOneAndDelete({ _id: memu_id });
    } catch (e) {
        console.log('error at add menus');
    }
};

export default async function menusHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { query, body, method } = req;
    const { db, client } = await connectToDatabase();

    switch (method) {
        case 'GET':
            const { id } = query;
            const menus = await getAllMenusByRestaurantsId(id, db);
            res.status(200).json(menus);
            break;
        // case 'POST':
        //     console.log('+++ call menus post');
        //     await addMenu(body, db);
        //     res.status(200);
        //     break;
        // case 'DELETE':
        //     const { menu_id } = body;
        //     console.log('+++ call restaurants delete', menu_id);
        //     await deleteMenu(menu_id, db);
        //     break;
        default:
            res.setHeader('Allow', ['GET']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
    client.close();
}
