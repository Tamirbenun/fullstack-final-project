import React, { useContext } from "react";
import { BiSolidUserRectangle } from "react-icons/bi";
import { HiLocationMarker } from "react-icons/hi";
import { PiAirplaneInFlightFill } from "react-icons/pi";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";
import ToggleTheme from "./ToggleTheme";
import { DataContext } from "../contexts/DataContext";
import { HiMiniNewspaper } from "react-icons/hi2";

const pages = [
  { name: "Dashboard", icon: <TbLayoutDashboardFilled />, to: "/" },
  { name: "Newsletter", icon: <HiMiniNewspaper />, to: "/Newsletter" },
  { name: "Flights", icon: <PiAirplaneInFlightFill />, to: "/Flights" },
  { name: "Destinations", icon: <HiLocationMarker />, to: "/Destinations" },
  { name: "Users", icon: <BiSolidUserRectangle />, to: "/Users" },
];

const Navbar: React.FC = () => {
  const { setView } = useContext(DataContext);
  const location = useLocation();
  const pageName: string = location.pathname.split("/").pop() || "";

  const handleUsersPage = (page: string) => {
    if (page === "Flights") {
      setView("FlightsList");
    } else if (page === "Users") {
      setView("UsersList");
    }
  };

  return (
    <nav
      className="transition-all duration-500 ease-in-out dark:bg-[#181818] dark:text-white/60 bg-gray-100 w-[95px] md:w-[250px] py-10 px-2 md:px-10 flex flex-col justify-between"
      style={{ height: "calc(100vh - 80px)" }}
    >
      <div>
        {pages.map((p) => (
          <Link
            key={p.name}
            to={p.to}
            onClick={() => handleUsersPage(p.name)}
            className={`flex justify-center md:justify-start items-center p-3 mx-4 md:mx-0 rounded-2xl transition-all duration-500 ease-in-out ${
              pageName === p.to
                ? "transition-colors duration-500 ease-in-out bg-gray-200 dark:bg-white/20"
                : pageName === p.to.substring(1)
                ? "transition-colors duration-500 ease-in-out bg-gray-200/50 dark:bg-white/20"
                : ""
            } transition-colors duration-500 ease-in-out hover:bg-gray-200 hover:dark:bg-white/20 text-black/60 dark:text-white/50 my-3`}
          >
            <p className="text-xl md:me-3">{p.icon}</p>
            <p className="transition-colors duration-500 ease-in-out text-black dark:text-white/60 hidden md:block">
              {p.name}
            </p>
          </Link>
        ))}
      </div>

      <div className="flex justify-center items-center">
        <p className="transition-all duration-500 ease-in-out hidden md:block text-gray-400 dark:text-white/40 text-sm me-2">
          Light
        </p>
        <ToggleTheme />
        <p className="transition-all duration-500 ease-in-out hidden md:block text-gray-400 dark:text-white/40 text-sm ms-2">
          Dark
        </p>
      </div>
    </nav>
  );
};

export default Navbar;
