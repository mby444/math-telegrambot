import fs from "fs/promises";

const getReplyData = async (path = "./json/reply.json") => {
    try {
        const replyBuffer = await fs.readFile(path);
        const replyData = JSON.parse(replyBuffer.toString());
        return replyData;
    } catch (err) {
        console.log(err);
        return [];
    }
};

export const getReply = async (key = "") => {
    const replyData = await getReplyData();
    const messagePair = replyData.find((data) => data[0] === key);
    const message = messagePair ? messagePair[1] : "";
    return message;
};

export const getMathReply = () => {
    
};

export default {
    getReply,
    getMathReply,
};