import express from "express";
const router = express.Router();

router.get("/getDate", (req, res) => {
  console.log("got new req");
  res.json({ time: new Date().toISOString() });
});

export default router;
