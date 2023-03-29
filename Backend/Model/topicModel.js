import mongoose from "mongoose";

const TopicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  firstClosure: { type: Date, default: Date.now },
  finalClosure: { type: Date, default: Date.now },
});

const Topic = mongoose.model("topic", TopicSchema);
export default Topic;
