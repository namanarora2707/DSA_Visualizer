const express = require("express");
const dotenv = require("dotenv");
const { connectDb } = require("./config/database");
const userRouter = require("./routes/user.Routes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDb();

app.use(express.json());

app.use("/api/v1/user", userRouter);

app.get("/", (req, res) => {
  res.send("Welcome to Nodejs Authentication Tutorial");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
