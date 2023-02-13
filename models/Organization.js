const mongoose = require("mongoose");

const OrganizationSchema = new mongoose.Schema(
  {
    adminId: {
      type: String,
      require: false,
    },
    organizationName: {
      type: String,
      require: true,
    },
    organizationEmail: {
      type: String,
      require: true,
    },
    organizationLocation: {
      type: String,
      require: true,
    },
    organizationGstNo: {
      type: Number,
      require: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Organization", OrganizationSchema);
