import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const { MONGO_URI: mongoUri } = process.env;

export const connectDB = (callback = Function()) => {
    mongoose.connect(mongoUri).then((connection) => {
        callback(connection);
    }).catch((err) => {
        console.log(err);
    });
};

export default {
    connectDB,
};