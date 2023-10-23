const express = require("express");
const router = express.Router();
const mysql = require("mysql2");
const {AddNewUser, GetUserByEmail} = require('./../Middleware/database-helper.js');
const {SendOtp, VerifyOtp} = require('./../Middleware/otp-helper.js')
const {CheckIfUserExists, RegisterUser } = require('./../Middleware/auth-helper.js')


router.post("/register-user", RegisterUser, (req, res) => {});

router.post("/login", (req, res) => {});

router.post("/send-login-otp", SendOtp, (req, res) => {});

router.post("/send-register-otp", CheckIfUserExists, SendOtp, (req, res) => {});

router.post("/verify-otp", VerifyOtp, (req, res) => {});

router.get('/', (req, res) => {});

module.exports = router;