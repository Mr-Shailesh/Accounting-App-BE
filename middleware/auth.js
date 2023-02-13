const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = async (req, res, next) => {
  try {
    const token = req.header("authorization").replace("Bearer ", "");
    const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findOne({ _id: verifyUser._id });
    req.userId = verifyUser._id;
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json(error);
  }
};

module.exports = auth;
