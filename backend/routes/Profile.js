const express = require("express");
const router = express.Router();
const {auth,isStudent,isInstructor,isAdmin} = require("../middlewares/auth");

const {
    updateProfile,
    deleteAccount,
    getallUserDetails,
    getEnrolledCourses,
    updateDisplayPicture,
    instructorDashboard
} = require("../controllers/Profile")

router.delete("/deleteProfile",auth,deleteAccount);
router.put("/updateProfile",auth,updateProfile);
router.put("/updateDisplayPicture",auth,updateDisplayPicture);
router.get("/getUserDetails",auth,getallUserDetails);
router.get("/getEnrolledCourses",auth,getEnrolledCourses);
router.get("/getInstructorDashboardDetails",auth,isInstructor,instructorDashboard);

module.exports = router;

