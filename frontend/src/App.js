import { Route, Routes } from "react-router";
import "./App.css";
import Home from "./pages/Home";
import Under from "./Components/common/Under";
import NavBar from "./Components/common/NavBar";

function App() {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      
    </div>
  );
}

export default App;
