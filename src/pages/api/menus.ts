import type { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';
import connectToDatabase from '../../util/mongoose';
import Menu from '../../models/Menu';
import _ from 'lodash';

const getAllMenus = () => {
    return Menu.find({}).limit(200);
};

const getAllMenusByRestaurantsId = (restaurant_id: any) => {
    return Menu.find({ restaurant_id }).limit(200);
};

const addMenu = (menu: any) => {
    try {
        console.log('+++ add menus post', menu);
        return Menu.create({
            ...menu,
            restaurant_id: new ObjectId(menu.restaurant_id),
            updated_at: new Date(),
        });
    } catch (e) {
        console.log('error at add menus');
    }
};

const deleteMenu = (memu_id: any) => {
    try {
        return Menu.findOneAndDelete({ _id: memu_id });
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
            const { restaurant_id } = query;
            const menus = await getAllMenusByRestaurantsId(restaurant_id);
            res.status(200).json(menus);
            break;
        case 'POST':
            console.log('+++ call menus post');
            const result = await addMenu(body);
            res.status(200).json(result.insertedId);
            break;
        case 'DELETE':
            const { menu_id } = body;
            console.log('+++ call restaurants delete', menu_id);
            await deleteMenu(menu_id);
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
