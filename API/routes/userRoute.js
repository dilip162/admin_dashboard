const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userController");

/* GET programming languages. */
userRouter.get("/login", async function (req, res, next) {
  try {
    userController.getUsers(req, res, next).then((resp) => {
      res.status(200).send(resp);
    });
  } catch (err) {
    console.error(`Error while getting programming languages `, err.message);
    next(err);
  }
});
module.exports = userRouter;
