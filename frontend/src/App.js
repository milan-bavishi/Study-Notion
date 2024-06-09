import { Route, Routes } from "react-router";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login"
import Signup from "./pages/Signup";
import VerifyOtp from "./pages/VerifyOtp";
import Under from "./Components/common/Under";
import NavBar from "./Components/common/NavBar";

function App() {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-email" element={<VerifyOtp />} />
      </Routes>
      
    </div>
  );
}

export default App;
