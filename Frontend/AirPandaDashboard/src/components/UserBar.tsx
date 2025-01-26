import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import {
  JwtDecodedUserImage,
  JwtDecodedUserName,
} from "../services/jwt-service";

const UserBar = () => {
  const { logout } = useAuth();

  return (
    <Menu as="div" className="relative me-6">
      <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
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
        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-2xl bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in "
      >
        <p className="ms-4 my-3 text-gray-500 text-">
          Hello {JwtDecodedUserName()}
        </p>
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
  );
};

export default UserBar;
