import express from "express";
import expressAsyncHandler from "express-async-handler";
import Post from "../Model/postModel.js";
import User from "../Model/userModel.js";
import Topic from "../Model/topicModel.js";
import Category from "../Model/categoryModel.js";
import { isAuth } from "../utils.js";

const postRouter = express.Router();

postRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const posts = await Post.find({})
    .populate({ path: 'user', model: User })
    .populate({ path: 'topic', model: Topic })
    .populate({ path: 'category', model: Category }); ;
    posts.forEach((post) => {
      if (post.isAnonymous) {
        post.postBy = "Unknown people";
      }
    });
    res.send(posts);
  })
);
postRouter.delete(
  "/",
  expressAsyncHandler(async (req, res) => {
    const posts = await Post.find({});
    if (posts) {
      await Post.deleteMany();
      res.send({ message: "Delete All Post" });
    } else {
      res.status(404).send({ message: "Post Not Found" });
    }
  })
);
postRouter.get(
  "/list/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const posts = await Post.find({user: req.params.id})
    .populate({ path: 'user', model: User })
    .populate({ path: 'topic', model: Topic })
    .populate({ path: 'category', model: Category });;;
    posts.forEach((post) => {
      if (post.isAnonymous) {
        post.postBy = "Unknown people";
      }
    });
    res.send(posts);
  })
);

postRouter.post(
  "/createPost",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const newPost = new Post({
      title: req.body.title,
      postBy: req.body.postBy,
      content: req.body.content,
      category: req.body.category,
      topic: req.body.topic,
      isAnonymous: Boolean(req.body.isAnonymous),
      fileUpload: req.body.fileUpload,
      user: req.user._id,
      // topics: req.topic._id,
    });
    const post = await newPost.save();
    res.send({
      _id: post._id,
      title: post.title,
      postBy: post.postBy,
      content: post.content,
      category: post.category,
      topic: post.topic,
      fileUpload: post.fileUpload,
      isAnonymous: post.isAnonymous,
      user: post.user,
      // topics: post.topics,
    });
  })
);
postRouter.get(
  "/mine",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const posts = await Post.find({ user: req.user._id })
    .populate({ path: 'user', model: User })
    .populate({ path: 'topic', model: Topic })
    .populate({ path: 'category', model: Category });;
    res.send(posts);
  })
);
postRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id)
    .populate({ path: 'user', model: User })
    .populate({ path: 'topic', model: Topic })
    .populate({ path: 'category', model: Category });
    if (post.isAnonymous) {
      post.postBy = "Unknown People";
    }
    if (post) {
      res.send(post);
    } else {
      res.status(404).send({ message: "Post Not Found" });
    }
  })
);
// postRouter.get(
//   "/:id",
//   expressAsyncHandler(async (req, res) => {
//     const post = await Post.findById(req.params.id);
//     if (post) {
//       res.send(post);
//     } else {
//       res.status(404).send({ message: "User Not Found" });
//     }
//   })
// );

postRouter.delete(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (post) {
      await post.deleteOne();
      res.send({ message: "Post Deleted" });
    } else {
      res.status(404).send({ message: "Post Not Found" });
    }
  })
);
postRouter.put(
  "/:id/view",
  expressAsyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (post) {
      post.views = post.views + 1;
      const updatedPost = await post.save();
      res.send({ message: "Post Updated", post: updatedPost });
    } else {
      res.status(404).send({ message: "Post Not Found" });
    }
  })
);
postRouter.put(
  "/:id/like",
  expressAsyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (post) {
      post.likes = post.likes + 1;
      post.views = post.views + 1;
      const updatedPost = await post.save();
      res.send({ message: "Post Updated", post: updatedPost });
    } else {
      res.status(404).send({ message: "Post Not Found" });
    }
  })
);
postRouter.put(
  "/:id/dislike",
  expressAsyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (post) {
      post.dislikes = post.dislikes + 1;
      post.views = post.views + 1;
      const updatedPost = await post.save();
      res.send({ message: "Post Updated", post: updatedPost });
    } else {
      res.status(404).send({ message: "Post Not Found" });
    }
  })
);

postRouter.post(
  "/:id/comments",
  expressAsyncHandler(async (req, res) => {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (post) {
      const comment = {
        commentBy: req.body.commentBy,
        avtCmt: req.body.avtCmt,
        content: req.body.content,
        isAnonymous: Boolean(req.body.isAnonymous),
      };
      post.comments.push(comment);
      post.views = post.views + 1;
      const updatedPost = await post.save();
      res.status(201).send({
        message: "Review Created",
        comment: updatedPost.comments[updatedPost.comments.length - 1],
        views: post.views,
      });
    } else {
      res.status(404).send({ message: "Post Not Found" });
    }
  })
);

export default postRouter;
