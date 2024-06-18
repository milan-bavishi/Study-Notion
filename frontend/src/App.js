import { Route, Routes } from "react-router";
import "./App.css";
import Home from "./pages/Home";
import NavBar from "./Components/common/NavBar";
import Footer from "./Components/common/Footer";
import Login from "./pages/Login"
import Error from "./pages/Error"
import Signup from "./pages/Signup";
import ContactUs from "./pages/ContactUs"
import About from "./pages/About";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyOtp from "./pages/VerifyOtp";
import Dashboard from "./pages/Dashboard";
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
import MyProfile from "./Components/core/Dashboard/MyProfile";
import Setting from "./Components/core/Dashboard/Settings";
import EnrollledCourses from "./Components/core/Dashboard/EnrolledCourses";
import InstructorDashboard from "./Components/core/Dashboard/InstructorDashboard/InstructorDashboard";
import AddCourse from "./Components/core/Dashboard/AddCourse/index";
import MyCourses from "./Components/core/Dashboard/MyCourses/MyCourses";
import EditCourse from "./Components/core/Dashboard/EditCourse.jsx/EditCourse";
import Cart from "./Components/core/Dashboard/Cart/index";
import Catalog from "./pages/Catalog";
import AdminPannel from "./Components/core/Dashboard/AdminPannel";
import CourseDetails from "./pages/CourseDetails";

import ViewCourse from "./pages/ViewCourse";
import VideoDetails from "./Components/core/ViewCourse/VideoDetails";

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
          <Route path="/catalog/:catalog" element={<Catalog />} />
          <Route
          path="/login"
          element={<OpenRoute><Login/></OpenRoute>}/>

          <Route
          path="/signup"
          element={<OpenRoute><Signup/></OpenRoute>}/>

          <Route path="/forgot-password" element={<ForgotPassword/>}/>

          <Route path="/update-password/:id" element={<UpdatePassword/>}/>

          <Route path="/verify-email" element={<VerifyOtp/>}/>

          <Route path="/contact" element={<ContactUs/>}/>

          <Route path="/courses/:courseId" element={<CourseDetails />} />
          
          <Route path="/about" element={<About/>}/>

          <Route
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="dashboard/my-profile" element={<MyProfile />} />
          <Route path="dashboard/settings" element={<Setting />} />
          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route path="dashboard/cart" element={<Cart />} />
              <Route
                path="dashboard/enrolled-courses"
                element={<EnrollledCourses />}
              />
              {/* <Route
                path="dashboard/purchase-history"
                element={<PurchaseHistory />}
              /> */}
            </>
          )}

          {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
            <>
              <Route path="dashboard/add-course" element={<AddCourse />} />
              <Route path="dashboard/my-courses" element={<MyCourses />} />
              <Route
                path="dashboard/edit-course/:courseId"
                element={<EditCourse />}
              />
              <Route
                path="dashboard/instructor"
                element={<InstructorDashboard />}
              />
            </>
          )}

          {user?.accountType === ACCOUNT_TYPE.ADMIN && (
            <>
              <Route path="dashboard/admin-panel" element={<AdminPannel />} />
            </>
          )}
          
        </Route>

        <Route
        element={
          <PrivateRoute>
            <ViewCourse/>
          </PrivateRoute>
        }>

          {
            user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route path = "/dashboard/enrolled-courses/view-course/:courseId/section/:sectionId/sub-section/:subsectionId"
                  element = {<VideoDetails/>}
                />
              </>
            )
          }
        </Route>
          

          {/* <Route path="dashboard/settings" element={<Setting />} /> */}

          <Route path="*" element={<Error />} />

      </Routes>
      <Footer/>
      
    </div>
  );
}

export default App;
