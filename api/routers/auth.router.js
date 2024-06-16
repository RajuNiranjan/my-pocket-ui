import express from "express";
import { googleAuth, signIn, signUp } from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/sign-up", signUp);
authRouter.post("/sign-in", signIn);
authRouter.post("/google", googleAuth);

export default authRouter;
