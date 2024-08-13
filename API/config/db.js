const mysql = require("mysql2/promise");

const mySqlPool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "adminpanel",
});

module.exports = mySqlPool;
