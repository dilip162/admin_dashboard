const express = require("express");
const {
  getPost,
  createPost,
  deletePost,
  getallPosts,
  updatePost,
} = require("../controllers/postController");

const router = express.Router();

// Get all categogy
router.get("/posts", getallPosts);

// create the category
router.post("/createpost", createPost);

// update the category
router.put("/updatepost/:id", updatePost);

// get the category by the id
router.get("/postbyid/:id", getPost);

// delete category
router.delete("/deletepost/:id", deletePost);

module.exports = router;
