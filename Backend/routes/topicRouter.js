import express from "express";
import Topic from "../Model/topicModel.js";
import Post from "../Model/postModel.js";
import expressAsyncHandler from "express-async-handler";
import { isAuth } from "../utils.js";

const topicRouter = express.Router();

topicRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const topics = await Topic.find({});
    res.send(topics);
  })
);

topicRouter.post(
  "/createTopic",
  expressAsyncHandler(async (req, res) => {
    const newTopic = new Topic({
      title: req.body.title,
      description: req.body.description,
      firstClosure: req.body.firstClosure,
      finalClosure: req.body.finalClosure,

    });
    const topic = await newTopic.save();
    res.send({
      _id: topic._id,
      title: topic.title,
      description: topic.description,
      firstClosure: topic.firstClosure,
      finalClosure: topic.finalClosure,
    });
  })
);

topicRouter.delete(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const posts = await Post.find({ topic: req.params.id });
    if(posts.length === 0){
      const topic = await Topic.findById(req.params.id);
      if (topic) {
        await topic.deleteOne();
        res.send({ message: "Topic Deleted" });
      } else {
        res.status(404).send({ message: "Topic Not Found" });
      }
    }
    else{
      res.status(404).send({ message: "This topic can be deleted" });
    }
  })
);

topicRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const topic = await Topic.findById(req.params.id);
    if (topic) {
      res.send(topic);
    } else {
      res.status(404).send({ message: "Topic Not Found" });
    }
  })
);

topicRouter.put(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const topic = await Topic.findById(req.params.id);
    if (topic) {
        topic.title = req.body.title || topic.title;
        topic.description = req.body.description || topic.description;
        topic.firstClosure = req.body.firstClosure || topic.firstClosure;
        topic.finalClosure = req.body.finalClosure || topic.finalClosure;
      const updatedTopic = await topic.save();
      res.send({ message: "Topic Updated", topic: updatedTopic });
    } else {
      res.status(404).send({ message: "Topic Not Found" });
    }
  })
);

export default topicRouter;
