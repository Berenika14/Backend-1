const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(400).json("token required");
  } else {
    jwt.verify(token, "any random character", (err, decodedToken) => {
      if (err) {
        res.status(401).json("token invalid");
      } else {
        req.decodedJWT = decodedToken;
        next();
      }
    });
  }
};
