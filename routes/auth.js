const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");

// REGISTER
router.post("/register", async (req, res) => {
  try {
    console.log("req", req);
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
      gender: req.body.gender,
      dob: req.body.dob,
      address: req.body.address,
      bio: req.body.bio,
      city: req.body.city,
      state: req.body.state,
      country: req.body.country,
      zipCode: req.body.zipCode,
      url: req.body.url,
      term: req.body.term,
      jobTitle: req.body.jobTitle,
      email: req.body.email,
      password: hashedPass,
    });

    const token = await newUser.generateAuthToken();

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// LOGIN
router.post("/login", auth, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json("Wrong Email!!");
    }
    const validated = await bcrypt.compare(req.body.password, user.password);
    if (!validated) {
      return res.status(400).json("Wrong Password!!");
    }
    const token = await user.generateAuthToken();
    console.log("token", token);
    const { password, tokens, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
    console.log("Error ==> ", err);
  }
});

// LOGOUT
router.get("/logout", async (req, res) => {
  try {
    // req.user.tokens = req.suer.tokens.filter((currElement) => {
    //   return currElement.token !== req.token;
    // });
    // await req.user.save()
    console.log("req", req);
    console.log("logout");
  } catch (error) {
    res.status(500).json(err);
  }
});

module.exports = router;
