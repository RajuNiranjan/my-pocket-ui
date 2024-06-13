import { UserModel } from "../models/auth.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const signUp = async (req, res, next) => {
  try {
    const { userName, email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(409).json({ message: "User Already Existed." });
    }
    const hashPassword = bcrypt.hashSync(password, 12);
    const newUser = new UserModel({ userName, eamil, password: hashPassword });
    await newUser.save();
    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      process.env.SECRETE_KEY
    );
    res.cookie("token", token, { httpOnly: true });

    const userResponse = {
      _id: newUser._id,
      userName: newUser.userName,
      email: newUser.email,
    };

    return res
      .status(201)
      .json({ message: "User Created Successfully", newUser: userResponse });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Sign In Failuer, Internal Server Error" });
  }
};
