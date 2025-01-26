import logo from "../assets/logo.svg";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useContext, useEffect } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { DataContext } from "../contexts/DataContext";
import UserBar from "./UserBar";

const Header: React.FC = () => {
  const location = useLocation();
  const pageName: string = location.pathname.split("/").pop() || "";
  const { theme } = useContext(ThemeContext);
  const { view, userSelected } = useContext(DataContext);

  useEffect(() => {
    if (!localStorage.getItem("theme")) {
      localStorage.setItem("theme", "light");
    }
  }, []);

  return (
    <header className="transition-all duration-500 ease-in-out flex justify-between items-center h-[80px] dark:bg-[#212121] dark:text-white/60">
      <div className="flex items-center">
        <div
          className={`transition-all duration-500 ease-in-out w-[95px] md:w-[250px] h-[100px] flex items-center justify-center ${
            theme === false
              ? pageName !== "login" &&
                "transition-colors duration-500 ease-in-out bg-gray-100"
              : pageName !== "login" &&
                "transition-all duration-500 ease-in-out dark:bg-[#181818]"
          } border-gray-200 px-[31px] md:px-10 p-5`}
        >
          <NavLink to="/">
            <img
              src={logo}
              alt="airpanda logo"
              aria-label="airpanda logo"
              className="h-6 w-auto mt-0.5 transition-all duration-500 ease-in-out dark:brightness-0 dark:invert dark:opacity-40 object-cover object-left"
            />
          </NavLink>
        </div>

        <p className="text-2xl font-medium ms-10">
          {pageName === ""
            ? "Dashboard"
            : pageName === "login"
            ? ""
            : pageName === "Users" && view === "UsersView"
            ? "Users"
            : pageName === "Users" && view === "UserView"
            ? userSelected[1]
            : pageName}
        </p>
      </div>

      {localStorage.getItem("token") && <UserBar />}
    </header>
  );
};

export default Header;
