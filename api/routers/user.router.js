import express from "express";
import { getAllUser } from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.get("/", getAllUser);

export default userRouter;
