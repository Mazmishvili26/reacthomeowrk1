const validateCategory = (req, res, next) => {
  const categoryName = req.body.name.trim();

  if (!categoryName) {
    return res.status(422).json({ errorMessage: "Invalid category name" });
  }

  // Proceed to the next middleware or route handler
  return next();
};

module.exports = validateCategory;
