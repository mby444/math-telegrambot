import express from "express";
import dotenv from "dotenv";
import { Bot } from "./bot/index.js";

dotenv.config();

const app = express();
const telegramBot = new Bot();
const port = process.env.PORT;

telegramBot.init();

// app.set("view engine", "ejs");

// app.get("/", (req, res) => {
//     res.sendStatus(200);
// });

// app.use("*", (req, res) => {
//     res.sendStatus(404);
// });

// app.listen(port, () => {
//     console.log(`Server running at port ${port}...`);
// });