import { connectToDatabase } from './util/mongodb';
import Link from 'next/link';

type DayilyMenuType = {
    _id: string;
    restaurant_id: string;
    menus: string[];
    chef_id: string;
};

export default function DayilyMenus(props: { dayilyMenus: DayilyMenuType[] }) {
    const { dayilyMenus } = props;
    return (
        <div>
            <Link href="/">
                <a>
                    <p>뒤로가기</p>
                </a>
            </Link>
            <div className="text-3xl font-bold underline">오늘의 메뉴!</div>
            <h1>주문 기록</h1>
            데이터는 불러왔는데 id만 있고 데이터 연결 아직....
            <ul>
                {dayilyMenus.map((dayilyMenu) => (
                    <li key={dayilyMenu._id}>
                        <h2>{dayilyMenu.restaurant_id}</h2>
                        <h3>{dayilyMenu.menus}</h3>
                        <p>{dayilyMenu.chef_id}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export async function getServerSideProps() {
    const { db } = await connectToDatabase();

    const dayilyMenus = await db
        .collection('dayilyMenus')
        .find({})
        // .limit(20)
        .toArray();

    return {
        props: {
            dayilyMenus: JSON.parse(JSON.stringify(dayilyMenus)),
        },
    };
}
