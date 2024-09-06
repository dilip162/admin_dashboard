const db = require("../config/db");

// ---------- get all category -----------

const allCategories = async (req, res) => {
  try {
    const data = await db.query("SELECT * FROM category");

    if (!data) {
      return res.status(401).send({
        success: false,
        message: "category is not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "",
      totalCategory: data[0].length,
      data: data[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting all category API",
    });
  }
};

//--------- Create new category ------------

const createcategory = async (req, res) => {
  try {
    const { title, each_sub, category_URL, image, description } = req.body;
    if (!title || !each_sub || !category_URL || !image || !description) {
      return res.status(401).send({
        success: false,
        message: "please provide the all data",
      });
    }

    const data = await db.query(
      "INSERT INTO category (title, each_sub, category_URL, image, description) VALUES (?,?,?,?,?)",
      [title, each_sub, category_URL, image, description]
    );

    if (!data) {
      res.status(401).send({
        success: false,
        message: "Error in INSERT query",
      });
    }
    +res.status(200).send({
      success: true,
      message: "Data is added sucessfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in creating category API",
    });
  }
};

// ------------- Update the category -------------

const upadteCategory = async (req, res) => {
  try {
    const catId = req.params.id;

    if (!catId) {
      return res.status(401).send({
        success: false,
        message: "please provide the correct Id",
      });
    }

    const { title, each_sub, category_URL, image, description } = req.body;
    if (!title || !each_sub || !category_URL || !image || !description) {
      return res.status(401).send({
        success: false,
        message: "please provide the all data",
      });
    }

    const data = await db.query(
      `UPDATE category SET title=?, each_sub=?, category_URL=?, image=?, description=? WHERE id = ${catId}`,
      [title, each_sub, category_URL, image, description]
    );

    res.status(200).send({
      success: true,
      message: "Data is upadted sucessfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in update category API",
    });
  }
};

// ---------- Get category by Id ---------------

const getCategory = async (req, res) => {
  try {
    const catId = req.params.id;
    if (!catId) {
      return res.status(401).send({
        success: false,
        message: "Id is not correct",
      });
    }

    const data = await db.query("SELECT * FROM category WHERE id = ?", [catId]);

    if (!data) {
      res.status(401).send({
        success: false,
        message: "no records found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Data recieve succesfully!",
      catDetails: data[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get id category API ",
      error,
    });
  }
};

// ---------- Delete the category -----------

const deleteCategory = async (req, res) => {
  try {
    const catId = req.params.id;

    if (!catId) {
      return res.status(401).send({
        success: false,
        message: "Provide the correct id",
      });
    }

    const data = await db.query("DELETE FROM category WHERE id=?", [catId]);

    if (!data) {
      res.status(401).send({
        success: false,
        message: "Error in Delete query",
      });
    }

    res.status(200).send({
      success: true,
      message: "Category is deleted succesfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in delete category APi",
    });
  }
};

module.exports = {
  allCategories,
  createcategory,
  upadteCategory,
  getCategory,
  deleteCategory,
};
