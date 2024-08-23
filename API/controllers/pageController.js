const db = require("../config/db");

// ------- create page ------------

const createPage = async (req, res) => {
  try {
    const { name, url, title, short_description, category, cat } = req.body;

    if (!name || !url || !title || !short_description || !category || !cat) {
      return res.status(500).send({
        success: false,
        message: "Please provide all field",
      });
    }

    const data = await db.query(
      "INSERT INTO pages (name, url, title, short_description, category, cat) VALUES (?,?,?,?,?,?)",
      [name, url, title, short_description, category, cat]
    );

    if (!data) {
      res.status(401).send({
        success: false,
        message: "Error in INSERT query",
      });
    }

    res.status(200).send({
      success: true,
      message: "page Data Inserted sucessfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in create Pages API",
      error,
    });
  }
};

// --------- get all pages -----------
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

// -------- get page by id -------------

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

// -------- upadte page by id -------------

const updatepage = async (req, res) => {
  try {
    const pageId = req.params.id;

    if (!pageId) {
      return res.status(401).send({
        success: false,
        message: "page id not found",
      });
    }

    const { name, url, title, short_description, category, cat } = req.body;

    if (!name || !url || !title || !short_description || !category || !cat) {
      return res.status(500).send({
        success: false,
        message: "Please provide all field",
      });
    }

    const data = await db.query(
      `UPDATE pages SET name=?, url=?, title=?, short_description=?, category=?, cat=? WHERE id=${pageId}`,
      [name, url, title, short_description, category, cat]
    );

    res.status(200).send({
      success: true,
      message: "data updated sucessfully !",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in update API",
    });
  }
};

// ------------ Delete page data --------------

const deletePage = async (req, res) => {
  try {
    const pageId = req.params.id;

    if (!pageId) {
      return res.status(401).send({
        success: false,
        message: "page id not found",
      });
    }

    await db.query(`DELETE FROM pages WHERE id=?`, [pageId]);
    res.status(200).send({
      success: true,
      message: "Data is deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in delete API",
    });
  }
};

module.exports = { getallPages, getPage, createPage, updatepage, deletePage };
