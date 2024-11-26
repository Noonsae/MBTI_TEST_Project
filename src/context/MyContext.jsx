import React, { createContext, useState } from "react";

export const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      // 값이 없거나 undefined인 경우 null 반환
      if (!storedUser) {
        console.log("No user found in localStorage");
        return null;
      }
      return JSON.parse(storedUser);
    } catch (error) {
      console.error("Error parsing user from localStorage:", error);
      return null; // 오류 발생 시 안전한 초기값 반환
    }
  });

  const updateUser = (newUser) => {
    setUser(newUser);
    if (newUser) {
      localStorage.setItem("user", JSON.stringify(newUser));
    } else {
      localStorage.removeItem("user");
    }
  };
  return (
    <MyContext.Provider value={{ user, setUser: updateUser }}>
      {children}
    </MyContext.Provider>
  );
};
