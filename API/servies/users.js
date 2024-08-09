const db = require("../db/db");
const helper = require("../helper");
const config = require("../config");

async function getUsersData(payload) {
  db.connect((err) => {
    if (err) throw err;
    console.log("Mysql is connected!");
  });
  //   const offset = helper.getOffset(page, config.listPerPage);
  //   const rows = await db.query(
  //     `SELECT id, name, released_year, githut_rank, pypl_rank, tiobe_rank
  //     FROM programming_languages LIMIT ${offset},${config.listPerPage}`
  //   );
  //   const data = helper.emptyOrRows(rows);
  //   const meta = { page };

  return {
    check: "test",
  };
}
