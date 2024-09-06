const db = require("../config/db");
const sendMail = require("../utils/mailer");
// ------- create page ------------

const createPage = async (req, res) => {
  try {
    const {
      name,
      title,
      short_description,
      description,
      category,
      cat,
      image_URL,
    } = req.body;

    if (
      !name ||
      !title ||
      !short_description ||
      !description ||
      !category ||
      !cat ||
      !image_URL
    ) {
      return res.status(500).send({
        success: false,
        message: "Please provide all field",
      });
    }

    const data = await db.query(
      "INSERT INTO pages (name, title, short_description, description, category, cat, image_URL) VALUES (?,?,?,?,?,?,?)",
      [name, title, short_description, description, category, cat, image_URL]
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

    sendMail(
      "dilipbaghel162@gmail.com",
      "Data is created",
      "This mail is to inform you that the new data in 'pages' database has been created successfully"
    );
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

    const {
      name,
      title,
      short_description,
      description,
      category,
      cat,
      image_URL,
    } = req.body;

    if (
      !name ||
      !title ||
      !short_description ||
      !description ||
      !category ||
      !cat ||
      !image_URL
    ) {
      return res.status(500).send({
        success: false,
        message: "Please provide all field",
      });
    }

    const data = await db.query(
      `UPDATE pages SET name=?, title=?, short_description=?, description=?, category=?, cat=?, image_URL=? WHERE id=${pageId}`,
      [name, title, short_description, description, category, cat, image_URL]
    );

    res.status(200).send({
      success: true,
      message: "data updated sucessfully !",
    });

    sendMail(
      "dilipbaghel162@gmail.com",
      "Data is updated",
      "This mail is to inform you that the data of pages database has been updated successfully"
    );
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

    sendMail(
      "dilipbaghel162@gmail.com",
      "Data is deleted",
      "This mail is to inform you that the data of pages database has been deleted successfully"
    );
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in delete API",
    });
  }
};

module.exports = {
  getallPages,
  getPage,
  createPage,
  updatepage,
  deletePage,
};
