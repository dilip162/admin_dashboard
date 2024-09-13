const db = require("../config/db");
// ------- create post ------------

const createPost = async (req, res) => {
  try {
    const { title, description, category_id, image_URL } = req.body;

    if (!title || !description || !category_id || !image_URL) {
      return res.status(500).send({
        success: false,
        message: "Please provide all field",
      });
    }

    const data = await db.query(
      "INSERT INTO posts (title, description, category_id, image_URL) VALUES (?,?,?,?)",
      [title, description, category_id, image_URL]
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
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in create Pages API",
      error,
    });
  }
};

// --------- get all post -----------
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

// -------- get post by id -------------

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

// -------- upadte post by id -------------

const updatePost = async (req, res) => {
  try {
    const postId = req.params.id;

    if (!postId) {
      return res.status(401).send({
        success: false,
        message: "page id not found",
      });
    }

    const { title, description, category_id, image_URL } = req.body;

    if (!title || !description || !category_id || !image_URL) {
      return res.status(500).send({
        success: false,
        message: "Please provide all field",
      });
    }

    const data = await db.query(
      `UPDATE posts SET title=?, description=?, category_id=?, image_URL=? WHERE id=${postId}`,
      [title, description, category_id, image_URL]
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

// ------------ Delete post data --------------

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
