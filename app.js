const express = require("express");
const path = require("path");

const authRoutes = require("./routes/authRoutes");

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));


// View engine
app.set("view engine", "ejs");

// Routes
app.use("/", authRoutes);

// Server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});