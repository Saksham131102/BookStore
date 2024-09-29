import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// To set cookie in the browser, need to set cors credentials property to true
// And in the frontend, need to set credentials: "include" while making fetch requests
const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    // jwt expires in 10 days
    expiresIn: "10d",
  });
  res.cookie("jwt", token, {
    maxAge: 10 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    path: "/",
  });
};

export default generateTokenAndSetCookie;
