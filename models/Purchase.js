const mongoose = require("mongoose");
const PurchaseSchema = new mongoose.Schema(
  {
    adminId: {
      type: String,
      require: false,
    },
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
    organizationId: {
      type: String,
      require: true,
    },
    organizationName: {
      type: String,
      require: true,
    },
    userId: {
      type: String,
      require: true,
    },
    userName: {
      type: String,
      require: true,
    },
    companyName: {
      type: String,
      require: true,
    },
    isExpense: {
      type: Boolean,
      require: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Purchase", PurchaseSchema);
