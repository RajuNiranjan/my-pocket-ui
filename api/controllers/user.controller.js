import userModel from "../models/auth.model.js";
import bcryptjs from "bcryptjs";

export const updateUserInfo = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return res
      .status(401)
      .json({ message: "You can only update your own account!" });
  }

  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedUser = await userModel.findByIdAndUpdate(
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

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const userResponse = {
      userName: updatedUser.userName,
      email: updatedUser.email,
      avatar: updatedUser.avatar,
    };

    return res.status(200).json({
      message: "User Updated Successfully",
      updatedUser: userResponse,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error in Updating User Info, Internal Server Error" });
  }
};
