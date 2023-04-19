import bcrypt from "bcryptjs";
import express from "express";
import expressAsyncHandler from "express-async-handler";
import Department from "../Model/departmentModel.js";
import Post from "../Model/postModel.js";
import Topic from "../Model/topicModel.js";
import User from "../Model/userModel.js";
import { generateToken, isAuth, isQAC, isAdmin } from "../utils.js";

const adminRouter = express.Router();

adminRouter.get(
  "/",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const users = await User.find({}).populate({
      path: "department",
      path: "department",
      model: Department,
    });
    res.send(users);
  })
);
adminRouter.get(
  "/department",
  isAuth,
  isQAC,
  expressAsyncHandler(async (req, res) => {
    const users = await User.find({ department: req.user.department }).populate(
      { path: "department", model: Department }
    );
    res.send(users);
  })
);

adminRouter.post(
  "/createAccount",
  expressAsyncHandler(async (req, res) => {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
      role: req.body.role,
      department: req.body.department,
      avatar: req.body.avatar,
    });
    const user = await newUser.save();
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department.name,
      avatar: user.avatar,
      token: generateToken(user),
    });
  })
);
adminRouter.get(
  "/summary",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const users = await User.aggregate([
      {
        $group: {
          _id: null,
        //  department.name,
          numUsers: { $sum: 1 },
        },
      },
    ]);
    const topics = await Topic.aggregate([
      {
        $group: {
          _id: null,
          numTopics: { $sum: 1 },
        },
      },
    ]);
    const posts = await Post.aggregate([
      {
        $group: {
          _id: null,
          numPosts: { $sum: 1 },
        },
      },
    ]);
    const departmentCounts = await User.aggregate([
      {
        // liên kết (join) hai bảng User và departments
        $lookup: {
          from: "departments",
          localField: "department",
          foreignField: "_id",
          as: "department",
        },
      },
      {
        //mở rộng các giá trị = > bản ghi đơn lẻ
        $unwind: "$department",
      },
      {
        $group: {
          _id: "$department.name",
          count: { $sum: 1 },
        },
      },
    ]);
    const dailyPost = await Post.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          posts: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    const postInTopic = await Post.aggregate([
     
      {
        // liên kết (join) hai bảng User và departments
        $lookup: {
          from: "topics",
          localField: "topic",
          foreignField: "_id",
          as: "topic",
        },
      },
      {
        //mở rộng các giá trị = > bản ghi đơn lẻ
        $unwind: "$topic",
      },
      {
        // liên kết (join) hai bảng User và departments
        $lookup: {
          from: "topics",
          localField: "topic",
          foreignField: "_id",
          as: "topic",
        },
      },
      {
        //mở rộng các giá trị = > bản ghi đơn lẻ
        $unwind: "$topic",
      },
      {
        $group: {
          _id: "$topic.title",
          count: { $sum: 1 },
        },
      },
    ]);
    const postIsAnonymous = await Post.aggregate([
      {
        $group: {
          _id: "$isAnonymous",
          count: { $sum: 1 },
        },
      },
    ]);
    res.send({
      departmentCounts,
      users,
      topics,
      posts,
      postInTopic,
      dailyPost,
      postIsAnonymous,
    });
  })
);

adminRouter.delete(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      if (user.email === "admin@example.com") {
        res.status(400).send({ message: "Can Not Delete Admin User" });
        return;
      }
      await user.deleteOne();
      res.send({ message: "User Deleted" });
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
  })
);
// =====================================================================
adminRouter.get(
  "/departmentCount",
  expressAsyncHandler(async (req, res) => {
    const departmentCounts = await User.aggregate([
      {
        $group: {
          _id: "$department",
          count: { $sum: 1 },
        },
      },
    ]);
    res.send(departmentCounts);
  })
);
// =====================================================================

adminRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
  })
);

adminRouter.put(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.role = req.body.role || user.role;
      user.department = req.body.department || user.department;
      user.avatar = req.body.avatar || user.avatar;
      const updatedUser = await user.save();
      res.send({ message: "User Updated", user: updatedUser });
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
  })
);

adminRouter.post(
  "/login",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email }).populate({
      path: "department",
      model: Department,
    });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          department: user.department.name,
          avatar: user.avatar,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: "Invalid email or password" });
  })
);
adminRouter.put(
  "/profile",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.avatar = req.body.avatar || user.avatar;
      user.role = req.body.role || user.role;
      user.department = req.body.department || user.department;
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }

      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        avatar: updatedUser.avatar,
        role: updatedUser.role,
        department: updatedUser.department,
        token: generateToken(updatedUser),
      });
    } else {
      res.status(404).send({ message: "User not found" });
    }
  })
);

export default adminRouter;
