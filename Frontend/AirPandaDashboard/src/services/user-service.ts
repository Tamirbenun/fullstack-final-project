import { request } from "../utils/axios-interceptors";

interface User {
  userName: string;
  email: string;
  image: string;
  password: string;
}

interface Flight {
  id: string;
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

const baseUrl = import.meta.env.VITE_BASE_URL + "/Auth";

export const getAllUsers = () =>
  request({
    url: `${baseUrl}/Users`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const getUserById = (id: string) =>
  request({
    url: `${baseUrl}/User/${id}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const updateUserById = (id: string, user: User, role: string) =>
  request({
    url: `${baseUrl}/${id}`,
    method: "PUT",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: {
      userName: user.userName,
      email: user.email,
      image: user.image,
    },
    params: {
      role: role,
    },
  });

export const deleteUserById = (id: string) =>
  request({
    url: `${baseUrl}/User/${id}`,
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
