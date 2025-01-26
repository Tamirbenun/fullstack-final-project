import "../css/NavBar.css";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import logo from "../assets/logo.svg";
import useAuth from "../hooks/useAuth";
import ConnectionButtons from "./ConnectionButtons";
import UserBar from "./UserBar";
import { NavLink } from "react-router-dom";
import { RiCloseLargeLine } from "react-icons/ri";
import { GoHomeFill } from "react-icons/go";
import { FaInfo } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { PiAirplaneInFlightFill } from "react-icons/pi";

const NavBar = () => {
  const { isLoggedIn } = useAuth();

  const navigation = [
    { name: "Home", to: "/", icon: <GoHomeFill /> },
    { name: "Contact Us", to: "/contact", icon: <PiAirplaneInFlightFill /> },
    { name: "About", to: "/about", icon: <FaInfo /> },
  ];

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <>
      <Disclosure as="nav" className="top-0">
        <div className="mx-auto px-2 md:px-16">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center lg:hidden">
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-full p-2 text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                <FiMenu
                  aria-hidden="true"
                  className="block h-6 w-6 group-data-[open]:hidden"
                />
                <RiCloseLargeLine
                  aria-hidden="true"
                  className="hidden h-6 w-6 group-data-[open]:block"
                />
              </DisclosureButton>
            </div>

            <div className="flex items-center ms-14 lg:ms-0 mg:items-stretch lg:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <NavLink to="/">
                  <img alt="airpanda logo" src={logo} className="h-7 w-auto" />
                </NavLink>
              </div>
            </div>

            <div className="hidden lg:ml-6 lg:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.to}
                    className={({ isActive }) =>
                      classNames(
                        isActive
                          ? "font-medium text-darkblue"
                          : "text-gray-400 font-medium text-hover-darkblue",
                        "px-3 py-2"
                      )
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
            </div>

            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static md:inset-auto md:ml-6 md:pr-0">
              {!isLoggedIn ? <ConnectionButtons /> : <UserBar />}
            </div>
          </div>
        </div>

        <DisclosurePanel className="lg:hidden bg-gray-200 md:mx-10 md:mb-5 md:rounded-3xl">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navigation.map((item) => (
              <DisclosureButton
                key={item.name}
                as={NavLink}
                to={item.to}
                className={({ isActive }) =>
                  classNames(
                    isActive
                      ? "font-medium text-darkblue"
                      : "text-gray-500 font-medium text-hover-darkblue",
                    " px-3 py-2 block"
                  )
                }
              >
                <div className="flex ms-5">
                  <span className="text-lg mt-0.5 me-2">{item.icon}</span>
                  <span>{item.name}</span>
                </div>
              </DisclosureButton>
            ))}
          </div>
        </DisclosurePanel>
      </Disclosure>
    </>
  );
};

export default NavBar;
