import Users from "../model/Users.js";

const isUserExists = async (chatId) => {
    const user = await Users.findOne({ chatId });
    const isExists = !!user;
    return isExists;
};

const createUser = async ({ chatId, username, request, response, date }) => {
    await Users.create({
        chatId,
        username,
        chats: [{ request, response, date }],
    });
};

const updateUser = async ({ chatId, username, request, response, date }) => {
    const prevUser = await Users.findOne({ chatId });
    const prevChats = prevUser.chats;
    const newChatObj = { request, response, date };
    const newChats = [...prevChats, newChatObj];
    await Users.updateOne({ chatId }, {
        $set: {
            username,
            chats: newChats,
        }
    });
};

// userData = { chatId, username, request, response, date }
export const saveUserChat = async (userData) => {
    try {
        const userIsExists = await isUserExists(userData.chatId);
        userIsExists ? await updateUser(userData) : await createUser(userData);
    } catch (err) {
        console.log(err);
    }
};

export default {
    saveUserChat,
};