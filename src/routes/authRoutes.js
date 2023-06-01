const express = require("express");
const authController = require("../controllers/authController");
const {
  validateSignup,
  validateSignIn,
} = require("../validator/authValidator");

const router = express.Router();

router.post("/register", validateSignup, authController.register);
router.post("/login", validateSignIn, authController.login);

module.exports = router;
