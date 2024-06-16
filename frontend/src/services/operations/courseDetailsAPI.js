import { toast } from "react-hot-toast";
import { setProgress } from "../../slices/loadingBarSlice";
import { apiConnector } from "../apiConnector";
import { courseEndpoints } from "../apis";

const {
    COURSE_DETAILS_API,
    COURSE_CATEGORIES_API,
    CREATE_CATEGORY_API,
    GET_ALL_COURSE_API,
    CREATE_COURSE_API,
    EDIT_COURSE_API,
    CREATE_SECTION_API,
    CREATE_SUBSECTION_API,
    UPDATE_SECTION_API,
    UPDATE_SUBSECTION_API,
    DELETE_SECTION_API,
    DELETE_SUBSECTION_API,
    GET_ALL_INSTRUCTOR_COURSES_API,
    DELETE_COURSE_API,
    GET_FULL_COURSE_DETAILS_AUTHENTICATED,
    CREATE_RATING_API,
    LECTURE_COMPLETION_API,
    ADD_COURSE_TO_CATEGORY_API,
    SEARCH_COURSES_API,
  } = courseEndpoints;


export const getAllCourses = async () => {

    const toastId = toast.loading("Loading...");
    let result = [];
    try{
        const response = await apiConnector("GET",GET_ALL_COURSE_API);

        if(!response?.data?.success){
            throw new Error("Could Not Fetch Course Categories");
        }
        result = response?.data?.data;
    }catch(error){
        console.log("Get All Course API Error...",error);
        toast.error(error.messsage);
    }
    toast.dismiss(toastId);
    return result;
};

export const fetchCourseDetails = async(courseId, dispatch) => {

    dispatch(setProgress(50));
    let result = null;

    try{
        const response = await apiConnector("POST",COURSE_DETAILS_API,{
            courseId,
        });
        console.log("Course details API Response..",response.data)

        if(!response.data.success){
            throw new Error(response.data.messsage);
        }
        result = response.data.data[0];

    }catch(error){
        console.log("Course Details API Error...",error)
        result = error.response.data;
    }
    dispatch(setProgress(100));
    return result;
}

export const fetchCourseCategories = async () => {

    let result = [];

    try{
        const response = await apiConnector("GET",COURSE_CATEGORIES_API);
        console.log("Course Categories API Response...",response);

        if(!response?.data?.success){
            throw new Error("Could Not Fetch Course Categories");
        }
        result = response?.data?.data;
    }catch(error){
        console.log("Course Category API Error...",error);
        toast.error(error?.response?.data?.messsage);
    }
    return result;
}

export const addCourseDetails = async(data,token) => {

    let result = null;
    const toastId = toast.loading("Loading...");
    try{
        const response = await apiConnector("POST",CREATE_COURSE_API,data,{
            "Content-Type": "multipart/form-data",
            Authorisation: `Bearer ${token}`,
        });

        console.log("Create Course API Response...",response);
        if(!response?.data?.success){
            throw new Error("Could Not Add Course details");
        }
        toast.success("Course Details Added Successfully");
        result = response?.data?.data;
    }catch(error){
        console.log("Create Course API Error...",error);
        toast.error(error.response.data.messsage);
    }
    toast.dismiss(toastId);
    return result;
};

export const editCourseDetails = async(data,token) => {

    let result = null;
    const toastId = toast.loading("Loading...");

    try{
        const response = await apiConnector("POST",EDIT_COURSE_API,data,{
            "Content-Type": "multipart/form-data",
            Authorisation: `Bearer ${token}`,
        });

        console.log("Edit Course API Response...",response);
        if(!response?.data?.success){
            throw new Error("Could Not Update Course Details..");
        }
        toast.success("Course Details Updated Successfully");
        result = response?.data?.data;
    }catch(error){
        console.log("Edit Course API Error....",error);
        toast.error(error.response.data.messsage);
    }
    toast.dismiss(toastId);
    return result;
}

export const createSection = async (data,token) => {

    let result = null;
    const toastId = toast.loading("Loading...");

    try{
        const response = await apiConnector("POST", CREATE_SECTION_API,data,{
            Authorisation: `Bearer ${token}`,
        });
        console.log("Create Section API Response...",response);
        if(!response?.data?.success){
            throw new Error("Could Not Create Section...");
        }
        toast.success("Course Section Create");
        result = response?.data?.updatedCourse;
        console.log("Create Section API....",result);
    }catch(error){
        console.log("Create Section API Error....",error);
        toast.error(error.messsage);
    }
    toast.dismiss(toastId);
    return result;
};

export const createSubSection = async (data,token) => {

    let result = null;
    const toastId = toast.loading("Uploading...");

    try{
        const response = await apiConnector("POST", CREATE_SUBSECTION_API,data,{
            Authorisation: `Bearer ${token}`,
        });
        console.log("Create Sub-Section API Response...",response);
        if(!response?.data?.success){
            throw new Error("Could Not Add Lecture...");
        }
        toast.success("Lecture Added");
        result = response?.data?.data;
    }catch(error){
        console.log("Create Sub-Section API Error....",error);
        toast.error(error.messsage);
    }
    toast.dismiss(toastId);
    return result;
};

export const updateSection = async (data,token) => {

    let result = null;
    const toastId = toast.loading("Loading...");

    try{
        const response = await apiConnector("POST", UPDATE_SECTION_API,data,{
            Authorisation: `Bearer ${token}`,
        });
        console.log("Update Section API Response...",response);
        if(!response?.data?.success){
            throw new Error("Could Not Update Section...");
        }
        toast.success("Course Section Updated");
        result = response?.data?.updatedCourse;
        console.log("Update Section API....",result);
    }catch(error){
        console.log("Update Section API Error....",error);
        toast.error(error.messsage);
    }
    toast.dismiss(toastId);
    return result;
};

export const updateSubSection = async (data,token) => {

    let result = null;
    const toastId = toast.loading("Loading...");

    try{
        const response = await apiConnector("POST", UPDATE_SUBSECTION_API,data,{
            Authorisation:  `Bearer ${token}`,
        });
        console.log("Update sub-Section API Response...",response);
        if(!response?.data?.success){
            throw new Error("Could Not Update Lecture...");
        }
        toast.success("Lecture Updated");
        result = response?.data?.data;
    }catch(error){
        console.log("Update Sub-Section API Error....",error);
        toast.error(error.messsage);
    }
    toast.dismiss(toastId);
    return result;
};


export const deleteSection = async (data,token) => {

    let result = null;
    const toastId = toast.loading("Loading...");

    try{
        const response = await apiConnector("POST", DELETE_SECTION_API,data,{
            Authorisation: `Bearer ${token}`,
        });
        console.log("Delete Section API Response...",response);
        if(!response?.data?.success){
            throw new Error("Could Not Delete Section...");
        }
        toast.success("Course Section Deleted");
        result = response?.data?.updatedCourse;
        console.log("Delete Section API Result....",result);
    }catch(error){
        console.log("Delete Section API Error....",error);
        toast.error(error.messsage);
    }
    toast.dismiss(toastId);
    return result;
};


export const deleteSubSection = async (data,token) => {

    let result = null;
    const toastId = toast.loading("Loading...");

    try{
        const response = await apiConnector("POST", DELETE_SUBSECTION_API,data,{
            Authorisation: `Bearer ${token}`,
        });
        console.log("Delete Sub-Section API Response...",response);
        if(!response?.data?.success){
            throw new Error("Could Not Delete Lecture...");
        }
        toast.success("Lecture Deleted");
        result = response?.data?.data;
        console.log("Delete Sub-Section API Result....",result);
    }catch(error){
        console.log("Delete Sub-Section API Error....",error);
        toast.error(error.messsage);
    }
    toast.dismiss(toastId);
    return result;
};

export const fetchInstructorCourses = async (token) => {

    let result = [];
    const toastId = toast.loading("Loading...");

    try{
        const response = await apiConnector("GET", GET_ALL_INSTRUCTOR_COURSES_API,null,{
            Authorisation: `Bearer ${token}`,
        });
        console.log("Instructor Courses API Response...",response);
        if(!response?.data?.success){
            throw new Error("Could Not Fetch Instructor Courses...");
        }
        toast.success("Courses Fetch Successfully");
        result = response?.data?.data;
    }catch(error){
        console.log("Instructor Courses API Error....",error);
        toast.error(error.messsage);
    }
    toast.dismiss(toastId);
    return result;
};


export const deleteCourse = async (data,token) => {
    const toastId = toast.loading("Loading...");

    try{
        const response = await apiConnector("DELETE", DELETE_COURSE_API,data,{
            Authorisation: `Bearer ${token}`,
        });
        console.log("Delete Course API Response...",response);
        if(!response?.data?.success){
            throw new Error("Could Not Delete Course...");
        }
        toast.success("Course Deleted");
    }catch(error){
        console.log("Delete Course API Error....",error);
        toast.error(error.response.data.messsage);
    }
    toast.dismiss(toastId);
};


export const getFullDetailsOfCourse = async (courseId,token) => {

    let result = null;
    const toastId = toast.loading("Loading...");

    try{
        const response = await apiConnector("POST", GET_FULL_COURSE_DETAILS_AUTHENTICATED,{ courseId,},{
            Authorisation: `Bearer ${token}`,
        });
        console.log("Course Full Details API Response...",response);
        if(!response.data.success){
            throw new Error(response.data.messsage);
        }
        result = response?.data?.data;
    }catch(error){
        console.log("Course Full Details API Error....",error);
        result = error.response.data;
    }
    toast.dismiss(toastId);
    return result;
};


export const markLectureAsComplete = async (data,token) => {

    let result = null;
    const toastId = toast.loading("Loading...");

    try{
        const response = await apiConnector("POST", LECTURE_COMPLETION_API,data,{
            Authorisation: `Bearer ${token}`,
        });
        console.log("Mark Lecture as Complete API Response...",response);
        if(!response.data.messsage){
            throw new Error(response.data.error);
        }
        toast.success("Lecture Completed");
        result = true;
    }catch(error){
        console.log("Mark Lecture as Completed API Error....",error);
        toast.error(error.messsage);
        result = false;
    }
    toast.dismiss(toastId);
    return result;
};

export const createRating = async (data,token) => {
   
    const toastId = toast.loading("Loading...");
    let success = false;

    try{
        const response = await apiConnector("POST", CREATE_RATING_API,data,{
            Authorisation: `Bearer ${token}`,
        });
        console.log("Create Rating API Response...",response);
        if(!response?.data?.success){
            throw new Error("Could Not Create Rating...");
        }
        toast.success("Rating posted");
        success = true;
    }catch(error){
        success = false;
        console.log("Create Rating API Error....",error);
        toast.error(error.response.data.messsage);
    }
    toast.dismiss(toastId);
    return success;
};


export const addCourseToCategory = async (data,token) => {
    
    const toastId = toast.loading("Loading...");
    let success = false;

    try{
        const response = await apiConnector("POST",ADD_COURSE_TO_CATEGORY_API,data,{
            Authorisation: `Bearer ${token}`,
        });
        console.log("Add Course To Category API Response...",response);
        if(!response?.data?.success){
            throw new Error("Could Not add course to category...");
        }
        toast.success("Course Added To Category");
        success = true;
    }catch(error){
        success = false;
        console.log("Add Course To Category API Error....",error);
        toast.error(error.messsage);
    }
    toast.dismiss(toastId);
    return success;
};


export const searchCourses = async (searchQuery, dispatch) => {

    dispatch(setProgress(50));
    let result = null;
    try{
        const response = await apiConnector("POST", SEARCH_COURSES_API,{
            searchQuery: searchQuery,
        });
        console.log("Search Course API Response...",response);
        if(!response?.data?.success){
            throw new Error("Could Not Search Courses...");
        }
        result = response?.data?.data;
    }catch(error){
        console.log("Search Courses API Error....",error);
        toast.error(error.messsage);
    }
    dispatch(setProgress(100));
    return result;
};


export const createCategory = async (data,token) => {
    const toastId = toast.loading("Loading...");
    let success = false;
    try{
        const response = await apiConnector("POST", CREATE_CATEGORY_API,data,{
            Authorisation: `Bearer ${token}`,
        });
        console.log("Create Category API Response...",response);
        if(!response?.data?.success){
            throw new Error("Could Not Create Category...");
        }
        toast.success("Category Created");
        success = true;
    }catch(error){
        success = false;
        console.log("Create Category API Error....",error);
        toast.error(error.messsage);
    }
    toast.dismiss(toastId);
    return success;
};
