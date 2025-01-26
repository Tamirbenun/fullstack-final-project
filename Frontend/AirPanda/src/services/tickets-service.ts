import { request } from "../utils/axios-interceptors";

const baseUrl = import.meta.env.VITE_BASE_URL + "/Tickets";

interface Ticket {
  flightId: string;
  userId: string;
  firstName: string;
  LastName: string;
  idNumber: string;
  flightNumber: string;
  date: Date;
  class: string;
  seat: string;
  gate: string;
}

export const getAllTicketsByUserId = (id: string) =>
  request({
    url: `${baseUrl}/UserId/${id}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
