const Section = require("../models/Section");
const Course = require("../models/Course");

exports.createSection = async ( req,res) => {

    try{

        const{ sectionName, courseId} = req.body;

        if(!sectionName || !courseId){
            return res.status(400).json({
                success: false,
                message: "Missing required properties",
            });
        };

        const ifCourse = await Course.findById(courseId);
        if(!ifCourse){
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        };

        const newSection = await Section.create({sectionName});

        const updatedCourse = await Course.findByIdAndUpdate(
            courseId,
            {
                $push: {
                    courseContent: newSection._id,
                },
            },
            {new: true}
        ).populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            },
        }).exec();

        res.status(200).json({
            success: true,
            message: "Section Created Successfully",
            updatedCourse,
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

exports.updateSection = async (req,res) => {

    try{

        const { sectionName,sectionId,courseId} = req.body;

        console.log(sectionName,sectionId);

        const section = await Section.findByIdAndUpdate(
            sectionId,
            {sectionName},
            {new: true}
        );

        const updatedCourse = await Course.findById(courseId).populate({ path: "courseContent", populate: { path: "subSection" } }).exec();

        res.status(200).json({
            success: true,
            message: "Section Updated Successfully",
            updatedCourse
        });

    }catch(error){
        console.error("Error updating section:",error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

exports.deleteSection = async (req,res) => {
    try{

        //i think error in populate

        const{ sectionId,courseId} = req.body;
        await Section.findByIdAndDelete(sectionId);
        const updatedCourse = await Course.findById(courseId).populate({ path: "courseContent", populate: { path: "subSection" } }).exec();

        res.status(200).json({
            success: true,
            message: "Section deleted",
            updatedCourse,
        });
    }catch(error){
        console.error("Error deleting section:",error);
        res.status(500).json({
            success: true,
            message: "Internal server error",
        })
    }
}
