const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      required: [true, "User email address required"],
      unique: true,
      validate: {
        validator: function (v) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
    phone: {
      type: Number,
      required: [true, "User phone number required"],
      validate: {
        validator: function (v) {
          return /\d{10}/.test(v);
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    gender: {
      type: String,
      required: [true, "please choose category"],
      enum: {
        values: ["Female", "Male", "Other"],
        message: "Please select correct category",
      },
    },
    dob: {
      type: Date,
      require: true,
    },
    address: {
      type: String,
      require: true,
    },
    bio: {
      type: String,
      require: false,
    },
    city: {
      type: String,
      require: true,
    },
    state: {
      type: String,
      require: true,
    },
    contry: {
      type: String,
      require: true,
    },
    zipCode: {
      type: Number,
      require: true,
    },
    url: {
      type: String,
      require: false,
    },
    term: {
      type: Boolean,
      require: true,
    },
    jobTitle: {
      type: String,
      require: false,
    },
    password: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
