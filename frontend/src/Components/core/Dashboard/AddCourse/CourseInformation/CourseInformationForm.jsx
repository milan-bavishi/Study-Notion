import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { addCourseDetails, editCourseDetails, fetchCourseCategories } from '.././../../../../services/operations/courseDetailsAPI';
import { HiOutlineCurrencyRupee } from 'react-icons/hi';
import { BiUpload } from 'react-icons/bi';
import RequirementField from './RequirementField';
import { setStep, setCourse, setEditCourse} from '../../../../../slices/courseSlice';
import IconBtn from '../../../../common/IconBtn';
import { COURSE_STATUS } from '../../../../../utils/constants';
import { toast } from 'react-hot-toast';
import Upload from './Upload'
import ChipInput from './ChipInput';

const CourseInformationForm = () => {
    
    
    return(
        <div>
            <h1>CourseInformationForm</h1>
        </div>
    )
}

export default CourseInformationForm