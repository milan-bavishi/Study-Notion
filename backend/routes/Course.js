const express = require("express");
const router = express.Router();

const {
    createCourse,
    getAllCourses,
    getCourseDetails,
    getInstructorCourses,
    editCourse,
    getFullCourseDetails,
    deleteCourse,
    searchCourse,
    markLectureAsComplete,
} = require("../controllers/Course");

const {
    showAllCategories,
    createCategory,
    CategoryPageDetails,
    addCourseToCategory
} = require("../controllers/Category");

const {
    createRating,
    getAverageRating,
    getAllRating
} = require("../controllers/RatingAndReviews")

const {
    createSection,
    updateSection,
    deleteSection
} = require("../controllers/Section")

const {
    createSubSection,
    updateSubSection,
    deleteSubSection
} = require("../controllers/Subsection")     




module.exports = router;