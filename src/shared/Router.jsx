import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Profile from "../pages/Profile";
import Test from "../pages/Test";
import TestResult from "../pages/TestResult";
import Layout from "../components/Layout";
import ProtectedRoute from "../components/ProtectedRoute";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const Router = () => {

  const { isLoggedIn } = useContext(AuthContext);

  // 로그인 상태가 아직 결정되지 않은 경우 로딩 상태를 표시하거나 아무것도 렌더링하지 않음
  if (isLoggedIn === undefined) {
    return null; // 또는 로딩 컴포넌트를 반환할 수 있음
  }
  
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {/* Routs */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* ProtectedRoute */}

          <Route element={<ProtectedRoute login={isLoggedIn} />}>
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
