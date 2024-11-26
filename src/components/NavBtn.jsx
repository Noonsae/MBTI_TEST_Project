import React from "react";
import { useNavigate } from "react-router-dom";

const NavBtn = ({ to, children, state }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(to, { state })
  }

  return <button onClick={handleNavigate}>{children}</button>;
};

export default NavBtn;
