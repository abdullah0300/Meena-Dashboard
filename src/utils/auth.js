import { useState, createContext, useContext } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);

  const login = (token, userObj) => {
    localStorage.setItem("token", token);
    setToken(token);
    setRole(userObj.role);
    setUsername(userObj.name);
    setEmail(userObj.email);
    setLoggedIn(true);
  };

  const logout = () => {
    localStorage.setItem("token", "");
    setToken(null);
    setRole(null);
    setUsername(null);
    setEmail(null);
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{ loggedIn, token, role, username, email, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
