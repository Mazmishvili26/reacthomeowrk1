const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

const generateToken = (tokenData) => {
  const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
  return token;
};

exports.registerUser = async (req, res) => {
  try {
    const hashedPassword = bcrypt.hashSync(
      req.body.password,
      Number(process.env.SALT)
    );

    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
    });

    const token = generateToken({ id: newUser._id, email: newUser.email });

    return res.json({ token });
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({ message: "Oops... something went wrong" });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const foundUser = await User.findOne({ email });

  if (!foundUser) {
    return res.status(401).json({ message: "Invalid Credentials" });
  }

  const passwordsMatch = await bcrypt.compare(password, foundUser.password);

  if (passwordsMatch) {
    const token = generateToken({ id: foundUser._id, email: foundUser.email });
    return res.json({ token });
  }

  return res.status(401).json({ message: "Invalid Credentials" });
};
