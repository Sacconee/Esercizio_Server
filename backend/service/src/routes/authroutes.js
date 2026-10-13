const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Aggiungi .authController qui sotto:
router.post("/login", authController.authController);

module.exports = router;