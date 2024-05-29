const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender")
const emailTemplate = require("../mail/templates/emailVerificationTemplate");

const otpSchema = new mongoose.Schema ({
    email:{
        type: String,
        require: true,
    },
    otp:{
        type: String,
        require: true,
    },
    createdAt:{
        type: Date,
        default: Date.now,
        expires: 60 * 5,
        },
});

async function sendverificationMail(email,otp) {

    try{
        const mailResponse = await mailSender(
            email,
            "Verification Email",
            emailTemplate(otp)
        );
        console.log("Email sent successfully:",mailResponse);
    }catch(error){
        console.log("Error occurred while sending email",error);
        throw error;
    }
}

otpSchema.pre("save", async function(next) {
    console.log("New Document saved to database");

    if(this.isNew){
        await sendverificationMail(this.email,this.otp);
    }
    next();
});

const OTP = mongoose.model("OTP",otpSchema);

module.exports = OTP;