import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Profile from "../pages/Profile";
import Test from "../pages/Test";
import TestResult from "../pages/TestResult";
import Layout from "../components/Layout";
import ProtectedRoute from "../components/ProtectedRoute";
import { useState } from "react";

const Router = () => {
  const [user, setUer] = useState(null);
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout/>}>
          {/* Routs */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />}/>
          {/* ProtectedRoute */}
          
          
          <Route element={<ProtectedRoute user={user}  />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/test" element={<Test />} />
            <Route path="/result" element={<TestResult />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
