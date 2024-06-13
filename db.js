import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const DBConnetion = async () => {
  const db_url = process.env.MONGO_DB;
  const db = await mongoose
    .connect(db_url)
    .then(() => console.log("server is connected to data base"))
    .catch((err) => console.log(err));
  return db;
};

DBConnetion();
