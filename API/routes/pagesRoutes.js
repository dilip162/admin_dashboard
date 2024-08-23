const express = require("express");
const {
  getallPages,
  getPage,
  createPage,
  updatepage,
  deletePage,
} = require("../controllers/pageController");
const { route } = require("./userRoutes");

const router = express.Router();

// get all pages
router.get("/pages", getallPages);

// get data with id
router.get("/getpage/:id", getPage);

// insert page data or create page
router.post("/createpage", createPage);

// update page data
router.put("/updatepage/:id", updatepage);

// delete pages by id
router.delete("/deletepage/:id", deletePage);

module.exports = router;
