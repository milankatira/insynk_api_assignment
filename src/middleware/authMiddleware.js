const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ error: 'Authorization token not found' });
    }

    // Verify and decode the token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Extract the user ID from the decoded token
    const userId = decodedToken.userId;

    // Check if the user exists
    const user = await User.findById(userId);

    if (!user) {
      return res.status(401).json({ error: 'Invalid user' });
    }

    // Attach the user object to the request
    req.user = { userId };

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error('Error authenticating user:', error);
    res.status(401).json({ error: 'Authentication failed' });
  }
};

module.exports = authMiddleware;
