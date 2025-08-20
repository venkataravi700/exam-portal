const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  // Get the token from the 'Authorization' header
  const tokenHeader = req.header('Authorization');

  // Check if no token is provided
  if (!tokenHeader) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }
  
  // The token should be in the format "Bearer <token>"
  const token = tokenHeader.replace('Bearer ', '');

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Attach the user information from the token to the request object
    req.user = decoded.user;
    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    // If token is invalid, send a 401 Unauthorized response
    res.status(401).json({ message: 'Token is not valid' });
  }
};
