import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express();

const PORT = 3001;

app.listen(PORT, () => console.log(`server is runnig in port number ${PORT}`));
