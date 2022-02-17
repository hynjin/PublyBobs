import { connectToDatabase } from '../util/mongodb';

export default function Menus({ menus }) {
    return (
        <div>
            <div className="text-3xl font-bold underline">메뉴!</div>
            <h1>메뉴와 설명</h1>
            <ul>
                {menus.map((menu) => (
                    <li key={menu._id}>
                        <h2>{menu.name}</h2>
                        <p>{menu.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export async function getServerSideProps() {
    const { db } = await connectToDatabase();

    const menus = await db
        .collection('menus')
        .find({})
        // .limit(20)
        .toArray();

    return {
        props: {
            menus: JSON.parse(JSON.stringify(menus)),
        },
    };
}
