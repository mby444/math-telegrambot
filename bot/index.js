import { bot } from "../constants/bot.js";
import { getReply } from "../utils/reply.js";

export class Bot {
    constructor() {
        this.isBreak = false;
        this.isStopped = false;
    }

    init() {
        bot.onText(/^((\/start|\/help))$/, (msg, match) => {
            this.requestCallback(async (disrequest) => {
                const chatId = msg.chat.id;
                const response = await getReply(match[0]);
                await bot.sendMessage(chatId, response);
                disrequest();
            });
        });

        bot.onText(/^(\/hello (.+))$/, (msg, match) => {
            this.requestCallback(async (disrequest) => {
                const [chatId, request] = [msg.chat.id, match[2] || ""];
                await bot.sendMessage(chatId, request);
                disrequest();
            });
        });

        bot.onText((/(.+)/), (msg, match) => {
            this.requestCallback(async (disrequest) => {
                const chatId = msg.chat.id;
                const response = "/help";
                await bot.sendMessage(chatId, response);
                disrequest();
            });
        });
    }

    requestCallback(callback = Function()) {
        if (this.isStopped) {
            return;
        }
        if (this.isBreak) {
            this.isBreak = false;
            return;
        }
        this.isBreak = true;
        callback(() => {
            this.isBreak = false;
        });
    }
}

export default {
    Bot,
};