import { Route, Routes } from "react-router";
import "./App.css";
import Home from "./pages/Home";
import NavBar from "./Components/common/NavBar";
import Footer from "./Components/common/Footer";
import Login from "./pages/Login"
import Error from "./pages/Error"
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyOtp from "./pages/VerifyOtp";
import Under from "./Components/common/Under";
import LoadingBar from "react-top-loading-bar";
import { setProgress } from "./slices/loadingBarSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import OpenRoute from "./Components/core/Auth/OpenRoute";
import PrivateRoute from "./Components/core/Auth/PrivateRoute";
import { ACCOUNT_TYPE } from "./utils/constants";
import { RiWifiOffLine } from "react-icons/ri";
import ScrollToTop from "./Components/ScrollToTop";

function App() {

  console.log = function () {};
  const user = useSelector((state) => state.profile.user);
  const progress = useSelector((state) => state.loadingBar);
  const dispatch = useDispatch();
  
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">

      <LoadingBar
        color="FFD60A"
        height={1.4}
        progress={progress}
        onLoaderFinished={() => dispatch(setProgress(0))}
      />
  
      <NavBar setProgress={setProgress}></NavBar>
      {
        !navigator.onLine && (
          <div  className="bg-red-500 flex text-white text-center p-2 bg-richblack-300 justify-center gap-2 items-center">
          <RiWifiOffLine size={22} />
          Please check your internet connection.
          <button
            className="ml-2 bg-richblack-500 rounded-md p-1 px-2 text-white"
            onClick={() => window.location.reload()}
          >Retry</button>
          </div>
        )
      }
      <ScrollToTop/>

        {/*Routes For here*/}
      <Routes>
          <Route path="/" element={<Home/>}/>

          <Route
          path="/login"
          element={<OpenRoute><Login/></OpenRoute>}/>

          <Route
          path="/signup"
          element={<OpenRoute><Signup/></OpenRoute>}/>

          <Route path="/forgot-password" element={<ForgotPassword/>}/>
          <Route path="/update-password/:id" element={<UpdatePassword/>}/>
          <Route path="/verify-email" element={<VerifyOtp/>}/>

          <Route path="*" element={<Error />} />
      </Routes>
      
    </div>
  );
}

export default App;
