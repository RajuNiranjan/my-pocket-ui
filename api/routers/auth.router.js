import express from "express";
import { signIn, singUp } from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/sign_up", singUp);
authRouter.get("/sign_in", signIn);

export default authRouter;
