import express from "express";
import {
  googleAuth,
  signIn,
  signOut,
  signUp,
} from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/sign-up", signUp);
authRouter.post("/sign-in", signIn);
authRouter.post("/google", googleAuth);
authRouter.get("/sign-out", signOut);

export default authRouter;
