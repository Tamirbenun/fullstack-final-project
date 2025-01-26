import { request } from "../utils/axios-interceptors";

const baseUrl = import.meta.env.VITE_BASE_URL + "/Notifications";

interface UpdateNotification {
  isReade: boolean;
}

export const getAllNotificationsByUserId = (id: string) =>
  request({
    url: `${baseUrl}/UserId/${id}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const patchNotificationReade = (
  id: string,
  updateNotification: UpdateNotification
) =>
  request({
    url: `${baseUrl}/${id}`,
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: updateNotification,
  });

export const deleteNotificationById = (id: string) =>
  request({
    url: `${baseUrl}/${id}`,
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
