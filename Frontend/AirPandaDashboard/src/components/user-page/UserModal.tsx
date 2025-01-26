import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment, useEffect } from "react";
import Register from "./Register";
import DeleteUser from "./DeleteUser";

const UserModal = ({ isOpen, setIsOpen, action }) => {
  useEffect(() => {
    if (isOpen) {
      document.getElementById("modal-content")?.focus();
    }
  }, [isOpen]);

  return (
    <div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setIsOpen}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />
          </TransitionChild>

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="scale-95 opacity-0"
              enterTo="scale-100 opacity-100"
              leave="ease-in duration-200"
              leaveFrom="scale-100 opacity-100"
              leaveTo="scale-95 opacity-0"
            >
              <DialogPanel className="w-full max-w-md bg-white dark:bg-[#b6b6b6] rounded-3xl p-8 shadow-xl">
                <DialogTitle className="text-center text-lg font-bold">
                  {action === "register" && (
                    <p className="text-3xl font-medium">Add User</p>
                  )}
                  {action === "delete" && (
                    <p className="text-4xl text-red-500 font-medium">
                      Delete User
                    </p>
                  )}
                </DialogTitle>

                {action === "register" ? (
                  <Register setIsOpen={setIsOpen} />
                ) : (
                  <DeleteUser setIsOpen={setIsOpen} />
                )}
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default UserModal;
