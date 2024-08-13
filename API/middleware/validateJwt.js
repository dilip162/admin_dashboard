const jwt = require("jsonwebtoken");

// Secret key for signing the token
const secretKey = process.env.JWT_SECRET_KEY;

function verifyToken(req, res, next) {
  let token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];
  console.log(token);
  console.log(secretKey);

  if (!token) {
    return res.status(401).json({ message: "Access denied no token provided" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, secretKey);
    console.log(decoded);
    req.user = decoded; // Attach the decoded payload to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    res.status(400).json({ message: "Invalid token." });
  }
}

module.exports = verifyToken;
