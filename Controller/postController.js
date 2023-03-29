const Post = require("../Backend/Model/postModel");

exports.getPostById = async (req, res, next) => {
try {
    const post = await Post.findById(req.params.id);
    res.json(post);
} catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
}
};

exports.createComment = async (req, res, next) => {
try {
    const post = await Post.findById(req.params.id);
    const newComment = {
    content: req.body.content,
    author: req.body.author,
    };
    post.comments.unshift(newComment);
    await post.save();
    res.json(newComment);
} catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
}
};

exports.createLike = async (req, res, next) => {
try {
    const post = await Post.findById(req.params.id);
    post.likes += 1;
    await post.save();
    res.json({ likes: post.likes });
} catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
}
};