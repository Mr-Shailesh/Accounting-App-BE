const router = require("express").Router();
const User = require("../models/User");

// GET ALL USER
router.get("/", async (req, res) => {
  try {
    const user = await User.find();
    console.log("user", user);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
