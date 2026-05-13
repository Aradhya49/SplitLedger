require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const expenseRoutes = require("./routes/expenses");

const authRoutes =
  require("./routes/auth");

const app = express();
mongoose.connect(
  process.env.MONGO_URI
)

.then(() => {

  console.log(
    "MongoDB Connected"
  );

})

.catch(err => {

  console.log(err);

});
app.use(cors());
app.use(express.json());

app.use("/expenses", expenseRoutes);
app.use("/auth", authRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});