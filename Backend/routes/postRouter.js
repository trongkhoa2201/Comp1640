const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

router.get("/:id", postController.getPostById);
router.post("/:id/comments", postController.createComment);
router.post("/:id/likes", postController.createLike);

module.exports = router;