const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./src/routes/authRoutes");
const postRoutes = require("./src/routes/postRoutes");

const connectToDatabase=require("./src/config/db")
const app = express();
dotenv.config()
// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", postRoutes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, async () => {
  await connectToDatabase();
  console.log(`Server is running on port ${port}`);
});
