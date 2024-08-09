const express = require("express");

const cors = require("cors");
const userRouter = require("./routes/userRoute");
const app = express();

app.use(cors());
app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use("/", userRouter);
app.get("/", (req, res) => {
  res.send("Home page!");
});

// ____________________

app.get("/users", (req, res) => {
  dbConn.query("SELECT * from userdata", (error, results, fields) => {
    if (error) throw error;
    return res.send({ error: false, data: results, message: "user list" });
  });
});

app.get("/user/:id", (req, res) => {
  let user_id = req.params.id;
  if (!user_id) {
    return res
      .status(400)
      .send({ error: true, message: "user is does not find" });
  }
  dbConn.query(
    "SELECT * from userdata WHERE id=?",
    user_id,
    (error, results, fields) => {
      if (error) throw error;
      return res.send({
        error: false,
        data: results[0],
        message: "users list",
      });
    }
  );
});

app.listen(3000, (err) => {
  if (err) throw err;
  console.log("App is listning on 3000");
});
