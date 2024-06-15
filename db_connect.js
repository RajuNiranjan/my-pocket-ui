import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const DB_Connection = async () => {
  try {
    const db_Url = process.env.MOBGO_DB;
    const dbConnect = await mongoose
      .connect(db_Url)
      .then(() => console.log("Server Connected to Data Base"))
      .catch((err) => console.log(err));
    return dbConnect;
  } catch (error) {
    console.log(error);
  }
};

DB_Connection();
