import { Outlet } from "react-router-dom";
import styled from "styled-components";

const Layout = () => {
  return (
    <>
      <StHeader>
        <NavBtnWrap>
          <NavBtn type="button" onClick={""}>
            Home
          </NavBtn>
          <NavBtn type="button" onClick={""}>
            Login
          </NavBtn>
        </NavBtnWrap>
      </StHeader>
      <StMain>
        <ContentWrap>
          {/* 라우트에 해당하는 컴포넌트가 렌더링 */}
          <Outlet />
        </ContentWrap>
      </StMain>
      <footer></footer>
    </>
  );
};

export default Layout;

const StHeader = styled.header`
  width: 100%;
  background-color: #fff;
  box-shadow: 0 8px 16px rgba(180, 180, 180, 0.3);
  position: fixed;
`;
const NavBtnWrap = styled.div`
  width: 70%;
  height: 80px;

  margin: 0 auto;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  font-size: 26px;
  font-weight: normal;
  color: #3695d5;
`;

const NavBtn = styled.button`
  padding: 21px;

  &:first-child {
    margin-left: -21px;
  }

  &:last-child {
    margin-right: -21px;
  }
`;

const StMain = styled.main`
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  background: linear-gradient(45deg, #fff, #d7f3fb);  
`;

const ContentWrap = styled.div`
  width: 70%;
  height: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 50px;  
`;
