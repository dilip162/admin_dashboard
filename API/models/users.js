const db = require("../db/db");

module.exports = class User {
  fetchAll() {
    return new Promise((resolve, reject) => {
      db.execute("SELECT * FROM users").then(([rows, fieldData]) => {
        resolve(rows); // return data
      });
    });
  }

  fetchUser(username, password) {
    return new Promise((resolve, reject) => {
      db.execute(
        `SELECT * FROM users WHERE username = ${username} AND ${password}`
      ).then(([row]) => {
        console.log(row);
        resolve(row);
      });
    });
  }
};
