import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment } from "react";
import { IoClose } from "react-icons/io5";
import AddDestination from "./AddDestination";
import DeleteDestination from "./DeleteDestination";
import ViewDestinations from "./ViewDestinations";

interface Destination {
  id: string;
  city: string;
  country: string;
  airport: string;
  icao: string;
  iata: string;
  flightNumber: string;
  elevationFt: string;
  latitude: string;
  longitude: string;
  timeZone: string;
  image: string;
}

const DestinationsModal = ({
  isOpen,
  setIsOpen,
  action,
  destinations,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  action: string;
  destinations: Destination[];
}) => {
  return (
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
            <DialogPanel
              className={`w-full ${
                action === "add" || action === "view" ? "max-w-3xl" : "max-w-md"
              } bg-white dark:bg-[#2f2f2f] rounded-3xl p-5 shadow-xl h-[90vh] md:h-auto`}
            >
              <DialogTitle className="text-center text-lg font-bold relative">
                {action === "add" && (
                  <p className="text-3xl font-medium mb-3 dark:text-white/60">
                    Add Destination
                  </p>
                )}
                {action === "delete" && (
                  <p className="text-4xl text-red-500 font-medium">
                    Delete Destinations
                  </p>
                )}
                {action === "view" && (
                  <p className="text-3xl font-medium mb-3 dark:text-white/60">
                    View Destinations
                  </p>
                )}
                <button
                  className="transition-colors duration-300 ease-in-out absolute top-0 right-0 flex justify-center items-center rounded-full text-gray-300 dark:text-white/60 hover:bg-gray-100 hover:text-gray-500 dark:hover:bg-black dark:hover:text-white p-1"
                  onClick={() => setIsOpen(false)}
                >
                  <IoClose className="text-2xl" />
                </button>
              </DialogTitle>

              {action === "add" ? (
                <AddDestination
                  setIsOpen={setIsOpen}
                  destinations={destinations}
                />
              ) : action === "delete" ? (
                <DeleteDestination setIsOpen={setIsOpen} />
              ) : (
                <ViewDestinations
                  setIsOpen={setIsOpen}
                  destinations={destinations}
                />
              )}
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
};

export default DestinationsModal;
