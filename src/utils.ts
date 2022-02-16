// import { MongoClient, connect } from 'mongoose';
import { MongoClient } from 'mongodb';

const {
    // Attempts to connect to MongoDB and then tries to connect locally:)
    MONGO_URI = 'mongodb+srv://admin:test1234@publybobs.zwsqn.mongodb.net/sample_airbnb?retryWrites=true&w=majority',
} = process.env;

console.log('+++', MONGO_URI);

// const options: ConnectionOptions = {
//     useFindAndModify: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//     useNewUrlParser: true
// }
const client = new MongoClient(MONGO_URI);
export const connectToDatabase = () => client.connect();
