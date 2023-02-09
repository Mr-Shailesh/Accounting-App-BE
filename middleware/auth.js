const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
    console.log("verifyUser", verifyUser);

    const user = await User.findOne({ _id: verifyUser._id });
    console.log("user", user);

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json(error);
  }
};

module.exports = auth;
