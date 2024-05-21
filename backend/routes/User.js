const express = require("express")
const router = express.Router()


const{
    sendotp,signup 
} = require("../controllers/Auth")

router.post("/sendotp",sendotp);

router.post("/signup",signup)


module.exports = router;