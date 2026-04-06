const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json("No token, access denied");
    }

    const decoded = jwt.verify(token, "secret");

    req.user = decoded; // attach user info
    next();
  } catch (err) {
    res.status(403).json("Invalid token");
  }
};

module.exports = authMiddleware;