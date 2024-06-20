import userModel from "../models/auth.model.js";
import bcryptjs from "bcryptjs";

export const updateUser = async (req, res, next) => {
  if (req.user.userId !== req.params.id) {
    return res
      .status(401)
      .json({ message: "you can update yor account only!" });
  }

  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 12);
    }

    const updateUser = await userModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          userName: req.body.userName,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true, runValidators: true }
    );

    if (!updateUser) {
      return res.status(404).json({ message: "user not found" });
    }

    const userResponse = {
      _id: updateUser._id,
      userName: updateUser.userName,
      email: updateUser.email,
      avatar: updateUser.avatar,
    };

    return res.status(200).json({
      message: "user updated successfully",
      updatedUser: userResponse,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
