import express from "express";
import {
  google,
  googleAuth,
  signIn,
  singUp,
} from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/sign_up", singUp);
authRouter.post("/sign_in", signIn);
authRouter.post("/google", google);
authRouter.post("googleAuth", googleAuth);

export default authRouter;
