import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { jwtDecode } from "jwt-decode";

dotenv.config();

function refreshAccessToken(userData) {
  return jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
}
function callback(err, decoded) {
  if (err) {
    return false;
  } else {
    return true;
  }
}
export const authenticateAndValidateToken = async (req, res, next) => {
  const accsessToken = req?.cookies?.accsessToken;
  const t = jwt.verify(accsessToken, process.env.ACCESS_TOKEN_SECRET, callback);
  console.log(t);
  if (accsessToken == undefined || accsessToken == null) {
    const refresh_token = req?.cookies?.refreshToken;
    if (refresh_token == undefined || refresh_token == null) {
      return res
        .status(401)
        .json({ text: "missing refresh_token", redirect: "/login" });
    }

    if (jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET, callback)) {
      const { userName, password } = jwtDecode(refresh_token);
      res.cookie("accsessToken", refreshAccessToken({ userName, password }));
      next();
    } else {
      res.cookie("accsessToken", "", { expires: new Date(0) });
      return res
        .status(403)
        .cookie("refreshToken", "", { expires: new Date(0) })
        .json({ text: "the refresh_token is not valid", redirect: "/login" });
    }
  } else if (
    !jwt.verify(accsessToken, process.env.ACCESS_TOKEN_SECRET, callback)
  ) {
    res.cookie("accsessToken", "", { expires: new Date(0) });
    return res
      .status(403)
      .cookie("refreshToken", "", { expires: new Date(0) })
      .json({ text: "the refresh_token is not valid", redirect: "/login" });
  }
  next();
  return null;
};
