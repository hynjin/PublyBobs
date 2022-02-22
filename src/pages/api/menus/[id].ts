import type { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';
import connectToDatabase from '../../../libraries/mongoose';
import Menu from '../../../models/Menu';

const getAllMenus = () => {
    return Menu.find({}).limit(200);
};

const getAllMenusByRestaurantsId = async (restaurant_id: any) => {
    return Menu.find({ restaurant_id: new ObjectId(restaurant_id) }).limit(200);
};

const addMenu = async (menu: any) => {
    try {
        console.log('+++ add menus post', menu);
        return await Menu.create(menu);
    } catch (e) {
        console.log('error at add menus');
    }
};

const deleteMenu = async (memu_id: any) => {
    try {
        console.log('+++ delete menus post', memu_id);
        return await Menu.findOneAndDelete({ _id: memu_id });
    } catch (e) {
        console.log('error at add menus');
    }
};

export default async function menusHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { query, body, method } = req;
    await connectToDatabase();

    switch (method) {
        case 'GET':
            const { id } = query;
            const menus = await getAllMenusByRestaurantsId(id);
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
}
