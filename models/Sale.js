const mongoose = require("mongoose");
const SaleSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      require: true,
    },
    date: {
      type: Date,
      require: true,
    },
    amount: {
      type: Number,
      required: true,
    },

    // Client COompany Name

    // companyName: {
    //   type: String,
    //   require: true,
    // },
    // organizationName: {
    //   type: String,
    //   require: true,
    // },
    organizationId: {
      type: String,
      require: true,
    },
    // clientName: {
    //   type: String,
    //   require: true,
    // },
    clientId: {
      type: String,
      require: true,
    },
    isExpense: {
      type: Boolean,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Sale", SaleSchema);
