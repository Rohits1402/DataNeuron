const jwt = require("jsonwebtoken");
require("dotenv").config();

/**
 * Middleware for authenticating user requests using JWT token.
 */

const authentication = async (req, res, next) => {
  try {
    // Check if Authorization header is present
    if (!req.headers.authorization) {
      return res.status(401).send("Please Login Again");
    }

    const token = req.headers.authorization;

    // Verify JWT token
    await jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
      if (err) {
        // If token is invalid, send error response
        res.status(401).send("Please Login");
      } else {
        // If token is valid, extract user email from decoded token and attach to request body
        req.body.userEmail = decoded.userId;
        next();
      }
    });
  } catch (error) {
    // If any unexpected error occurs, send internal server error response
    console.error("Error in authentication middleware:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { authentication };
