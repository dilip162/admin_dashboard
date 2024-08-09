// --------- getting the data with id -------------------
const mysql = require("mysql2");
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "adminpanel",
  password: "",
});
module.exports = db.promise();
