import React, { useContext, useEffect, useState } from "react";
import { TbMessage, TbTrashXFilled } from "react-icons/tb";
import { MutatingDots } from "react-loader-spinner";
import Swal from "sweetalert2";
import { JwtDecodedID } from "../../services/jwt-service";
import {
  deleteNotificationById,
  getAllNotificationsByUserId,
  patchNotificationReade,
} from "../../services/notifications-service";
import { IoMail, IoMailOpen } from "react-icons/io5";
import { DataContext } from "../../contexts/DataContext";

interface Notification {
  id: string;
  userId: string;
  dateTime: Date;
  img: string;
  name: string;
  title: string;
  content: string;
  isReade: boolean;
}

interface UpdateNotification {
  isReade: boolean;
}

const Notifications = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { setNotificationsCount } = useContext(DataContext);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const response = await getAllNotificationsByUserId(JwtDecodedID());
      setNotifications(response.data);
      const data: Notification[] = response.data;
      const filter: Notification[] = data.filter((d) => d.isReade === false);
      setNotificationsCount(filter?.length);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleReade = async (id: string, isReade: boolean) => {
    const updateReade: UpdateNotification = {
      isReade: !isReade,
    };
    try {
      await patchNotificationReade(id, updateReade);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
    fetchNotifications();
  };

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
    <div className="flex-1 md:px-10">
      <div className="flex justify-between mb-5 mt-5 md:mt-0">
        <h2 className="font-medium text-3xl">Notifications</h2>
      </div>
      {!loading ? (
        notifications ? (
          <>
            {notifications.map((n) => (
              <div
                key={n.id}
                className={`rounded-3xl my-3 p-8 bg-gray-100 dark:bg-[#2f2f2f] ${
                  !n.isReade && "font-bold"
                }`}
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
                      <p
                        className={`${
                          !n.isReade ? "font-bold" : "font-medium"
                        }`}
                      >
                        {n.title}
                      </p>
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
                      className=" hover:text-blue-400 text-lg text-gray-400"
                      onClick={() => handleReade(n.id, n.isReade)}
                    >
                      {n.isReade ? <IoMailOpen /> : <IoMail />}
                    </button>
                    <button
                      className=" hover:text-red-400 text-lg  text-gray-400"
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
        <div className="flex justify-center mt-10 h-screen">
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
      )}
    </div>
  );
};

export default Notifications;
