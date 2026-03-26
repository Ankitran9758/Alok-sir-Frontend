const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

// Pages
router.get("/", authController.loginPage);
router.get("/login", authController.loginPage);
router.get("/register", authController.registerPage);

// Actions
router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);

module.exports = router;