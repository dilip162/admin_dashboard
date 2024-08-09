const db = require("../db/db");

module.exports = class User {
  fetchAll() {
    return new Promise((resolve, reject) => {
      db.execute("SELECT * FROM users").then(([rows, fieldData]) => {
        resolve(rows); // return data
      });
    });
  }
};
