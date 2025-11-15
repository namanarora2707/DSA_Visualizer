const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const { connectDb } = require("./config/database");
const userRouter = require("./routes/user.Routes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Get the absolute path to the client dist directory
const clientDistPath = path.resolve(__dirname, "../client/dist");

connectDb();

// Use CORS
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(express.json());

// Serve static files from the React app build directory
app.use(express.static(clientDistPath));

// API routes (must come before catch-all)
app.use("/api/v1/user", userRouter);

// Handle React routing — catch all other requests and serve index.html
// This must be AFTER all other routes
app.get("*", (req, res) => {
  res.sendFile(path.join(clientDistPath, "index.html"), (err) => {
    if (err) {
      console.error("Error serving index.html:", err);
      res.status(500).send("Internal Server Error");
    }
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Serving static files from: ${clientDistPath}`);
});
