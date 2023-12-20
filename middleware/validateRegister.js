const validateRegistration = (req, res, next) => {
  const validationErrors = [];

  for (const prop in req.body) {
    if (!req.body[prop]) {
      return res.status(400).json({ errorMessage: "All fields are required" });
    }
  }

  const emailRegex = new RegExp(
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  );

  if (!emailRegex.test(req.body.email)) {
    validationErrors.push("Invalid email");
  }

  if (req.body.password.length < 8) {
    validationErrors.push("Invalid password");
  }

  if (validationErrors.length) {
    return res.status(422).json({ errorMessage: validationErrors });
  }

  // Proceed to the next middleware or route handler
  return next();
};

module.exports = validateRegistration;
