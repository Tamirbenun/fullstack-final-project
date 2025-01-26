import { createContext, useState } from "react";

export interface AuthContextType {
  isLoggedIn: boolean;
  token: string;
  login: (token: string) => void;
  logout: () => void;
}
const initialValues: AuthContextType = {
  isLoggedIn: !!localStorage.getItem("token"),
  token: localStorage.getItem("token") ?? "",
  login: () => {},
  logout: () => {},
};
const AuthContext = createContext<AuthContextType>(initialValues);

function AuthProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [token, setToken] = useState(localStorage.getItem("token") ?? "");
  function login(token: string) {
    setIsLoggedIn(true);
    setToken(token);
    localStorage.setItem("token", token);
  }
  function logout() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setToken("");
  }
  return (
    <AuthContext.Provider value={{ isLoggedIn, token, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
}
export { AuthProvider, AuthContext };
