const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "adminpanel",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("connected to mysql");
});

connection.query("SELECT * FROM userdata", (err, results) => {
  if (err) throw err;
  console.log(results);
});
