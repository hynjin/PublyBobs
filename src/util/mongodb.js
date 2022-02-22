import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB;

let cachedDb = global.mongoose;

if (!cachedDb) {
    cachedDb = global.mongoose = { conn: null, promise: null };
}

if (!MONGODB_URI) {
    throw new Error(
        'Please define the MONGODB_URI environment variable inside .env.local'
    );
}

if (!MONGODB_DB) {
    throw new Error(
        'Please define the MONGODB_DB environment variable inside .env.local'
    );
}

export async function connectToDatabase() {
    if (cachedDb.conn) {
        return cachedDb.conn;
    }

    // if (cachedClient && cachedDb) {
    //     return { client: cachedClient, db: cachedDb };
    // }
    if (!cachedDb.promise) {
        const opts = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            bufferCommands: false,
            // bufferMaxEntries: 0,
            // useFindAndModify: true,
            // useCreateIndex: true,
        };

        cachedDb.promise = mongoose
            .connect(MONGODB_URI, opts)
            .then((mongoose) => {
                return mongoose;
            });
    }
    console.log('+++ ??? ?!?!?');
    cachedDb.conn = await cachedDb.promise;
    return cachedDb.conn;
}

//     const client = await MongoClient.connect(uri, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     });

//     const db = await client.db(dbName);

//     cachedClient = client;
//     cachedDb = db;

//     return { client, db };
// }

// export async function closeToDatabase() {
//     cachedClient.close();
// }
export default connectToDatabase;