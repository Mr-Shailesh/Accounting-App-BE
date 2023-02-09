const mongoose = require("mongoose");

const SupplierSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      require: false,
    },
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
      require: true,
    },
    phone: {
      type: Number,
      require: true,
    },
    companyName: {
      type: String,
      require: true,
    },
    companyEmail: {
      type: String,
      require: true,
    },
    companyLocation: {
      type: String,
      require: true,
    },
    companyGstNo: {
      type: Number,
      require: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Supplier", SupplierSchema);
