import { request } from "../utils/axios-interceptors";

interface Email {
  email: string;
  joiningDate: Date;
}

const baseUrl = import.meta.env.VITE_BASE_URL + "/Newsletter";

export const postEmail = (email: Email) =>
  request({
    url: `${baseUrl}`,
    method: "POST",
    data: email,
  });

export const deleteEmail = (email: string) =>
  request({
    url: `${baseUrl}/${email}`,
    method: "DELETE",
  });
