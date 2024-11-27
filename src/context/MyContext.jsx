import React, { createContext, useState } from "react";

export const MyContext = createContext();

export const MyProvider = ({ children }) => {
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
    <MyContext.Provider value={{ user, setUser: updateUser }}>
      {children}
    </MyContext.Provider>
  );
};
