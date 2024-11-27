import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  console.log(user);

  const updateUser = (newUser) => {
    if (newUser) {
      localStorage.setItem("accessToken", newUser.accessToken);
    } else {
      localStorage.removeItem("accessToken");
    }

    setUser(newUser);
  };

  return (
    <AuthContext.Provider value={{ user, setUser: updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
