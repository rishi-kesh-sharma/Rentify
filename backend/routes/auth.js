const express = require("express");
const router = express.Router();
const { login, logout, register } = require("../controllers/auth.js");
const { authenticate } = require("../middleware/auth.js");

router.post("/", register);
router.post("/login", login);
router.get("/logout", authenticate, logout);

module.exports = router;
