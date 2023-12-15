const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

const genToken = (tokenParams) => {
  const token = jwt.sign(tokenParams, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
  return token;
};

exports.registration = async (req, res) => {
  try {
    const encryptedPassword = bcrypt.hashSync(
      req.body["password"],
      Number(process.env.SALT)
    );
    const user = await User.create({
      ...req.body,
      password: encryptedPassword,
    });
    return res.send({ token: genToken({ id: user._id, email: user.email }) });
  } catch (_) {
    return res.send({ message: "Ooops... something went wrong" });
  }
};

exports.login = async (req, res) => {
  if (!req.body["email"] || !req.body["password"]) {
    return res.status(400).send({ message: "all fields are required" });
  }

  const { email, password } = req.body;
  const foundUser = await User.findOne({ email });

  if (!foundUser)
    return res.status(401).send({ message: "Invalid Credentials" });

  const passwordsMatch = await bcrypt.compare(password, foundUser.password);

  if (passwordsMatch) {
    return res.send({
      token: genToken({ id: foundUser.id, email: foundUser.email }),
    });
  }

  return res.status(401).send({ message: "Invalid Credentials" });
};
