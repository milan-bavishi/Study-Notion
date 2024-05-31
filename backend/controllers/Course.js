const Course = require("../models/Course")
const Category = require("../models/Category")
const User = require("../models/User")
const CourseProgress = require("../models/CourseProgress")
const Section = require("../models/Section")
const SubSection = require("../models/SubSection")
const {uploadImageToCloudinary} = require("../utils/imageUploader")
const { convertSecondsToDuration}= require("../utils/secToDuration");

exports.createCourse = async (req, res) => {

    try{

        //Get userID from request object
        const userId = req.user.id;

        //All data
        const {courseName,
                courseDescription,
                whatYouwillLearn,
                price,
                tag,
                category,
                status,
                instructions} = req.body;

        const thumbnail =req.files.thumbnailImage;
        
        if(
            !courseName ||
            !courseDescription ||
            !whatYouwillLearn ||
            !price ||
            !tag || 
            !thumbnail ||
            !category
        ){
            return res.status(400).json({
                success: false,
                message: "All Fields are Mandatory",
            });
        }

        if (!status || status === undefined) {
			status = "Draft";
		}

        const instructorDetails = await User.findById(userId,{
            accountType: "Instructor",
        });

        if(!instructorDetails){
            return res.status(404).json({
                success: false,
                message: "Instructor Details Not Found",
            })
        }

        //Check if the tag given is vaild
        const categoryDetails = await Category.findById(category);
        if(!categoryDetails){
            return res.status(404).json({
                success: false,
                message: "Category Details Not found",
            });
        };

        const thumbnailImage = await uploadImageToCloudinary(
            thumbnail,
            process.env.FOLDER_NAME
        );

        console.log(thumbnailImage);

        //create a new course with the given details
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,
            whatYouwillLearn: whatYouwillLearn,
            price,
            tag: tag,
            category: categoryDetails._id,
            thumbnail: thumbnailImage.secure_url,
            status: status,
            instructions: instructions
        });
        
        //Add the new course to the User Schema of the Instructor

        await User.findByIdAndUpdate(
            {
                _id: instructorDetails._id,
            },
            {
                $push: {
                    courses: newCourse._id,
                },
            },
            {new : true}
        );

        //add the new course to the Categories
        await Category.findByIdAndUpdate(
            {_id : category},
            {
                $push: {
                    course: newCourse._id,
                },
            },
            { new: true}
        );

        res.status(200).json({
            success: true,
            data: newCourse,
            message: "Course Created Successfully",
        });

    }catch(error){
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to create course",
            error: error.message,
        })
    }
};

//getAllCourses

exports.getAllCourses = async (req,res) => {

    try{

        const allCourses = await Course.find(
            {},
            {
                courseName: true,
                price: true,
                thumbnail: true,
                instructor: true,
                ratingAndReviews: true,
                studentsEnrolled: true,
            }
        ).populate("instructor").exec();

        return res.status(200).json({
            success: true,
            message: "Data for All Courses Successfully",
            data: allCourses,
        });
    }catch(error){
        console.log(error);
        return res.status(404).json({
            success: false,
            message: `Can't Fetch Course Data`,
            error: error.message,
        });
    }
};

exports.getCourseDetails = async (req,res) => {

    try{
        const{courseId} = req.body;

        const courseDetails = await Course.find({_id: courseId}).populate({path:"instructor",
            populate:{path:"additionalDetails"}})
            .populate("category")
            .populate({
                path: "ratingAndReviews",
                populate:{path:"user"
                    ,select: "firstName lastName accountTpe image"}
            }).populate({path: "courseContent",populate:{path:"subSection"}})
            .exec();


        if(!courseDetails){
            return res.status(404).json({
                success: false,
                message: "Course Not Found"
            });    
        };
        
        return res.status(200).json({
            success: true,
            message: "Course fetched successfully now",
            data: courseDetails
        });
    }catch(error){
        console.error(error);
        return res.status(404).json({
            success: false,
            message: `Can't Fetch Couses Data`,
            error: error.message
        })
    }
} 


//Function to get all couses of a particular instructor
exports.getInstructorCourses = async (req,res) => {
    try{
        const userId = req.user.id;
        const allCourses = await Course.find({instructor: userId});

        res.status(200).json({
            success: true,
            data: allCourses
        });
    }catch(error){
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch courses",
            error: error.message,
        })
    }
}


//edit courses
exports.editCourse = async (req,res) => {
    try{
        const { courseId} = req.body;
        const updates = req.body;

        const course = await Course.findById(courseId);

        if(!course){
            return res.status(404).json({
                error: "Course not found"
            });
        };

        //If thumbnail image is found update it
        if(req.files){
            console.log("thumbnail update");
            const thumbnail = req.files.thumbnailImage;
            const thumbnailImage = await uploadImageToCloudinary(
                thumbnail,
                process.env.FOLDER_NAME
            )
            course.thumbnail = thumbnailImage.secure_url;
        }
            
        //this is understand is baki
        // Update only the fields that are present in the request body
	    for (const key in updates) {
		    if (updates.hasOwnProperty(key)) {
                if (key === "tag" || key === "instructions") {
			course[key] = JSON.parse(updates[key])
		    } else {
			course[key] = updates[key]
		    }
		    }
	    }

        await course.save();

        const updatedCourse = await Course.findOne({
            _id: courseId,
        })
            .populate({
                path: "instructor",
                populate:{
                    path: "additionalDetails",
                },
            })
            .populate("category")
            .populate("ratingAndReviews")
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection,"
                },
            })
            .exec();

            res.json({
                success: true,
                message: "Course updated successfully",
                data: updatedCourse,
            })
            
    }catch(error){
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server error",
            error: error.message, 
        })
    }
}

//baki from here

exports.getFullCourseDetails = async (req,res) => {
    try{
            const {courseId} = req.body;
            const userId = req.user.id;
            const  courseDetails = await Course.findOne({
                _id: courseId,
            }).populate({
                path: "instructor",
                populate: {
                    path: "additionalDetails",
                },
            })
            .populate("category")
            .populate("ratingAndReviews")
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                },
            }).exec()

            let courseProgressCount = await CourseProgress.findOne({
                courseID: courseId,
                userID: userId,
            }) 

            console.log("courseProgressCount :", courseProgressCount)

            if(!courseDetails){
                return res.status(400).json({
                    success: false,
                    message: `Could not find course with id: ${courseId}`,
                })
            }

            let totalDurationInSeconds = 0
	    courseDetails.courseContent.forEach((content) => {
		        content.subSection.forEach((subSection) => {
		    const timeDurationInSeconds = parseInt(subSection.timeDuration)
		    totalDurationInSeconds += timeDurationInSeconds;
		    })
	    })
  
	        const totalDuration = convertSecondsToDuration(totalDurationInSeconds)
  
	    return res.status(200).json({
		    success: true,
		    data: {
		    courseDetails,
		    totalDuration,
		    completedVideos: courseProgressCount?.completedVideos
			    ? courseProgressCount?.completedVideos
			    : ["none"],
		    },
	    })
        }catch(error){
            return res.status(500).json({
                success: false,
                message: error.message,
            })
    }
}

exports.deleteCourse = async (req,res) => {
    try{
        const {courseId} = req.body;

        const course = await Course.findById(courseId);

        if(!course){
            return res.status(404).json({
                message: "Course not found",
            })
        }

        //unenroll student from the course
        const studentEnrolled = course.studentsEnrolled
        
        for(const studentID of studentEnrolled ){
            await User.findByIdAndUpdate(studentID,{
                $pull: {courses: courseId},
            })
        }

        //Delete section and subsection
        const courseSections = course.courseContent

        for(const sectionId of courseSections){
            const section = await Section.findById(sectionId)
            if(section){
                const subSections = section.subSection
                for(const subSectionId of subSections){
                    await SubSection.findByIdAndDelete(subSectionId) 
                }
            }

            await Section.findByIdAndDelete(sectionId)
        }

        //detele the course
        await Course.findByIdAndDelete(courseId);

        await Category.findByIdAndUpdate(course.category._id,{
            $pull: {course: courseId},
        })

        await User.findByIdAndUpdate(course.instructor._id,{
            $pull: {courses: courseId},
        })

        return res.status(200).json({
            success: true,
            message: "Course deleted successfully",
        })
    }catch(error){
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        })
    }
}

//sikhvanu ayathi baki
exports.searchCourse = async (req, res) => {
	try {
	    const  { searchQuery }  = req.body
	    //   console.log("searchQuery : ", searchQuery)
	    const courses = await Course.find({
		    $or: [
		    { courseName: { $regex: searchQuery, $options: "i" } },
		    { courseDescription: { $regex: searchQuery, $options: "i" } },
		    { tag: { $regex: searchQuery, $options: "i" } },
		],
    })
    .populate({
	    path: "instructor",  })
        .populate("category")
  .populate("ratingAndReviews")
  .exec();

  return res.status(200).json({
	success: true,
	data: courses,
	  })
	} catch (error) {
	  return res.status(500).json({
		success: false,
		message: error.message,
	  })
	}		
}					

//mark lecture as completed
exports.markLectureAsComplete = async (req, res) => {
	const { courseId, subSectionId, userId } = req.body
	if (!courseId || !subSectionId || !userId) {
	  return res.status(400).json({
		success: false,
		message: "Missing required fields",
	  })
	}
	try {
	progressAlreadyExists = await CourseProgress.findOne({
				  userID: userId,
				  courseID: courseId,
				})
	  const completedVideos = progressAlreadyExists.completedVideos
	  if (!completedVideos.includes(subSectionId)) {
		await CourseProgress.findOneAndUpdate(
		  {
			userID: userId,
			courseID: courseId,
		  },
		  {
			$push: { completedVideos: subSectionId },
		  }
		)
	  }else{
		return res.status(400).json({
			success: false,
			message: "Lecture already marked as complete",
		  })
	  }
	  await CourseProgress.findOneAndUpdate(
		{
		  userId: userId,
		  courseID: courseId,
		},
		{
		  completedVideos: completedVideos,
		}
	  )
	return res.status(200).json({
	  success: true,
	  message: "Lecture marked as complete",
	})
	} catch (error) {
	  return res.status(500).json({
		success: false,
		message: error.message,
	  })
	}

}