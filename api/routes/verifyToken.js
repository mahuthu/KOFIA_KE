const jwt = require("jsonwebtoken");

// Verify Token Middleware
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res.status(401).json({ message: "Token is expired!" });
        }
        console.error("Token verification failed:", err);
        return res.status(403).json({ message: "Token is not valid!" });
      }
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json({ message: "You are not authenticated!" });
  }
};

// Middleware to verify token and authorization
const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not allowed to do that!");
    }
  });
};

// Middleware to verify token and admin privileges
const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not allowed to do that!");
    }
  });
};

// Refresh Token Endpoint
const refreshToken = (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(401).json("You are not authenticated!");

  jwt.verify(token, process.env.JWT_REFRESH_SEC, (err, user) => {
    if (err) return res.status(403).json("Refresh token is not valid!");

    const newAccessToken = jwt.sign(
      { id: user.id, isAdmin: user.isAdmin },
      process.env.JWT_SEC,
      { expiresIn: "15m" }
    );

    res.status(200).json({
      accessToken: newAccessToken,
    });
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  refreshToken,
};
