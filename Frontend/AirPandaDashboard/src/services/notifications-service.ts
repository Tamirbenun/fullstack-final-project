import { request } from "../utils/axios-interceptors";

const baseUrl = import.meta.env.VITE_BASE_URL + "/Notifications";

interface Notification {
  userId: string;
  dateTime: Date;
  img: string;
  name: string;
  title: string;
  content: string;
  isReade: boolean;
}

export const getAllNotifications = () =>
  request({
    url: `${baseUrl}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const getAllNotificationsByUserId = (id: string) =>
  request({
    url: `${baseUrl}/UserId/${id}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const postNotification = (notification: Notification) =>
  request({
    url: `${baseUrl}`,
    method: "POST",
    data: notification,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const deleteNotificationById = (id: string) =>
  request({
    url: `${baseUrl}/${id}`,
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
