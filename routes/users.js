const router = require("express").Router();
const auth = require("../middleware/auth");
const User = require("../models/User");

// GET ALL USER
router.get("/", auth, async (req, res) => {
  try {
    const user = await req.user.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
