import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  IoAccessibilitySharp,
  IoDocumentOutline,
  IoContrastOutline,
} from "react-icons/io5";
import { RiMarkPenFill } from "react-icons/ri";
import { FaFont } from "react-icons/fa";

const AccessibilityPanel = ({ open, setOpen }) => {
  const [fontToggle, setFontToggle] = useState<boolean>(() => {
    const savedState = localStorage.getItem("FontToggle");
    return savedState ? JSON.parse(savedState) : false;
  });

  const [linkToggle, setLinkToggle] = useState<boolean>(() => {
    const savedState = localStorage.getItem("LinkToggle");
    return savedState ? JSON.parse(savedState) : false;
  });

  const [grayscaleToggle, setGrayscaleToggle] = useState<boolean>(() => {
    const savedState = localStorage.getItem("GrayscaleToggle");
    return savedState ? JSON.parse(savedState) : false;
  });

  const handleFontToggle = () => {
    const newState = !fontToggle;
    setFontToggle(newState);
    localStorage.setItem("FontToggle", JSON.stringify(newState));
    document.documentElement.classList.toggle("large-font", !fontToggle);
  };

  const handleLinkToggle = () => {
    const newState = !linkToggle;
    setLinkToggle(newState);
    localStorage.setItem("LinkToggle", JSON.stringify(newState));
    document.documentElement.style.setProperty(
      "--color",
      !linkToggle && "#FEF08A"
    );
  };

  const handleGrayscaleToggle = () => {
    const newState = !grayscaleToggle;
    setGrayscaleToggle(newState);
    localStorage.setItem("GrayscaleToggle", JSON.stringify(newState));

    const mainElement = document.querySelector("main");
    const headerElement = document.querySelector("header");
    const footerElement = document.querySelector("footer");

    if (mainElement) {
      mainElement.classList.toggle("grayscale", newState);
    }
    if (headerElement) {
      headerElement.classList.toggle("grayscale", newState);
    }
    if (footerElement) {
      footerElement.classList.toggle("grayscale", newState);
    }
  };

  const toggles = [
    {
      name: "Larger Font",
      icon: <FaFont className="text-2xl me-2" />,
      checked: fontToggle,
      function: handleFontToggle,
    },
    {
      name: "Marked Links",
      icon: <RiMarkPenFill className="text-2xl me-2" />,
      checked: linkToggle,
      function: handleLinkToggle,
    },
    {
      name: "Gray Color",
      icon: <IoContrastOutline className="text-2xl me-2" />,
      checked: grayscaleToggle,
      function: handleGrayscaleToggle,
    },
  ];

  return (
    <Dialog
      id="dialog-panel"
      open={open}
      onClose={setOpen}
      className="relative"
    >
      <DialogBackdrop
        transition
        className="fixed data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed bottom-3 left-3 transform  z-10 w-[96%] sm:w-[300px] shadow-xl border rounded-3xl h-auto bg-white">
        <div className="flex items-end sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95 m-0 rounded-3xl sm:rounded-none"
          >
            <div className="p-5 sm:p-6">
              <div className="flex justify-center items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-darkblue sm:mx-0 sm:h-10 sm:w-10">
                  <IoAccessibilitySharp
                    aria-hidden="true"
                    className="h-6 w-6 text-white"
                  />
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle
                    as="h3"
                    className=" font-semibold leading-6 text-darkblue"
                  >
                    Accessibility Panel
                  </DialogTitle>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 h-full p-2 font-semibold text-gray-500">
              {toggles.map((toggle) => (
                <div key={toggle.name} className="flex justify-between p-3">
                  <div
                    className={`flex items-center ${
                      fontToggle && "text-black"
                    }`}
                  >
                    {toggle.icon}
                    <h4>{toggle.name}</h4>
                  </div>
                  <label className="switch rounded-full bg-gray-200">
                    <input
                      type="checkbox"
                      checked={toggle.checked}
                      onChange={toggle.function}
                    />
                    <span className="slider round bg-gray-200"></span>
                  </label>
                </div>
              ))}
            </div>

            <div className="relative">
              <div className="px-4 py-5 align-bottom sm:px-6">
                <div className="flex justify-center items-center text-darkblue mb-4">
                  <IoDocumentOutline className="text-lg" />
                  <NavLink
                    to="/accessibility"
                    onClick={() => setOpen(false)}
                    className="ms-1 font-medium hover:underline"
                  >
                    Accessibility statement
                  </NavLink>
                </div>
                <button
                  type="button"
                  data-autofocus
                  onClick={() => setOpen(false)}
                  className="inline-flex w-full justify-center rounded-xl bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 "
                >
                  Close
                </button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default AccessibilityPanel;
