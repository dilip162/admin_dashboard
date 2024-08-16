const express = require("express");
const {
  getUsers,
  getUserById,
  createUser,
  updateStudent,
  deleteUser,
  login,
  getCountries,
  getStates,
  getCities,
} = require("../controllers/userController");
const verifyToken = require("../middleware/validateJwt");

// router object
const router = express.Router();

//routes

// GET all user list
router.get("/getall", verifyToken, getUsers);

// GET users by id
router.get("/get/:id", verifyToken, getUserById);

//Create user || POST
router.post("/create", verifyToken, createUser);

// update user || PUT
router.put("/update/:id", verifyToken, updateStudent); // Have some bug to resolve

// Delete user || DELETE
router.delete("/delete/:id", verifyToken, deleteUser);

// check username and password is already exist or not
router.post("/login", login);

// getting the countries data
router.get("/countries", getCountries);

// getting the States
router.get("/countries/states/:id", getStates);

// getting the cities
router.get("/countries/states/city/:id", getCities);

module.exports = router;
