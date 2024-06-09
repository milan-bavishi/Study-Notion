import React from "react";
import { useState } from "react";
import {Link,useLocation} from 'react-router-dom'
import { resetPassword } from '../services/operations/authAPI'
import { useDispatch } from 'react-redux'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { useSelector } from 'react-redux'

const ResetPassword = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const token = location.pathname.split("/").at(-1);

    const handleOnSubmit = (e) => {
        e.preventDefult();
        if(formData.password === formData.confirmPassword){
            dispatch(resetPassword(formData.password,formData.confirmPassword,token,setresetComplete));
        }
        else{
            alert("Password Do not match")
        }
    }

    const handleOnChange = (e) => {
        setFormData({...formData,[e.target.name] : e.target.value});
    };

    const [formData,setFormData] = useState({
        password: "",
        confirmPassword: "",
    })

    const {loading} = useSelector((state) => state.auth)
    const [resetComplete, setresetComplete] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPaword] = useState(false)

    return(
        <div>
            {
                
            }
        </div>
    )
}

export default ResetPassword