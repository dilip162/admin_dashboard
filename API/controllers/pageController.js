const db = require("../config/db");

// create the pages

const createPage = async (req, res) => {
  try {
    const [name, url, title, short_description, category, cat] = req.body;

    const data = await db.query(
      `INSERT INTO pages (name, url, title, short_description, category, cat) VALUES (?,?,?,?,?,?),[${name}, ${url}, ${title}, ${short_description}, ${category}, ${cat}]`
    );

    if (!data) {
      res.status(401).send({
        success: false,
        message: "data not inserted",
      });
    }
    res.status(200).send({
      success: true,
      message: "Data inserted succesfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in create page API",
    });
  }
};

// get all pages
const getallPages = async (req, res) => {
  try {
    const data = await db.query("SELECT * FROM pages");

    if (!data) {
      return res.status(401).send({
        success: false,
        message: "data is not getting",
      });
    }

    res.status(200).send({
      success: true,
      message: "All pages data are found",
      totalPages: data[0].length,
      data: data[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get the pages API",
    });
  }
};

// get the page by id

const getPage = async (req, res) => {
  try {
    const pageId = req.params.id;
    if (!pageId) {
      return res.status(401).send({
        success: false,
        message: "Id is not correct",
      });
    }

    const data = await db.query("SELECT * FROM pages WHERE id = ?", [pageId]);

    if (!data) {
      res.status(401).send({
        success: false,
        message: "no records found",
      });
    }

    res.status(200).send({
      success: true,
      pageDetails: data[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get id page API ",
      error,
    });
  }
};

module.exports = { getallPages, getPage, createPage };
