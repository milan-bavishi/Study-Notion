const express = require("express");
const router = express.Router();


const{
    sendotp,signup,login,changePassword,
} = require("../controllers/Auth")

const{
    resetPasswordToken,resetPassword
} = require("../controllers/ResetPassword")

const { auth } = require("../middlewares/auth")

router.post("/login", login);
router.post("/sendotp",sendotp);
router.post("/signup",signup);
router.post("/changepassword", auth, changePassword);
router.post("/reset-password-token", resetPasswordToken)
router.post("/reset-password", resetPassword)

module.exports = router;
