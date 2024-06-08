import User from "../models/user.models.js";
import bcrypt from "bcryptjs";

export const singUp = async (req, res, next) => {
  try {
    const { userName, email, password } = req.body;
    const hashPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({ userName, email, password: hashPassword });
    await newUser.save();
    res.status(201).json({ message: "user created successfully" });
    console.log(req.body);
  } catch (error) {
    res.status(500).json({ message: "Email already existed" });
  }
};
