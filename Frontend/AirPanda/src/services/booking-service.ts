import { request } from "../utils/axios-interceptors";

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

const FlightsURL = "/Flights";
const DestinationsURL = "/Destinations";
const TicketsURL = "/Tickets";
const PaymentURL = "/Payment/ProcessPayment";

export const getDestinations = () =>
  request({
    url: `${DestinationsURL}`,
    method: "GET",
  });

export const getFlightsByDestination = (
  fromIATA: string,
  toIATA: string,
  departure: string
) =>
  request({
    url: `${FlightsURL}/${fromIATA}/${toIATA}/${departure}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const getFlightById = (id: string) =>
  request({
    url: `${FlightsURL}/${id}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const getTicketsByUserId = (userId: string) =>
  request({
    url: `${TicketsURL}/UserId/${userId}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const postPayment = (
  cardNumber: string,
  cardHolderName: string,
  ExpirationDate: string,
  cvv: string,
  tickets: Ticket[]
) =>
  request({
    url: `${PaymentURL}`,
    method: "POST",
    data: { cardNumber, cardHolderName, ExpirationDate, cvv, tickets },
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
