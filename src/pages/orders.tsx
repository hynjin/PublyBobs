import { connectToDatabase } from '../util/mongodb';
import Link from 'next/link';

export default function Orders(props: { orders: OrderType[] }) {
    const { orders } = props;
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
                {orders.map((order) => (
                    <li key={order._id}>
                        <h2>{order.dayilyMenu_id}</h2>
                        <h3>{order.order_id}</h3>
                        <p>{order.choose_id}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export async function getServerSideProps() {
    const { db } = await connectToDatabase();

    const orders = await db
        .collection('orders')
        .find({})
        // .limit(20)
        .toArray();

    return {
        props: {
            orders: JSON.parse(JSON.stringify(orders)),
        },
    };
}
