const express = require("express");
const {
  allCategories,
  createcategory,
  upadteCategory,
  getCategory,
  deleteCategory,
} = require("../controllers/categoryController");

const router = express.Router();

// Get all categogy
router.get("/categories", allCategories);

// create the category
router.post("/createcategory", createcategory);

// update the category
router.put("/updatecategory/:id", upadteCategory);

// get the category by the id
router.get("/catebyid/:id", getCategory);

// delete category
router.delete("/deletecat/:id", deleteCategory);

module.exports = router;
