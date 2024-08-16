const db = require("../config/db");

const getallPages = async (req, res) => {
  try {
    const data = await db.query("SELECT * FROM pages");

    if (!data) {
      return res.status(401).send({
        success: false,
        message: "data is not getting",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get the pages API",
    });
  }
};

module.exports = { getallPages };
