import express from "express";
import { generateAccessToken, generateRefreshToken } from "./helper.js";
import { authenticateAndValidateToken } from "./middleware/HandleTokens.js";
const router = express.Router();

router.post("/register", (req, res) => {
  const { userName, password } = req.body;
  res.status(200).json({ text: "great" });
});

router.post("/login", (req, res) => {
  console.log("run");
  const { userName, password } = req.body;
  const userInfo = { userName, password };
  const accessToken = generateAccessToken(userInfo);
  const refreshToken = generateRefreshToken(userInfo);
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
  });
  res.status(200).json({ accessToken });
});

router.get("/getData", authenticateAndValidateToken, (req, res) => {
  console.log("getData run");
  res.json({ body: "done" });
});
export default router;
