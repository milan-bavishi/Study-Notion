import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {setCourse,setEditCourse,setStep,} from "../../../../../slices/courseSlice";
import toast from "react-hot-toast";

const CourseBuilderForm = () => {
    return(
        <div>
            <h1>course Builder Form</h1>
        </div>
    )
}

export default CourseBuilderForm