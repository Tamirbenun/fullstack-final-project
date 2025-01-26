import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment, useContext, useEffect, useState } from "react";
import { DataContext } from "../../contexts/DataContext";
import { FaCheck } from "react-icons/fa";

const imagesLinks = [
  { id: "a-01", link: "https://i.postimg.cc/FH7ZLG85/avatar-01.jpg" },
  { id: "a-02", link: "https://i.postimg.cc/YCzWjFqK/avatar-02.jpg" },
  { id: "a-03", link: "https://i.postimg.cc/Y0JXS4hh/avatar-03.jpg" },
  { id: "a-04", link: "https://i.postimg.cc/pV7cCSqR/avatar-04.jpg" },
  { id: "a-05", link: "https://i.postimg.cc/t4drX4y4/avatar-05.jpg" },
  { id: "a-06", link: "https://i.postimg.cc/7Y2sWNW7/avatar-06.jpg" },
  { id: "a-07", link: "https://i.postimg.cc/YCBnKm5P/avatar-07.jpg" },
  { id: "a-08", link: "https://i.postimg.cc/CKmmqrRy/avatar-08.jpg" },
  { id: "a-09", link: "https://i.postimg.cc/zBvpSwhy/avatar-09.jpg" },
  { id: "a-10", link: "https://i.postimg.cc/bvzmdfNH/avatar-10.jpg" },
  { id: "a-11", link: "https://i.postimg.cc/bJ5g6G03/avatar-11.jpg" },
  { id: "a-12", link: "https://i.postimg.cc/fknKN6rd/avatar-12.jpg" },
];

const ImgModal = ({ isOpen, setIsOpen }) => {
  const { image, setImage } = useContext(DataContext);
  const [originalImage, setOriginalImage] = useState(image);

  useEffect(() => {
    if (isOpen) {
      setOriginalImage(image);
    }
  }, [isOpen]);

  const handleCancle = () => {
    setImage(originalImage);
    setIsOpen(false);
  };

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
            <DialogPanel className="w-full max-w-md bg-white dark:bg-[#b6b6b6] rounded-3xl p-8 shadow-xl">
              <DialogTitle className="text-center text-lg font-bold">
                <p className="text-xl font-medium">Choose a profile picture</p>
              </DialogTitle>

              <div className="text-center mt-5">
                <div className="grid grid-cols-3 gap-4">
                  {imagesLinks?.map((i) => (
                    <div key={i.id} className="relative">
                      <button>
                        <img
                          src={i.link}
                          className={`rounded-full border-2 hover:border-blue-400 ${
                            i.link === image
                              ? "border-blue-400"
                              : "border-white"
                          }`}
                          onClick={() => setImage(i.link)}
                        />
                      </button>
                      <div
                        className={`absolute p-1 rounded-full right-3 bottom-3 bg-blue-500 text-white ${
                          i.link !== image && "hidden"
                        }`}
                      >
                        <FaCheck className="text-sm" />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-center gap-2 mt-5">
                  <button
                    className="rounded-xl p-2 text-black bg-gray-300 hover:bg-gray-400"
                    onClick={handleCancle}
                  >
                    Cancle
                  </button>
                  <button
                    className="rounded-xl py-2 px-5 bg-red-500 hover:bg-red-600 text-white"
                    onClick={() => setIsOpen(false)}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ImgModal;
