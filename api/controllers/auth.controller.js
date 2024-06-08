import User from "../models/user.models.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const singUp = async (req, res, next) => {
  try {
    const { userName, email, password } = req.body;
    const hashPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({ userName, email, password: hashPassword });
    await newUser.save();
    res.status(201).json({ message: "user created successfully" });
    console.log(req.body);
  } catch (error) {
    next(errorHandler(500, "Email aready Existed"));
  }
};
