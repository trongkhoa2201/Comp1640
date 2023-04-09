import express from "express";
import expressAsyncHandler from "express-async-handler";
import Post from "../Model/postModel.js";

const postRouter = express.Router();

// postRouter.get(
//   "/",
//   expressAsyncHandler(async (req, res) => {
//     const posts = await Post.find({});
//     res.send(posts);
//   })
// );
postRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const posts = await Post.find({});
    posts.forEach((post) => {
      if (post.isAnonymous) {
        post.postBy = "unknow people";
      }
    });
    res.send(posts);
  })
);

postRouter.post(
  "/createPost",
  expressAsyncHandler(async (req, res) => {
    const newPost = new Post({
      title: req.body.title,
      postBy: req.body.postBy,
      content: req.body.content,
      category: req.body.category,
      topic: req.body.topic,
      isAnonymous: Boolean(req.body.isAnonymous),
      fileUpload: req.body.fileUpload,
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
    });
  })
);
postRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (post.isAnonymous) {
      post.postBy = "Unknow People";
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