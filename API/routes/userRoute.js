const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userController");

/* GET programming languages. */
userRouter.get("/users", async function (req, res, next) {
  try {
    userController.getUsers(req, res, next).then((resp) => {
      res.status(200).send(resp);
    });
  } catch (err) {
    console.error(`Error while getting all user data `, err.message);
    next(err);
  }
});

userRouter.post("/user", async (req, res, next) => {
  try {
    userController.getUser(req, res, next).then((resp) => {
      const username = req.body.username;
      const password = req.body.password;
      res.status(200).send(resp);
    });
  } catch (error) {
    console.log("Something went wrong in getting username and password");
    next(err);
  }
});

module.exports = userRouter;
