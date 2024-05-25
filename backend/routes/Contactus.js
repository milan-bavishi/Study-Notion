const express = require("express")
const router = express.Router()

const {contactus} = require("../controllers/Contactus");

router.post("/contactus",contactus)

module.exports = router;