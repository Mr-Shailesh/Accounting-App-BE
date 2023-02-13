const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const saleRoute = require("./routes/sales");
const purchaseRoute = require("./routes/purchases");
const clientRoute = require("./routes/clients");
const supplierRoute = require("./routes/suppliers");
const organizationRoute = require("./routes/organizations");
const cors = require("cors");
// const jwt = require("jsonwebtoken");

dotenv.config();

app.use(express.json());
app.use(cors());
mongoose.set("strictQuery", false);

// const createToken = async () => {
//   const token = await jwt.sign({ _id: "abcd" }, "shailesh");
//   console.log("token", token);

//   const tokenVerify = await jwt.verify(token, "shailesh");
//   console.log("tokenVerify", tokenVerify);
// };

// createToken();

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB!"))
  .catch(() => console.log("Something went wrong in connection!!"));

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/sales", saleRoute);
app.use("/api/purchases", purchaseRoute);
app.use("/api/clients", clientRoute);
app.use("/api/suppliers", supplierRoute);
app.use("/api/organizations", organizationRoute);

app.listen(8500, () => {
  console.log("Backend server is running!");
});
