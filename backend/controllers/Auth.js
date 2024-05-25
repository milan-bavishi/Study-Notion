const OTP = require("../models/OTP");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const otpGenerator = require("otp-generator");
const sendVerificationEmail = require("../models/OTP");
const Profile = require("../models/Profile");

//Signup API
exports.signup = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    //   accountType,
      contactNumber,
      otp,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !otp
    ) {
      return res.status(403).send({
        success: false,
        message: "All Field are Required",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and confirm password do not match.plese fill same",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists.plese sign in.",
      });
    }

    const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
    console.log(response);

    if (response.length === 0) {
      return res.status(400).json({
        success: false,
        message: "The OTP is not valid",
      });
    } else if (otp !== response[0].otp) {
      return res.status(400).json({
        success: false,
        message: "The OTP is not vaild",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 15);

    let approved = "";
    approved === "Instructor" ? (approved = false) : (approved = true);

    const profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: null,
    });

    const user = await User.create({
      firstName,
      lastName,
      email,
      contactNumber,
      password: hashedPassword,
    //   accountType: accountType,
      approved: approved,
      image: `https://api.dicebear.com/6.x/initials/svg?seed=${firstName} ${lastName}&backgroundColor=00897b,00acc1,039be5,1e88e5,3949ab,43a047,5e35b1,7cb342,8e24aa,c0ca33,d81b60,e53935,f4511e,fb8c00,fdd835,ffb300,ffd5dc,ffdfbf,c0aede,d1d4f9,b6e3f4&backgroundType=solid,gradientLinear&backgroundRotation=0,360,-350,-340,-330,-320&fontFamily=Arial&fontWeight=600`,
    });

    return res.status(200).json({
      success: true,
      user,
      message: "User Registered Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "User cannot be registered. Plese try again.",
    });
  }
};

// exports.login = async (req,res) => {
//     try{

//         const{ email, password } =  req.body;

//         if(!email || !password){
//             return res.status(400).json({
//                 success: false,
//                 message: `Plese Fill up All the Requied Fields`,
//             });
//         }

//         const user = await User.findOne({ email }).populate("additionDetails");

//         if(!user){
//             return res.status(401).json({
//                 success: false,
//                 message: `User is not Registered with Us Plese SignUp to Continue`,
//             });
//         }

//         if(await bcrypt.compare(password, user.password)){
//             const token = jwt.sign(
//               {email: user.email, id: user._id,})
//         }
//     }
// };


exports.sendotp = async (req, res) => {
  try {
    const { email } = req.body;

    const checkuserPresent = await User.findOne({ email });

    if (checkuserPresent) {
      return res.status(401).json({
        success: false,
        message: `User is already Resgistered`,
      });
    }

    var otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    const result = await OTP.findOne({ otp: otp });
    console.log("OTP", otp);

    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
      });
    }

    const otpPayload = { email, otp };
    const otpBody = await OTP.create(otpPayload);
    console.log("OTP Body", otpBody);

    res.status(200).json({
      success: true,
      message: `OTP Sent Successfully`,
      otp,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
