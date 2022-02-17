import { connectToDatabase } from '../util/mongodb';

export default function DayilyMenus({ dayilyMenus }) {
    return (
        <div>
            <div className="text-3xl font-bold underline">오늘의 메뉴!</div>
            <h1>주문 기록</h1>
            데이터는 불러왔는데 id만 있고 데이터 연결 아직....
            <ul>
                {dayilyMenus.map((dayilyMenu) => (
                    <li key={dayilyMenu._id}>
                        <h2>{dayilyMenu.name}</h2>
                        <h3>{dayilyMenu.url}</h3>
                        <p>{dayilyMenu.description}</p>
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
