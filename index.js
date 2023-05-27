import express from "express";
import { connectDB } from "./database/connection.js";
import dotenv from "dotenv";
import { Bot } from "./bot/index.js";
import indexRouter from "./routes/index.js";
import notFoundRouter from "./routes/not-found.js";

dotenv.config();

const app = express();
const telegramBot = new Bot();
const { PORT: port } = process.env;

telegramBot.init();

app.set("view engine", "ejs");
app.get("/", indexRouter);
app.use("*", notFoundRouter);

// connectDB((connection) => {
//   console.log("MongoDB connected!");
//   app.listen(port, () => {
//     console.log(`Server running at port ${port}...`);
//   });
// });

connectDB();
app.listen(port, () => {
  console.log(`Server running at port ${port}...`);
});