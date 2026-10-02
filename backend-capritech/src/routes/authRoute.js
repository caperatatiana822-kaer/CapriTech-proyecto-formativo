const express = require("express");
const bcrypt = require("bcrypt");
const {
    login,
    forgotPassword,
    verifyResetToken,
    resetPassword
} = require("../controllers/authController");

const router = express.Router();

router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/verify-reset-token", verifyResetToken);
router.post("/reset-password", resetPassword);

module.exports = router;