const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization; 
    if (!token) {
      return res.status(401).send("Authorization token is required");
    }

    const splitedToken = token.split(" ")[1];
    if (!splitedToken) {
      return res.status(401).send("Invalid token format");
    }

    const decodedUser = jwt.verify(splitedToken, process.env.JWT_SECRET);
    console.log(decodedUser);

    if (!decodedUser) {
      return res.status(400).send("User not authorized");
    }

    req.user = decodedUser; 
    next();
  } catch (error) {
    console.error("Authorization error:", error.message);
    return res.status(401).send("Invalid or expired token");
  }
};

module.exports = { authMiddleware };
