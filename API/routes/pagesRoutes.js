const express = require("express");
const { getallPages, getPage } = require("../controllers/pageController");

const router = express.Router();

// get all pages
router.get("/pages", getallPages);

// get the data with the id
router.get("/getpage/:id", getPage);

// insert the page data
router.put("/createpage");

module.exports = router;
