import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Home";
import React from "react";
import Home2 from "./Home2"; 
import Login from "./Login";
import CaseInfo from "./CaseInfo"; // Import the new page component
import './index.css';

function App() {
              
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/home2" element={<Home2 />} />
        <Route path="/CaseInfo" element={<CaseInfo />} />
      </Routes>
    </Router>
  );
}



export default App;


