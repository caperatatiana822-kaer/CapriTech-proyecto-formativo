const express = require('express');
const router = express.Router();
const {login, forgotPassword, newPassword} = require('../controllers/authController');

router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/new-password', newPassword);

module.exports = router;