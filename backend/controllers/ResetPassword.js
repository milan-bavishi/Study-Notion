const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

exports.resetPasswordToken = async (req,res) => {

    try{

        const email = req.body.email;
        const user = await User.findOne({email:email});

        if(!user){
            return res.json({
                success: false,
                message: `This Email: ${email} is not Registered with Us Enter a vaild Email`,
            });
        }

        const token = crypto.randomBytes(20).toString("hex");

        const updatedDetails = await User.findOneAndUpdate(
            {email: email},
            {
                token: token,
                resetPasswordExpires : Date.now() + 3600000,
            },
            {new: true}
        );

        console.log("DETAILS",updatedDetails);

        const url = `https://studynotion-edtech-milan.vercel.app/update-password/${token}`

        await mailSender(
            email,
            "Password Reset",
            `Your Link for Email verification is ${url}. Plese click this url to reset your password.` 
        );

        return res.json({
            success: true,
            message: "Email Send Successfully, plese Check your Email to Continue further",
        });
    }catch(error){
        return res.json({
            error: error.message,
            success: false,
            message: `Some error in sending the Reset Message`,
        });
    }
};


exports.resetPassword = async(req,res) => {

    try{
        const{ password,confirmpassword,token} = req.body;

        if(confirmpassword !== password){
            return res.json({
                success: false,
                message: "Password and confirm Password Does not Match",
            });
        }

        const userDetails = await User.findOne({token:token});

        if(!userDetails){
            return res.json({
                success: false,
                message: "Token is invaild",
            });
        }

        if(!(userDetails.resetPasswordExpires > Date.now())){
            return res.status(403).json({
                success: false,
                message: `Token is Expired, please Regenerate Your Token`,
            });
        }

        const encryptedPassword = await bcrypt.hash(password,15);

        await User.findOneAndUpdate(
            {token: token},
            {password: encryptedPassword},
            {new: true}
        );
        res.json({
            success: true,
            message: `Password Reset Successful`
        });
    }catch(error){
        return res.json({
            error: error.message,
            success: false,
            message: `Some Error in Updating the password`,
        })
    }
}