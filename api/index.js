import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routers/user.router.js";
dotenv.config();

const app = express();

const PORT = 3001 | process.env.PORT_NUMBER;

const DB_URL = process.env.MONGO_DB;

mongoose
  .connect(DB_URL)
  .then(() => console.log("server connected to mongo_db"))
  .catch((err) => console.log(err));

app.listen(PORT, () => console.log(`server is runnig in port number ${PORT}`));

app.use("/api/users", userRouter);
