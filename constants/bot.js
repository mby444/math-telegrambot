import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";

dotenv.config();

export const botToken = process.env.BOT_TOKEN;
export const bot = new TelegramBot(botToken, { polling: true });

export default {
  botToken,
  bot,
};
