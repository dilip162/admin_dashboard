const db = require("../config/db");
const sendMail = require("../utils/mailer");
// ------- create page ------------

const createPost = async (req, res) => {
  try {
    const { author, title, content } = req.body;

    if (!author || !title || !content) {
      return res.status(500).send({
        success: false,
        message: "Please provide all field",
      });
    }

    const data = await db.query(
      "INSERT INTO posts (author, title, content) VALUES (?,?,?)",
      [author, title, content]
    );

    if (!data) {
      res.status(401).send({
        success: false,
        message: "Error in INSERT query",
      });
    }

    res.status(200).send({
      success: true,
      message: "post Data Inserted sucessfully",
    });

    sendMail(
      "dilipbaghel162@gmail.com",
      "Data is created",
      "This mail is to inform you that the new data in 'posts' database has been created successfully"
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
const getallPosts = async (req, res) => {
  try {
    const data = await db.query("SELECT * FROM posts");

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

const getPost = async (req, res) => {
  try {
    const postId = req.params.id;
    if (!postId) {
      return res.status(401).send({
        success: false,
        message: "Id is not correct",
      });
    }

    const data = await db.query("SELECT * FROM posts WHERE id = ?", [postId]);

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

const updatePost = async (req, res) => {
  try {
    const postId = req.params.id;

    if (!postId) {
      return res.status(401).send({
        success: false,
        message: "page id not found",
      });
    }

    const { author, title, content } = req.body;

    if (!author || !title || !content) {
      return res.status(500).send({
        success: false,
        message: "Please provide all field",
      });
    }

    const data = await db.query(
      `UPDATE posts SET author=?, title=?, content=? WHERE id=${postId}`,
      [author, title, content]
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

const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;

    if (!postId) {
      return res.status(401).send({
        success: false,
        message: "post id not found",
      });
    }

    await db.query(`DELETE FROM posts WHERE id=?`, [postId]);
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
  deletePost,
  updatePost,
  getPost,
  createPost,
  getallPosts,
};
