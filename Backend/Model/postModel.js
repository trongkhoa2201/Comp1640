import mongoose from "mongoose";
const commentSchema = new mongoose.Schema(
  {
    commentBy: { type: String },
    avtCmt: { type: String,default: null, },
    content: { type: String },
    isAnonymous: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  },
  postBy: {
    type: String,
  },
  fileUpload: {
    type: String,
    default: null,
  },
  topic: { type: mongoose.Schema.Types.ObjectId, ref: "Topic", required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  isAnonymous: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  comments: [commentSchema],
  views:{type : Number, default: 0},
  likes: {type : Number, default: 0},
  dislikes: {type : Number, default: 0},
});

const Post = mongoose.model("post", PostSchema);
export default Post;