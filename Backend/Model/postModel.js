const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    content: String,
    author: String,
    default: null,
});

const PostSchema = new mongoose.Schema({
    title: String,
    content: String,
    likes: {
    type: Number,
    default: 0,
    },
    comments: [CommentSchema],
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;