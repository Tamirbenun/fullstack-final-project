import { request } from "../utils/axios-interceptors";

const baseUrl = import.meta.env.VITE_BASE_URL + "/Destinations";

export const getAllDestinations = () =>
  request({
    url: `${baseUrl}`,
    method: "GET",
  });
