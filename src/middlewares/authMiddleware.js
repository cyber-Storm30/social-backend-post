import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const hashSecret = process.env.JWTSECRETKEY;

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken;

    console.log("token", token);
    if (token) {
      const decodedData = jwt.verify(token, hashSecret);
      req.user = decodedData;
      next();
    } else {
      return res.status(401).json({
        message: "Authorization failed",
        errorMessage: "token value does not exist",
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", errorMessage: error.message });
  }
};
