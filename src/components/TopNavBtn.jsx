import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../context/AuthContext";

const TopNavBtn = () => {
  const { isLoggedIn, setUser, setIsLoggedIn } = useContext(AuthContext);

  const navigate = useNavigate();

  // 로그아웃 함수
  const handleLogout = () => {

    const confirmLogout = window.confirm("로그아웃을 하시겠습니까?");
    if (confirmLogout) {
      setUser(null);
      setIsLoggedIn(false);
      localStorage.removeItem("accessToken");
      navigate("/");
    } 
  };

  const NavigateLogin = () => {
    navigate("/login");
  };

  return (
    <>
      {isLoggedIn ? (
        <NavWrap>
          <li>
            <NavLink to="/profile">프로필</NavLink>
          </li>
          <li>
            <NavLink to="/test">테스트</NavLink>
          </li>
          <li>
            <NavLink to="/result">결과보기</NavLink>
          </li>
          <TopBtn type="button" onClick={handleLogout}>
            로그아웃
          </TopBtn>
        </NavWrap>
      ) : (
        <TopBtn type="button" onClick={NavigateLogin}>
          로그인
        </TopBtn>
      )}
    </>
  );
};

export default TopNavBtn;

const NavWrap = styled.ul`
  display: flex;
  width: 480px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const NavLink = styled(Link)`
  padding: 10px;
`;

const TopBtn = styled.button`
  padding: 10px;
  margin-right: -10px;
`;
