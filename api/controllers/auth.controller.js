import userModel from "../models/auth.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signUp = async (req, res, next) => {
  try {
    const { userName, email, password } = req.body;

    if (!userName || !email || !password) {
      return res.status(400).json({ message: "Please Fill All The Fields" });
    }

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
      process.env.SECRET_KEY
    );
    await newUser.save();
    res.cookie("jwt", token, { httpOnly: true });
    const userResponse = {
      _id: newUser._id,
      userName: newUser.userName,
      email: newUser.email,
      avatar: newUser.avatar,
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

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please Fill All The Fields" });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.SECRET_KEY
    );

    res.cookie("jwt", token, { httpOnly: true });

    const userResponse = {
      _id: user._id,
      email: user.email,
      userName: user.userName,
      avatar: user.avatar,
    };

    return res
      .status(200)
      .json({ message: "User Login Successfully", user: userResponse });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Sign In Failure, Internal Server Error" });
  }
};

export const googleAuth = async (req, res, next) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });

    if (user) {
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.SECRET_KEY
      );

      const userResponse = {
        _id: user._id,
        userName: user.userName,
        email: user.email,
        avatar: user.avatar,
      };

      return res
        .cookie("jwt", token, { httpOnly: true })
        .status(200)
        .json({ message: "User Sign In Successfully", user: userResponse });
    }

    const password = Math.random().toString(36).slice(-12);
    const hashPassword = bcrypt.hashSync(password, 12);
    const newUser = new userModel({
      userName: req.body.userName,
      email: req.body.email,
      password: hashPassword,
      avatar: req.body.avatar,
    });

    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      process.env.SECRET_KEY
    );

    const userResponse = {
      _id: newUser._id,
      userName: newUser.userName,
      email: newUser.email,
      avatar: newUser.avatar,
    };

    return res
      .cookie("jwt", token, { httpOnly: true })
      .json({ message: "User Sign Up Successfully", user: userResponse });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error With Google Authentication, Internal Server Error",
    });
  }
};

export const signOut = async (req, res, next) => {
  try {
    res.clearCookie("jwt");
    return res
      .status(200)
      .json({ message: "User has been signed out successfully" });
  } catch (error) {
    console.error("Error during sign out:", error);
    return next(error);
  }
};
