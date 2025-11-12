const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors"); // ✅ Import CORS
const path = require("path");
const { connectDb } = require("./config/database");
const userRouter = require("./routes/user.Routes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDb();

// ✅ Use CORS (you can allow all origins or restrict later)
app.use(cors({
  origin: "*", // or specify frontend domain like: "http://localhost:5173"
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(express.json());

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, "../client/dist")));

app.use("/api/v1/user", userRouter);

// Handle React routing, return all requests to React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
