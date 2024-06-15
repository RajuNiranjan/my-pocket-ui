import express from "express";
import dotenv from "dotenv";
import "../db_connect.js";
import cors from "cors";
import authRouter from "./routers/auth.router.js";
dotenv.config();

const PORT = process.env.PORT_NUMBER || 3000;
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

app.listen(PORT, () => console.log(`server runnig at port number ${PORT}`));

app.use("/api/auth", authRouter);
