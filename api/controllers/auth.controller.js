import userModel from "../models/auth.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signUp = async (req, res, next) => {
  try {
    const { userName, email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      return res
        .status(409)
        .json({ message: "Email Already Existed! Please Login" });
    }
    const hashPassword = bcrypt.hashSync(password, 12);
    const newUser = new userModel({ userName, email, password: hashPassword });
    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      process.env.SECRETE_KEY
    );
    await newUser.save();
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
    console.log(error);
    return res
      .status(500)
      .json({ message: "Sign Up Failure, Internal Server Error" });
  }
};
