const express = require("express");
const app = express();

app.listen(process.env.PORT, () => {
  console.log("database connection established!");
});

app.get("/contact", (req, res) => {
  res.send("Hello from the contact");
});
