import jwt from "jsonwebtoken";

export const verifyAccessToken = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unautherised" });
    }

    jwt.verify(token, process.env.SECRETE_KEY, (error, user) => {
      if (error) {
        return res.status(403).json({ message: "Forbidden" });
      }
      req.user = user;
      console.log("req.user", req.user);
      next();
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
