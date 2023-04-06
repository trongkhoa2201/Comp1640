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

// departmentRouter.delete(
//   "/:id",
//   expressAsyncHandler(async (req, res) => {
//     const department = await Department.findById(req.params.id);
//     if (department) {
//       await department.deleteOne();
//       res.send({ message: "Department Deleted" });
//     } else {
//       res.status(404).send({ message: "Department Not Found" });
//     }
//   })
// );

// departmentRouter.put(
//   "/:id",
//   expressAsyncHandler(async (req, res) => {
//     const department = await Department.findById(req.params.id);
//     if (department) {
//         department.name = req.body.name || department.name;
//       const updatedDepartment = await department.save();
//       res.send({ message: "Department Updated", department: updatedDepartment });
//     } else {
//       res.status(404).send({ message: "Department Not Found" });
//     }
//   })
// );

export default postRouter;
