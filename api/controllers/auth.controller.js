import User from "../models/user.models.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

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

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "user not found"));
    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(401, "wrong email or password"));
    }

    const token = jwt.sign({ id: validUser?._id }, process.env.JWT_TOKEN);

    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(errorHandler(500, "please chaeck email or password"));
  }
};
