import { connectToDatabase } from '../util/mongodb';

export default function Restaurants({ restaurants }) {
    return (
        <div>
            <div className="text-3xl font-bold underline">식당!</div>
            <h1>주문</h1>
            <ul>
                {restaurants.map((restaurant) => (
                    <li key={restaurant._id}>
                        <h2>{restaurant.name}</h2>
                        <h3>{restaurant.url}</h3>
                        <p>{restaurant.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export async function getServerSideProps() {
    const { db } = await connectToDatabase();

    const restaurants = await db
        .collection('restaurants')
        .find({})
        // .limit(20)
        .toArray();

    return {
        props: {
            restaurants: JSON.parse(JSON.stringify(restaurants)),
        },
    };
}
