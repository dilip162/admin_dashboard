const db = require("../config/db");
const jwt = require("jsonwebtoken");

// Secret key for signing the token
const secretKey = process.env.JWT_SECRET_KEY;

// GET all user list
const getUsers = async (req, res) => {
  try {
    const data = await db.query("SELECT * FROM users");

    if (!data) {
      return res.status(401).send({
        success: false,
        message: "data not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "All user record",
      totalUsers: data[0].length,
      data: data[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in GET all user API",
      error,
    });
  }
};

// GET users by id
const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(401).send({
        success: false,
        message: "invalid student id provided",
      });
    }
    const data = await db.query("SELECT * FROM users WHERE id=?", [userId]);
    if (!data) {
      res.status(401).send({
        success: false,
        message: "No records found ",
      });
    }
    res.status(200).send({
      success: true,
      userDetails: data[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get user by Id API",
      error,
    });
  }
};

const createUser = async (req, res) => {
  try {
    const {
      username,
      password,
      email,
      fname,
      lname,
      gender,
      address,
      city,
      state,
      pincode,
      country,
      image_URL,
      remember,
    } = req.body;

    if (
      !username ||
      !password ||
      !email ||
      !fname ||
      !lname ||
      !gender ||
      !address ||
      !city ||
      !state ||
      !pincode ||
      !country ||
      !image_URL ||
      !remember
    ) {
      return res.status(500).send({
        success: false,
        message: "Please provide all field",
      });
    }

    const data = await db.query(
      "INSERT INTO users (username, password, email, fname, lname, gender, address, city, state, pincode, country, image_URL, remember) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        username,
        password,
        email,
        fname,
        lname,
        gender,
        address,
        city,
        state,
        pincode,
        country,
        image_URL,
        remember,
      ]
    );

    if (!data) {
      res.status(401).send({
        success: false,
        message: "Error in INSERT query",
      });
    }

    res.status(200).send({
      success: true,
      message: "user Data Inserted sucessfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in create student API",
      error,
    });
  }
};

// Update user
const updateStudent = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(401).send({
        success: false,
        message: "Invalid id or provide the id",
      });
    }
    const {
      username,
      password,
      email,
      fname,
      lname,
      gender,
      address,
      city,
      state,
      pincode,
      country,
      image_URL,
      remember,
    } = req.body;
    console.log(req);
    const data = await db.query(
      `UPDATE users SET username=?, password=?, email=?, fname=?, lname=?, gender=?, address=?, city=?, state=?, pincode=?, country=?, image_URL=?, remember=? WHERE id=${userId}`,
      [
        username,
        password,
        email,
        fname,
        lname,
        gender,
        address,
        city,
        state,
        pincode,
        country,
        image_URL,
        remember,
        userId,
      ]
    );

    if (!data) {
      return res.status(500).send({
        success: false,
        message: "Error in updating data",
      });
    }

    res.status(200).send({
      success: true,
      message: "user Data updated",
    });

    if (!userId) {
      return res.status(401).send({
        success: false,
        message: "user Id is not valid",
      });
    }

    return;
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in update user API",
      error,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const studentId = req.params.id;
    if (!studentId) {
      return res.status(401).send({
        success: false,
        message: "Invalid user id entered",
      });
    }

    await db.query("DELETE FROM users WHERE id =?", [studentId]);
    res.status(200).send({
      success: true,
      message: "user deleted sucessfully",
    });
  } catch (error) {
    console.log(error);
    res.status.send({
      success: false,
      message: "Error in delete user API",
      error,
    });
  }
};

//Login user

const login = async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    const query = "SELECT * FROM users WHERE username=? AND password=?";

    db.query(query, [username, password]).then(([results, fields]) => {
      if (results.length > 0) {
        const payload = {
          id: results[0].id,
          username: results[0].username,
          email: results[0].email,
        };

        // Options for the token
        const options = {
          expiresIn: "1h", // Token will expire in 1 hour
        };

        // Create the token
        const token = jwt.sign(payload, secretKey, options);
        // console.log(token);

        res.status(200).send({
          success: true,
          data: results[0],
          token: token,
          message: "you logged in sucessfully!",
        });
      } else {
        return res.status(401).send({
          success: "false",
          message: "you cannot login",
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "Invalid username or password",
    });
  }
};

// ----------------------- Getting the form data -------------------

// Getting the countries

const getCountries = async (req, res) => {
  try {
    const data = await db.query("SELECT * FROM countries");

    if (!data) {
      return res.status(401).send({
        success: false,
        message: "data not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "All countries record",
      totalCountries: data[0].length,
      data: data[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in GET all user API",
      error,
    });
  }
};

// Getting the states

const getStates = async (req, res) => {
  try {
    const countryId = req.params.id;

    if (!countryId) {
      return res.status(401).send({
        success: false,
        message: "invalid Country id provided",
      });
    }
    const data = await db.query("SELECT * FROM states WHERE country_id=?", [
      countryId,
    ]);
    if (!data) {
      res.status(401).send({
        success: false,
        message: "No records found ",
      });
    }
    res.status(200).send({
      success: true,
      stateDetails: data[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get states by Id API",
      error,
    });
  }
};

// getting the cities

const getCities = async (req, res) => {
  try {
    const stateId = req.params.id;

    if (!stateId) {
      return res.status(401).send({
        success: false,
        message: "invalid state id provided",
      });
    }
    const data = await db.query("SELECT * FROM cities WHERE state_id=?", [
      stateId,
    ]);
    if (!data) {
      res.status(401).send({
        success: false,
        message: "No records found ",
      });
    }
    res.status(200).send({
      success: true,
      cityDetails: data[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get states by Id API",
      error,
    });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateStudent,
  deleteUser,
  login,
  getCountries,
  getStates,
  getCities,
};
