import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../../contexts/DataContext";
import { MdNavigateNext } from "react-icons/md";
import { LuTicketsPlane } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";
import Profile from "./Profile";
import Tickets from "./Tickets";
import { TbMessage } from "react-icons/tb";
import NotificationsUser from "./NotificationsUser";

const tabs = [
  { name: "Profile", icon: <CgProfile /> },
  { name: "Tickets", icon: <LuTicketsPlane /> },
  { name: "Notifications", icon: <TbMessage /> },
];

const UserView = () => {
  const userSelected: string[] =
    JSON.parse(localStorage.getItem("userSelected")) || [];
  const [userTab, setUserTab] = useState<string>("Profile");
  const { setView } = useContext(DataContext);

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "userSelected") {
        const updatedValue = JSON.parse(
          localStorage.getItem("userSelected") || "[]"
        );
        if (!updatedValue.length) {
          setView("UsersList");
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    const checkLocalStorage = () => {
      const updatedValue = JSON.parse(
        localStorage.getItem("userSelected") || "[]"
      );
      if (!updatedValue.length) {
        setView("UsersList");
      }
    };

    const interval = setInterval(checkLocalStorage, 500);

    return () => clearInterval(interval);
  }, []);

  const handleBack = (to: string) => {
    if (to === "Users") {
      localStorage.removeItem("userSelected");
      setView("UsersList");
    } else {
      handleTabs(to);
    }
  };

  const handleTabs = (tab: string) => {
    setUserTab(tab);
  };

  return (
    <div className="transition-all duration-500 ease-in-out dark:bg-[#212121] dark:text-white/60 px-10 ">
      <div className="flex items-center text-gray-400 dark:text-white/40">
        <button
          className="transition-colors duration-500 ease-in-out hover:text-blue-400"
          onClick={() => handleBack("Users")}
        >
          Users
        </button>
        <MdNavigateNext className="transition-colors duration-500 ease-in-out" />
        <button
          className="transition-colors duration-500 ease-in-out hover:text-blue-400"
          onClick={() => handleBack("Profile")}
        >
          {userSelected[1]}
        </button>
        {userTab === "Tickets" && (
          <>
            <MdNavigateNext className="transition-colors duration-500 ease-in-out" />
            <button
              className="transition-colors duration-500 ease-in-out hover:text-blue-400"
              onClick={() => handleBack("Tickets")}
            >
              Tickets
            </button>
          </>
        )}
        {userTab === "Notifications" && (
          <>
            <MdNavigateNext className="transition-colors duration-500 ease-in-out" />
            <button
              className="transition-colors duration-500 ease-in-out hover:text-blue-400"
              onClick={() => handleBack("Notifications")}
            >
              Notifications
            </button>
          </>
        )}
      </div>

      <nav className="transition-border duration-500 ease-in-out flex items-center justify-center md:justify-start border-b dark:border-[#606060] mt-5">
        {tabs?.map((t) => (
          <button
            key={t.name}
            className={`transition-border duration-500 ease-in-out flex items-center gap-2 p-2.5 px-3 border-b-2 hover:text-blue-500 ${
              userTab === t.name
                ? "border-blue-500 text-blue-500"
                : "text-black dark:text-white/60 border-white dark:border-[#181818] hover:border-blue-500 dark:hover:border-blue-500 hover:text-blue-500 dark:hover:text-blue-500"
            }`}
            onClick={() => handleTabs(t.name)}
          >
            {t.icon} {" " + t.name}
          </button>
        ))}
      </nav>

      <div className="mt-5">
        {userTab === "Profile" && <Profile />}
        {userTab === "Tickets" && <Tickets />}
        {userTab === "Notifications" && <NotificationsUser />}
      </div>
    </div>
  );
};

export default UserView;
