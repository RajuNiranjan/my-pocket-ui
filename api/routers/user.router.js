import express from "express";
import { deleteUser, updateUser } from "../controllers/user.controller.js";
import { verifyAccessToken } from "../../utils/verifyUser.js";

export const userRoute = express.Router();

userRoute.post("/updateUserInfo/:id", verifyAccessToken, updateUser);
userRoute.delete("/deleteUser/:id", verifyAccessToken, deleteUser);
