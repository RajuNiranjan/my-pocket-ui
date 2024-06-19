import express from "express";
import { updateUserInfo } from "../controllers/user.controller.js";
import { verifyToken } from "../../utils/verifyUser.js";

export const userRoute = express.Router();

userRoute.post("/update/:id", verifyToken, updateUserInfo);
