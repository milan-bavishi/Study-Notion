const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        firstName:{
            type: String,
            require: true,
            trim: true,
        },
        lastName:{
            type: String,
            require: true,
            trim: true,
        },
        email:{
            type: String,
            require: true,
            trim: true,
        },

        password:{
            type: String,
            require: true,
        },

        accountType:{
            type: String,
            enum: ["Admin", "Student", "Instructor"],
            require: true,
        },
        active:{
            type: Boolean,
            default: true,
        },
        approved:{
            type: Boolean,
            default: true,
        },
        additionalDetails:{
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref: "Profile",
        },
        courses: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Course",
            },
        ],
        token:{
            typr: String,
        },
        resetPasswordExpires: {
            typr: Date,
        },
        image:{
            type: String,
            require: true,
        },
        courseProgress: [
            {
                type: mongoose.Schema.Types.ObjectId,
				ref: "courseProgress", 
            },
        ],
    },
    {timestamps: true}
);

module.exports = mongoose.model("user",userSchema);
