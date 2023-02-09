const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const clientRoute = require("./routes/clients");
const supplierRoute = require("./routes/suppliers");
const organizationRoute = require("./routes/organizations");

dotenv.config();

app.use(express.json());
mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB!"))
  .catch(() => console.log("Something went wrong in connection!!"));

// app.post("/users/register")

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/clients", clientRoute);
app.use("/api/suppliers", supplierRoute);
app.use("/api/organizations", organizationRoute);

app.listen(8500, () => {
  console.log("Backend server is running!");
});
