const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1];
  const user = await User.findOne({ token });
  if (!user) return res.status(401).json({ message: "Invalid token" });

  req.user = user;
  next();
};

module.exports = authMiddleware;
