import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const { MONGO_URI: mongoUri } = process.env;

export const connectDB = async () => {
    // mongoose.connect(mongoUri).then((connection) => {
    //     callback(connection);
    // }).catch((err) => {
    //     console.log(err);
    // });
    try {
        await mongoose.connect(mongoUri);
        console.log("MongoDB connected!");
    } catch (err) {
        console.log(err);
    }
};

export default {
    connectDB,
};