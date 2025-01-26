import { request } from "../utils/axios-interceptors";

interface Email {
  email: string;
  joiningDate: Date;
}

const baseUrl = import.meta.env.VITE_BASE_URL + "/Newsletter";

export const getAllEmails = () =>
  request({
    url: `${baseUrl}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const getEmail = (email: string) =>
  request({
    url: `${baseUrl}/${email}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const postEmail = (email: Email) =>
  request({
    url: `${baseUrl}`,
    method: "POST",
    data: email,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const deleteEmail = (email: string) =>
  request({
    url: `${baseUrl}/${email}`,
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
