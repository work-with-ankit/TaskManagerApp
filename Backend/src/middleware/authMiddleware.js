const jwt = require('jsonwebtoken');
const User = require('../models/userModels');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.SECRET_KEY);

      req.user = await User.findById(decoded.id).select('-password');

      return next(); 
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  
  return res.status(401).json({ message: 'Not authorized, no token' });
};

module.exports = { protect };
