import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  JwtDecodedID,
  JwtDecodedUserImage,
  JwtDecodedUserName,
} from "../services/jwt-service";
import { GoBell } from "react-icons/go";
import { useContext, useEffect } from "react";
import { DataContext } from "../contexts/DataContext";
import { getAllNotificationsByUserId } from "../services/notifications-service";

interface Notification {
  isReade: boolean;
}

const UserBar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { setAccountView, notificationsCount, setNotificationsCount } =
    useContext(DataContext);

  const handleNavigate = () => {
    setAccountView("notifications");
    navigate("/account");
  };

  const fetchNotifications = async () => {
    try {
      const response = await getAllNotificationsByUserId(JwtDecodedID());
      const data: Notification[] = response.data;
      const filter: Notification[] = data.filter((d) => d.isReade === false);
      setNotificationsCount(filter?.length);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <>
      <div className="relative">
        <button
          type="button"
          onClick={handleNavigate}
          className="relative rounded-full p-1 text-gray-400 focus:outline-none hover:bg-gray-100"
        >
          <span className="absolute -inset-1.5" />
          <span className="sr-only">View Notifications</span>
          <GoBell aria-hidden="true" className="h-6 w-6" />
        </button>
        {notificationsCount > 0 && (
          <div className="absolute flex justify-center items-center top-0 right-0 rounded-full bg-red-400 w-[18px] h-[18px]">
            <p className="text-xs text-white">{notificationsCount}</p>
          </div>
        )}
      </div>
      <Menu as="div" className="relative ml-3">
        <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none">
          <span className="sr-only">Open user menu</span>
          <img
            alt="user img"
            aria-label="user image"
            src={JwtDecodedUserImage()}
            className="h-8 w-8 rounded-full"
          />
        </MenuButton>
        <MenuItems
          transition
          className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-3xl bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in "
        >
          <p className="ms-4 my-3 text-gray-500 text-">
            Hello {JwtDecodedUserName()}
          </p>
          <MenuItem>
            <Link
              to="/account"
              onClick={() => setAccountView("profile")}
              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
            >
              Profile
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              to="/account"
              onClick={() => setAccountView("notifications")}
              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
            >
              Notifications
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              to="/account"
              onClick={() => setAccountView("tickets")}
              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
            >
              Tickets
            </Link>
          </MenuItem>
          <hr className="my-1" />
          <MenuItem>
            <Link
              to="/"
              onClick={logout}
              className="mb-4 block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
            >
              Logout
            </Link>
          </MenuItem>
        </MenuItems>
      </Menu>
    </>
  );
};

export default UserBar;
