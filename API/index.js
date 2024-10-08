const express = require("express");
const dotenv = require("dotenv");
const mySqlPool = require("./config/db");
const cors = require("cors");
// rest objest
const app = express();

// config dotenv
dotenv.config();

// middleware
app.use(express.json());
app.use(cors());

// routes
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/page", require("./routes/pagesRoutes"));
app.use("/api/v1/category", require("./routes/categoryRoutes"));
app.use("/api/v1/post", require("./routes/postRoutes"));

app.get("/test", (req, res) => {
  res.status(200).send("App is running!");
});

// PORT
const PORT = process.env.PORT || 8000;

// Conditionally listen
mySqlPool
  .query("SELECT 1")
  .then(() => {
    //my connection
    console.log("mysql db connected");
    app.listen(PORT, () => {
      console.log(`App is running on ${PORT} port`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
