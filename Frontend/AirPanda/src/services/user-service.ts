import { request } from "../utils/axios-interceptors";

interface User {
  userName: string;
  email: string;
  image: string;
  password?: string;
}

const baseUrl = import.meta.env.VITE_BASE_URL + "/Auth";

export const getUserById = (id: string) =>
  request({
    url: `${baseUrl}/User/${id}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const updateUserById = (id: string, user: User) =>
  request({
    url: `${baseUrl}/User/${id}`,
    method: "PUT",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: user,
  });
