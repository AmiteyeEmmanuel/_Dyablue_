const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = async (req, res, next) => {
  try {
    // Check if there is a token in the request headers
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(401).json({
        message: 'Unauthorized. Please provide a token.',
        success: false
      });
    }

    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) {
        return res.status(401).json({
          message: 'Unauthorized. Invalid token.',
          success: false
        });
      } else {
        req.user = decoded; // Store decoded token in req.user for further use
        next(); // Move to the next middleware or route handler
      }
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Internal Server Error',
      success: false,
      error: error.message
    });
  }
};
