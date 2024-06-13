import express from "express";
import dotenv from "dotenv";
import "../db.js";
import { authRouter } from "./routers/auth.router.js";

dotenv.config();

const PORT = process.env.PORT_NUMBER;
const app = express();
app.use(express.json());

app.listen(PORT, () => console.log(`server is running at port ${PORT}`));

app.use("/api/auth", authRouter);
