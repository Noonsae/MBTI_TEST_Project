import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Signup from "../pages/Signup";
import Profile from "../pages/Profile";
import Test from "../pages/Test";
import TestResult from "../pages/TestResult";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Routs */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/test" element={<Test />} />
          <Route path="/result" element={<TestResult />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
