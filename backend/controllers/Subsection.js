const Section = require("../models/Section");
const SubSection = require("../models/Course");
const Course = require("../models/Course");
const {uploadImageToCloudinary} = require("../utils/imageUploader");

exports.createSubSection = async (req,res) => {

    try{

        const{ sectionId, title , description,courseId } = req.body;
        const video = req.files.videoFile;

        if(!sectionId||
            !title || 
            !description ||
            !video ||
            !courseId
        ){
            return res.status(404).json({
                success: false,
                message; "All Fields are Required",
            });
        };

        const ifSection = await Section.findById(sectionId);
        if(!ifSection){
            return res.status(404).json({
                success: false,
                message: "Section not found",
            });
        };

        const uploadDetails = await uploadImageToCloudinary(
            video,
            process.env.FOLDER_VIDEO
        );

        console.log(uploadDetails);

        const SubSectionDetails = await SubSection.create({
            title: title,
            // timeDuration : timeDuration,
            description : description,
            videoUrl : uploadDetails.secure_url,
        });

        const updatedSection = await Section.findByIdAndUpdate(
            {_id: sectionId},
            {$push: {subSection: SubSectionDetails._id}},
            {new: true}
        ).populate("subSection");

        const updatedCourse = await Course.findById(courseId).populate({ path: "courseContent", populate: { path: "subSection" } }).exec();

        return res.status(200).json({
            success: true,
            data: updatedCourse,
            message: "SubSection Created Successfully",
        });

    }catch(error){
        console.error("Error creating new sun-section",error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};

//baki from here
exports.updateSubSection = async (req,res) => {
    try{

    }catch(){

    }
}

exports.deleteSubSection = async (req,res) => {
    try{

    }catch(){

    }
}
