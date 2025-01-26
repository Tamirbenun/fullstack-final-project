import axios, { AxiosRequestConfig } from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;

const client = axios.create({
  baseURL: baseUrl,
});

const onSuccess = (response) => {
  console.debug("Request Success");
  return response;
};

const onError = (error) => {
  console.error("Request Failed:", error);
  return error;
};

export const request = (option: AxiosRequestConfig) => {
  return client(option).then(onSuccess).catch(onError);
};

const clientAuth = axios.create({
  baseURL: baseUrl,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export default { client, clientAuth };
