const express = require("express");
const dotenv = require("dotenv");
const mySqlPool = require("./config/db");

// rest objest
const app = express();

// config dotenv
dotenv.config();

// middleware
app.use(express.json());

// routes
app.use("/api/v1/user", require("./routes/userRoutes"));

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
