import express from "express";
import { signUp } from "../controllers/auth.controller.js";

export const authRouter = express.Router();

authRouter.post("/sign-up", signUp);
