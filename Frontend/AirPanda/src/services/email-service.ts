import { request } from "../utils/axios-interceptors";

interface Email {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const baseUrl = import.meta.env.VITE_BASE_URL + "/Email/Send";

export const postEmail = (message: Email) =>
  request({
    url: `${baseUrl}`,
    method: "POST",
    data: message,
  });
