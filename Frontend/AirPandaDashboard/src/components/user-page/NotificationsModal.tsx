import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment, useContext, useState } from "react";
import { DataContext } from "../../contexts/DataContext";
import { postNotification } from "../../services/notifications-service";
import {
  JwtDecodedUserImage,
  JwtDecodedUserName,
} from "../../services/jwt-service";
import Swal from "sweetalert2";

interface Notification {
  userId: string;
  dateTime: Date;
  img: string;
  name: string;
  title: string;
  content: string;
  isReade: boolean;
}

const NotificationsModal = ({ isOpen, setIsOpen }) => {
  const { userSelected } = useContext(DataContext);
  const img00: string = "https://i.postimg.cc/rwJcWVzK/ap-profile.jpg";
  const [from, setFrom] = useState<string>("airpanda");
  const [title, setTitle] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleFromChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFrom(event.target.value);
  };

  const handleTitleChange = (event) => {
    const value = event.target.value;
    setTitle(value);
  };

  const handleMessageChange = (event) => {
    const value = event.target.value;
    setMessage(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title || !message) {
      return;
    }

    const img: string = from === "airpanda" ? img00 : JwtDecodedUserImage();
    const name: string =
      from === "airpanda" ? "airpanda" : JwtDecodedUserName();
    const newNotification: Notification = {
      userId: userSelected[0],
      dateTime: new Date(),
      img: img,
      name: name,
      title: title,
      content: message,
      isReade: true,
    };

    console.log(newNotification);

    try {
      const response = await postNotification(newNotification);
      if (!response.data.error) {
        Swal.fire({
          title: "success",
          text: "Message Sent successfully",
          icon: "success",
          confirmButtonText: "Ok",
          customClass: {
            popup: "custom-swal",
            confirmButton: "custom-confirm-button",
          },
        }).then((result) => {
          if (result.isConfirmed) {
            setIsOpen(false);
          }
        });
      } else {
        console.error("Error sending message:", response.data.error);
        Swal.fire({
          title: "Error",
          text: response.data.error,
          icon: "error",
          confirmButtonText: "Ok",
          customClass: {
            popup: "custom-swal",
            confirmButton: "custom-confirm-button",
          },
        });
      }
    } catch (error) {
      console.error("Error sending message:", error);
      Swal.fire({
        title: "Error",
        text: error,
        icon: "error",
        confirmButtonText: "Ok",
        customClass: {
          popup: "custom-swal",
          confirmButton: "custom-confirm-button",
        },
      });
    }
  };

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
              <DialogPanel className="w-full max-w-md bg-white dark:bg-[#525252] rounded-3xl p-8 shadow-xl">
                <DialogTitle className="text-center text-lg font-bold">
                  <p className="text-xl font-medium">New Message</p>
                </DialogTitle>

                <form
                  onSubmit={handleSubmit}
                  className="mt-5 dark:text-white/60"
                >
                  <div className="flex items-center gap-1 mt-2 border-b dark:border-white/40">
                    <label htmlFor="from" className="me-3">
                      From:
                    </label>
                    <img
                      src={from === "airpanda" ? img00 : JwtDecodedUserImage()}
                      className="h-[30px] rounded-full"
                    />
                    <select
                      id="from"
                      value={from}
                      onChange={handleFromChange}
                      className="w-full p-2 bg-white dark:bg-[#525252] text-black dark:text-white/60  focus:outline-none"
                    >
                      <option value="airpanda">Customer Service</option>
                      <option value={JwtDecodedUserName()}>
                        {JwtDecodedUserName()}
                      </option>
                    </select>
                  </div>

                  <div className="flex items-center mt-5 border-b dark:border-white/60">
                    <label htmlFor="to">To:</label>
                    <input
                      id="to"
                      type="text"
                      disabled={true}
                      value={userSelected[1]}
                      className=" transition-border duration-500 ease-in-out w-full p-3 disabled:bg-white dark:bg-[#525252]"
                    />
                  </div>

                  <div className="flex items-center mt-5 border-b dark:border-white/60">
                    <label htmlFor="title">Title:</label>
                    <input
                      id="title"
                      type="text"
                      value={title}
                      onChange={(e) => handleTitleChange(e)}
                      className="transition-border duration-500 ease-in-out w-full p-3 disabled:bg-white focus:outline-non dark:bg-[#525252]"
                    />
                  </div>

                  <div className="mt-5">
                    <label htmlFor="message">Message:</label>
                    <textarea
                      id="message"
                      value={message}
                      onChange={(e) => handleMessageChange(e)}
                      className="border dark:border-white/60 transition-border duration-500 ease-in-out w-full mt-2 p-3 disabled:bg-white focus:outline-none dark:bg-[#525252]"
                    />
                  </div>

                  <div className="flex justify-center gap-2 mt-5">
                    <button
                      className="rounded-xl p-2 text-black bg-gray-300 hover:bg-gray-400"
                      onClick={() => setIsOpen(false)}
                    >
                      Cancle
                    </button>
                    <button
                      className="rounded-xl py-2 px-5 bg-red-500 hover:bg-red-600 text-white"
                      type="submit"
                    >
                      Send
                    </button>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default NotificationsModal;
