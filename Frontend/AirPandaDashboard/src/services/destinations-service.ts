import { request } from "../utils/axios-interceptors";

const baseUrl = import.meta.env.VITE_BASE_URL + "/Destinations";
const baseUrlExternal =
  import.meta.env.VITE_BASE_URL + "/ExternalAPIs/Airports";

interface Destination {
  id: string;
  city: string;
  country: string;
  airport: string;
  icao: string;
  iata: string;
  flightNumber: string;
  elevationFt: string;
  latitude: string;
  longitude: string;
  timeZone: string;
  image: string;
}

interface NewDestination {
  city: string;
  country: string;
  airport: string;
  icao: string;
  iata: string;
  flightNumber: string;
  elevationFt: string;
  latitude: string;
  longitude: string;
  timeZone: string;
  image: string;
}

export const getAirportsByCity = (filter: string, search: string) =>
  request({
    url: `${baseUrlExternal}/${filter}/${search}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const getAllDestinations = () =>
  request({
    url: `${baseUrl}`,
    method: "GET",
  });

export const getDestinationsById = (id: string) =>
  request({
    url: `${baseUrl}/${id}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const getDestinationsByCity = (city: string) =>
  request({
    url: `${baseUrl}/City/${city}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const postDestination = (destination: NewDestination) =>
  request({
    url: `${baseUrl}`,
    method: "POST",
    data: destination,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const putDestination = (id: string, destination: Destination) =>
  request({
    url: `${baseUrl}/${id}`,
    method: "PUT",
    data: destination,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const deleteDestination = (id: string) =>
  request({
    url: `${baseUrl}/${id}`,
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
