import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ login }) {
  if (!login) {
    // 로그인되지 않았다면 로그인페이지로 강제 이동
    return <Navigate to="/login" />;
  }
  return <Outlet />;
}

export default ProtectedRoute;
