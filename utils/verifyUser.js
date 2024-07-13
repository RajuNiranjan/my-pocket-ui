import jwt from "jsonwebtoken";

export const verifyAccessToken = (req, res, next) => {
  console.log("cookies", req.cookies);
  const token = req.cookies.jwt;
  console.log("token", token);
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, process.env.SECRET_KEY, (error, user) => {
    if (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token has expired" });
      }
      if (error.name === "JsonWebTokenError") {
        return res.status(403).json({ message: "Invalid token" });
      }
      return res.status(500).json({ message: "Internal Server Error" });
    }
    req.user = user;
    next();
  });
};
