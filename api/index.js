import express from "express";
import dotenv from "dotenv";
import "../db_connect.js";
import authRouter from "./routers/auth.router.js";
dotenv.config();

const PORT = process.env.PORT_NUMBER;
const app = express();

app.use(express.json());

app.listen(PORT, () => console.log(`server runnig at port number ${PORT}`));

app.use("/api/auth", authRouter);
