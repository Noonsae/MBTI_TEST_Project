import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <header></header>
      <main>
        {/* 라우트에 해당하는 컴포넌트가 렌더링 */}
        <Outlet />
      </main>
      <footer></footer>
    </>
  );
};

export default Layout;
