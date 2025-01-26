import React, { useContext, useEffect, useState } from "react";
import { MutatingDots } from "react-loader-spinner";
import { DataContext } from "../../contexts/DataContext";
import {
  deleteNotificationById,
  getAllNotificationsByUserId,
} from "../../services/notifications-service";
import { TbMessage, TbTrashXFilled } from "react-icons/tb";
import { BiMessageSquareAdd } from "react-icons/bi";
import NotificationsModal from "./NotificationsModal";
import Swal from "sweetalert2";

interface Notification {
  id: string;
  userId: string;
  dateTime: Date;
  img: string;
  name: string;
  title: string;
  content: string;
  isReade: string;
}

const NotificationsUser = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { userSelected } = useContext(DataContext);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const response = await getAllNotificationsByUserId(userSelected[0]);
      setNotifications(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      fetchNotifications();
    }
  }, [isOpen]);

  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure you want to delete the message?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await deleteNotificationById(id);
          if (!response.data.error) {
            Swal.fire({
              title: "success",
              text: "Message Delete successfully",
              icon: "success",
              confirmButtonText: "Ok",
              customClass: {
                popup: "custom-swal",
                confirmButton: "custom-confirm-button",
              },
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
        fetchNotifications();
      } else if (result.isDenied) {
        Swal.fire("Message are not Delete", "", "info");
      }
    });
  };

  return (
    <div className="h-screen">
      <div className="flex justify-end my-4">
        <button
          className="flex items-center gap-2 hover:text-blue-500"
          onClick={() => setIsOpen(true)}
        >
          <p>New Message</p>
          <BiMessageSquareAdd className="text-2xl" />
        </button>
      </div>
      {!loading ? (
        notifications ? (
          <>
            {notifications.map((n) => (
              <div
                key={n.id}
                className="rounded-3xl my-3 p-8 bg-gray-100 dark:bg-[#2f2f2f]"
              >
                <div className="flex justify-between">
                  <div className="flex">
                    <img
                      src={n.img}
                      alt="Sender's img"
                      aria-label="Sender's img"
                      className="rounded-full h-[45px]"
                    />
                    <div className="ms-5">
                      <p className="font-medium">{n.title}</p>
                      <p className="text-gray-400 dark:text-white/30 text-sm">
                        from: {n.name}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-1">
                    <p className="text-gray-400 dark:text-white/30 text-sm">
                      {new Intl.DateTimeFormat("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      }).format(new Date(n.dateTime))}
                    </p>
                    <button
                      className=" hover:text-red-400 text-lg"
                      onClick={() => handleDelete(n.id)}
                    >
                      <TbTrashXFilled />
                    </button>
                  </div>
                </div>
                <p className="mt-4">{n.content}</p>
              </div>
            ))}
          </>
        ) : (
          <>
            <div className="text-center mt-10 transition-colors duration-500 ease-in-out dark:text-white/20 text-gray-200">
              <div className="flex justify-center">
                <TbMessage className="text-8xl" />
              </div>
              <p className="text-lg mt-4">No Notifications Found</p>
            </div>
          </>
        )
      ) : (
        <>
          {localStorage.getItem("theme") === "light" ? (
            <div className="flex justify-center mt-10">
              <MutatingDots
                visible={true}
                height="100"
                width="100"
                color="#003268"
                secondaryColor="#003268"
                radius="12.5"
                ariaLabel="mutating-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            </div>
          ) : (
            <div className="flex justify-center mt-10">
              <MutatingDots
                visible={true}
                height="100"
                width="100"
                color="#ffffff"
                secondaryColor="#ffffff"
                radius="12.5"
                ariaLabel="mutating-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            </div>
          )}
        </>
      )}
      <NotificationsModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default NotificationsUser;
