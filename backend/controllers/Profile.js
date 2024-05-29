const Profile = require("../models/Profile");
const User = require("../models/User");
const Course = require("../models/Course");
const {uploadImageToCloudinary} = require("../utils/imageUploader");

exports.updateProfile = async (req,res) => {

    try{    

        const { dateOfBirth = "", about = "", contectNumber="", firstName,lastName,gender="" } = req.body;
        const id = req.user.id;

        //find the profile by id
        const userDetails = await User.findById(id);
        const profile = await Profile.findById(userDetails.additionalDetails);

        //Update the profile fields
        userDetails.firstName = firstName ||userDetails.firstName;
        userDetails.lastName = lastName || userDetails.lastName;
        profile.dateOfBirth = dateOfBirth || profile.dateOfBirth;
        profile.about = about || profile.about;
        profile.gender = gender || profile.gender;
        profile.contectNumber = contectNumber || profile.contectNumber;

        //save the updated profile
        //here if object is bana pada he to save function user karege
        await profile.save();
        await userDetails.save();

        return res.json({
            success: true,
            message: "Profile updated successfully",
            profile,
            userDetails
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error",
            error: error.message,
        });
    }
};


exports.deleteAccount = async (req,res) => {
    try{

        const id = req.user.id;
        const user = await User.findById({ _id: id});
        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Delete Assosiated Profile with the User
        await Profile.findByIdAndDelete({ _id: user.additionalDetails});

        //delete user
        await User.findByIdAndDelete({ _id: id});
        // TODO: Unenroll User From All the Enrolled Courses
        res.status(200).json({
            success: true,
            message: "User deleted successfully",
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            message: "User Cannot be deleted successfully",
            error: error.message,
        });
    }
};

exports.getallUserDetails = async (req,res) => {

    try{
        const id = req.user.id;
        const userDetails = await User.findById(id).populate("additionalDetails").exec();
        console.log(userDetails);
        res.status(200).json({
            success: true,
            message: "User Data fetched successfully",
            data: userDetails,
        });
    }catch(error){
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

exports.getEnrolledCourses = async (req,res) => {

    try{
        const id = req.user.id;
        
    }catch(error){
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

