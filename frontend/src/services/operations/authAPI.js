import {toast} from "react-hot-toast"

import { setLoading, setToken } from "../../slices/authSlice"
import { resetCart } from "../../slices/cartSlice"
import { setUser } from "../../slices/profileSlice"
import { endpoints } from "../apis"
import {apiConnector} from "../apiConnector"
import {setProgress} from "../../slices/loadingBarSlice"

const {SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
    RESETPASSWORDTOKEN_API,
    RESETPASSWORD_API
} = endpoints



export function sendOtp(email, navigate) {
    return async(dispatch) => {
        dispatch(setLoading(true))

        try{
                const response = await apiConnector("POST",SENDOTP_API,{
                    email,
                    checkUserPresent: true,
                })
                dispatch(setProgress(100));
                console.log("SENDOTP API RESPONSE...",response)

                console.log(response.data.success)

                if(!response.data.success){
                    throw new Error(response.data.message)
                }

                toast.success("OTP Send Successfully")
                navigate("/verify-email")
        }catch(error){
            console.log("SENDOTP API ERROR....",error)
            toast.error(error?.response?.data?.message)
            dispatch(setProgress(100));
        }

        dispatch(setLoading(false))
    }
}


export function singUp(
    accountType,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    otp,
    navigate
){
    return async(dispatch) => {
        const toastId = toast.loading("Loading....")
        dispatch(setLoading(true))

        try{
            const response = await apiConnector("POST", SIGNUP_API,{
                accountType,
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                otp
            })

            console.log("SIGNUP API RESPONSE.....",response)

            if(!response.data.success){
                throw new Error(response.data.message)
            }

            dispatch(setProgress(100));
            toast.success("Signup Successfull")
            navigate("/login")
        }catch(error){
            dispatch(setProgress(100))
            console.log("SIGNUP API ERROR...",error)
            toast.error("Signup Failed")
            navigate("/singup")
        }

        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export function login(email,password,navigate){
    return async(dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try{
            const response = await apiConnector("POST", LOGIN_API,{
                email,
                password
            })

            console.log("Login API Response...",response)

            if(!response.data.success){
                throw new Error(response.data.message)
            }

            dispatch(setProgress(100))
            toast.success("Login Successful")
            dispatch(setToken(response.data.token))
            const userImage = response.data?.user?.image
            ? response.data.user.image
            : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
            dispatch(setUser({...response.data.user,image: userImage}))
            localStorage.setItem("user",JSON.stringify(response.data.user))
            localStorage.setItem("token",JSON.stringify(response.data.token))

            navigate("/dashboard/my-profile")
        }catch(error){
            dispatch(setProgress(100))
            console.log("Login API Error...",error)
            toast.error(error.response.data.message)
        }

        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export function getPasswordResetToken(email, setEmailSent){
    return async(dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try{
            const response = await apiConnector("POST", RESETPASSWORDTOKEN_API,{
                email,
            })

            console.log("Resetpassword token API Response...",response)

            if(!response.data.success){
                throw new Error(response.data.message)
            }

            toast.success("Reset Email Send")
            setEmailSent(true)
        }catch(error){
            console.log("Resetpassword Token Error...",error)
            toast.error("Failed To Send Reset Email")
        }

        toast.dismiss(toastId)
        dispatch(setLoading(false))
    }
}


export function resetPassword(password, confirmPassword, token, setresetComplete){

    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))

        try{
            const response = await apiConnector("POST", RESETPASSWORD_API,{
                password,
                confirmPassword,
                token,
            })

            console.log("Resetpassword response",response)

            if(!response.data.success){
                throw new Error(response.data.message)
            }

            toast.success("Password reset Successfully")
            setresetComplete(true)
        }catch(error){
            console.log("Resetpassword Error",error)
            toast.error("Failed to reset password")
        }
        toast.dismiss(toastId)
        dispatch(setLoading(false))
    }
}

export function logout(navigate) {
    return (dispatch) => {
        dispatch(setToken(null))
        dispatch(setUser(null))
        dispatch(resetCart())
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        toast.success("Logged Out")
        navigate("/")
    }
}

export function forgotPassword(email,setEmailSend){
    return async(dispatch) => {
        dispatch(setLoading(true))

        try{
            const response = await apiConnector("POST",RESETPASSWORDTOKEN_API,{
                email
            })

            console.log("Forgotpassword response...",response)

            if(!response.data.success){
                toast.error(response.data.message)
                throw new Error(response.data.message)
            }

            toast.success("Reset Email Sent");
            setEmailSend(true)
        }catch(error){
            console.log("forgotpassword error...",error)
        }
        dispatch(setLoading(false))
    }
}

