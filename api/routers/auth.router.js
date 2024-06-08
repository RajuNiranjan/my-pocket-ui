import express from "express";
import { singUp } from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/sign_up", singUp);

export default authRouter;
