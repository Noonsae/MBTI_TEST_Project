import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(undefined);

  useEffect(() => {
    // 컴포넌트가 마운트될 때 로컬 스토리지에서 토큰을 확인
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const updateUser = (newUser) => {
    if (newUser) {
      localStorage.setItem("accessToken", newUser.accessToken);
    } else {
      localStorage.removeItem("accessToken");
    }

    setUser(newUser);
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser: updateUser, isLoggedIn, setIsLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};
