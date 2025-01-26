import { request } from "../utils/axios-interceptors";

const baseUrl = import.meta.env.VITE_BASE_URL + "/Flights";

interface Flight {
  id: string;
  flightNumber: string;
  fromICAO: string;
  fromIATA: string;
  fromAirport: string;
  fromCity: string;
  fromCountry: string;
  toICAO: string;
  toIATA: string;
  toAirport: string;
  toCity: string;
  toCountry: string;
  gate: string;
  departure: Date;
  flightTime: string;
  seats: number[];
  seatsTaken: string[];
  price: number[];
  isActive: boolean;
}

interface UpdateFlight {
  flightNumber: string;
  fromICAO: string;
  fromIATA: string;
  fromAirport: string;
  fromCity: string;
  fromCountry: string;
  toICAO: string;
  toIATA: string;
  toAirport: string;
  toCity: string;
  toCountry: string;
  gate: string;
  departure: Date;
  flightTime: string;
  seats: number[];
  seatsTaken: string[];
  price: number[];
  isActive: boolean;
}

export const getFlightsByDate = (date: string) =>
  request({
    url: `${baseUrl}/Dates/${date}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const getFlightsByDetails = (
  fromIATA: string,
  toIATA: string,
  departure: string
) =>
  request({
    url: `${baseUrl}/${fromIATA}/${toIATA}/${departure}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const getFlightById = (id: string) =>
  request({
    url: `${baseUrl}/${id}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const getFlightsCountByDate = (date: string) =>
  request({
    url: `${baseUrl}/Count/${date}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const getClosestFlights = (date: string) =>
  request({
    url: `${baseUrl}/Closest/${date}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const postFlights = (flights: UpdateFlight[]) =>
  request({
    url: `${baseUrl}`,
    method: "POST",
    data: flights,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const putFlightById = (id: string, flights: Flight) =>
  request({
    url: `${baseUrl}/${id}`,
    method: "PUT",
    data: flights,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const putFlightSeatsTakenById = (id: string, seats: string) =>
  request({
    url: `${baseUrl}/SeatsTaken/${id}/${seats}`,
    method: "PUT",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const deleteFlightById = (id: string) =>
  request({
    url: `${baseUrl}/${id}`,
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
