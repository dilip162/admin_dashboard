const express = require("express");
const {
  getPost,
  createPost,
  deletePost,
  getallPosts,
  updatePost,
} = require("../controllers/postController");

const router = express.Router();

// Get all posts
router.get("/posts", getallPosts);

// create the post
router.post("/createpost", createPost);

// update the post
router.put("/updatepost/:id", updatePost);

// get the post by the id
router.get("/postbyid/:id", getPost);

// delete post
router.delete("/deletepost/:id", deletePost);

module.exports = router;
