import { model, Schema } from "mongoose";

const userSchema = new Schema({
    chatId: String,
    username: String,
    chats: [{ request: String, response: String, date: String }],
});

export default model("users", userSchema);