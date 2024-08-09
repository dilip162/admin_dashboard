const User = require("../models/users");

exports.getUsers = async (req, res, next) => {
  const user = new User();
  let data = await user.fetchAll();
  //res.status(200).send(data);
  return data;
};

exports.getUser = async (req, res, next) => {
  const user = new User();
  let userData = await user.fetchUser();
  return userData;
};
