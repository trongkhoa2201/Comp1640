import express from "express";
import data from "../data.js";
import User from "../Model/userModel.js";

const seedRouter = express.Router();

seedRouter.get("/", async (req, res) => {
  const createdUsers = await User.insertMany(data.users);
  res.send({ createdUsers });
});

export default seedRouter;
