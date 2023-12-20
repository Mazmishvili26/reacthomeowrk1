const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const { headers } = req;

  if (!headers.authorization) {
    return res
      .status(400)
      .json({ errorMessage: "Authorization header not provided" });
  }

  const [tokenType, token] = headers.authorization.split(" ");

  if (tokenType !== "Bearer" || !token) {
    return res.status(401).json({ errorMessage: "Invalid or missing token" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decodedToken;
  } catch (error) {
    return res
      .status(401)
      .json({ errorMessage: "Invalid authorization information" });
  }

  // Proceed to the next middleware or route handler
  return next();
};

module.exports = authenticateToken;
