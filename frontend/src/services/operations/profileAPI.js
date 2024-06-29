import { setProgress } from "../../slices/loadingBarSlice.js";
import { apiConnector } from "../apiConnector.js";
import { profileEndpoints } from "../apis.js";
import { toast } from "react-hot-toast";
import {settingsEndpoints} from "../apis.js"
import { logout } from "./authAPI.js";


export async function getUserCourses(token,dispatch) {

    dispatch(setProgress);
    let result = []

    try{
        console.log("Enrrolled Courses");
        const response = await apiConnector(
            "GET",
            profileEndpoints.GET_USER_ENROLLED_COURSES_API,
            null,
            {
                Authorisation: `Bearer ${token}`,
            }
        )
        toast.success("Courses Fetch Successfully");
        console.log("Enrolled Courses API called");

        if(!response.data.success){
            throw new Error(response.data.message)
        }
        result = response.data.data;
    }catch(error){
        console.log("Error in enrolled course API");
        toast.error("Could Not Get Enrolled Courses")
    }
    dispatch(setProgress(100));
    return result
}



export async function updateAdditionalDetails(token,additionalDetails){

    console.log("additionalDetails is::",additionalDetails);
    const {firstName, lastName, dateOfBirth, gender, contactNumber, about} = additionalDetails;
    console.log("additionalDetails::",additionalDetails);

    const toastId = toast.loading("Updating...");

    try{
        const response = await apiConnector("PUT",settingsEndpoints.UPDATE_PROFILE_API,{firstName,lastName,dateOfBirth,gender,contactNumber},{
            Authorisation: `Bearer ${token}`,
        });

        console.log("Update Additional Details API response...",response)

        if(!response.data.success){
            throw new Error(response.data.message)
        }

        toast.success("Additional Details Updated Successfully");

        const user = JSON.parse(localStorage.getItem("user"));
        user.firstName = firstName || user.firstName;
        user.lastName = lastName || user.lastName;
        user.additionalDetails.dateOfBirth = dateOfBirth || user.additionalDetails.dateOfBirth;
        user.additionalDetails.contactNumber = contactNumber || user.additionalDetails.contactNumber;
        user.additionalDetails.about = about || user.additionalDetails.about;
        user.additionalDetails.gender = gender
        localStorage.setItem("user",JSON.stringify(user));
    }catch(error){
        console.log("Update Additional Details API Error...",error);
        toast.error(error.response.data.message)
    }
    toast.dismiss(toastId);
}


export async function updatePassword(token,password){

    const{oldPassword,newPassword, confirmPassword: confirmNewPassword} = password;
    console.log("password",password);
    const toastId = toast.loading("Updating...");

    try{
        const response = await apiConnector("POST",settingsEndpoints.CHANGE_PASSWORD_API,{oldPassword,newPassword,confirmNewPassword},{
            Authorisation: `Bearer ${token}`,
        });

        console.log("Update Password API Response...",response);

        if(!response.data.success){
            throw new Error(response.data.message)
        }
        toast.success("Password Updated Successfully")
    }catch(error){
        console.log("Update Password API Error...",error)
        toast.error(error.response.data.message)
    }
    toast.dismiss(toastId);
}

export async function deleteAccount(token,dispatch,navigate){

    const toastId = toast.loading("Deleting...");

    try{
        const response = await apiConnector("DELETE",settingsEndpoints.DELETE_PROFILE_API,null,{
            Authorisation: `Bearer ${token}`,
        });

        console.log("Delete Account API Response....",response);

        if(!response.data.success){
            throw new Error(response.data.message)
        }

        toast.success("Account Deleted Successfully");
        dispatch(logout(navigate))
    }catch(error){
        console.log("Delete Account API Error...",error)
        toast.error(error.response.data.message)
    }
    toast.dismiss(toastId);
}

export async function getInstructorDashboard(token,dispatch){

    dispatch(setProgress);
    let result = []

    try{

        console.log("Before Calling backend ..");
        const response = await apiConnector(
            "GET",
            profileEndpoints.GET_ALL_INSTRUCTOR_DASHBOARD_DETAILS_API,
            null,{
                Authorisation: `Bearer ${token}`,
            }
        )

        console.log("After Calling Backend API...");
        if(!response.data.success){
            throw new Error(response.data.message)
        }
        result = response.data.data;
    }catch(error){
        console.log("Get instructor Dashboard API Error...",error)
        toast.error("Could Not Get Instructor Dashboard")
    }
    dispatch(setProgress(100))
    return result
}

export async function updatePfp(token,pfp){
    const toastId = toast.loading("Uploading...");
    try{
        console.log("Here");
        const formData = new FormData();
        console.log("pfp",pfp);
        formData.append('pfp',pfp);
        console.log("Here");
        const response = await apiConnector(
            "PUT",
            settingsEndpoints.UPDATE_DISPLAY_PICTURE_API,
            formData,{
                Authorisation: `Bearer ${token}`,
            }
        )

        console.log("Update Display Picture API Response...",response)

        if(!response.data.success){
            throw new Error(response.data.message)
        }

        toast.success("Profile Picture Updated Successfully");
        const imageUrl = response.data.data.image;
        localStorage.setItem("user",JSON.stringify({...JSON.parse(localStorage.getItem("user")),image:imageUrl}));
        console.log(JSON.parse(localStorage.getItem("user")).image);
    }catch(error){
        console.log("Update Display Picture API Error...",error);
        toast.error(error.response.data.message);
    }

    toast.dismiss(toastId);
}
