import { useContext, useEffect, useState } from "react";
import {
  deleteTicketById,
  getAllTicketsByUserId,
} from "../../services/tickets-service";
import { MutatingDots } from "react-loader-spinner";
import { getFlightById } from "../../services/flights-service";
import plane from "../../assets/images/tickets-plane.svg";
import { QRCodeSVG } from "qrcode.react";
import { LuTicketsPlane } from "react-icons/lu";
import Swal from "sweetalert2";
import { TbTrashXFilled } from "react-icons/tb";
import { DataContext } from "../../contexts/DataContext";
import { GrView } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

interface Ticket {
  id: string;
  flightId: string;
  userId: string;
  firstName: string;
  lastName: string;
  idNumber: string;
  flightNumber: string;
  date: Date;
  class: string;
  seat: string;
  gate: string;
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

const Tickets = () => {
  const { userSelected, setFlightSelected, setView } = useContext(DataContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [flights, setFlights] = useState<Flight[]>([]);
  const navigat = useNavigate();

  const fetchFlights = async (flightId: string) => {
    try {
      const response = await getFlightById(flightId);
      if (response.data) {
        setFlights((prevFlights) => [...prevFlights, response.data]);
      }
    } catch (error) {
      console.error("Error fetching Tickets:", error);
    }
  };

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const response = await getAllTicketsByUserId(userSelected[0]);
      if (response.data) {
        setTickets(response.data);
      }
    } catch (error) {
      console.error("Error fetching Tickets:", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  useEffect(() => {
    if (tickets) {
      tickets.forEach((ticket) => {
        fetchFlights(ticket.flightId);
      });
    }
  }, [tickets]);

  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure you want to delete the message?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await deleteTicketById(id);
          if (!response.data.error) {
            Swal.fire({
              title: "success",
              text: "Ticket and Seat from Flight Delete successfully",
              icon: "success",
              confirmButtonText: "Ok",
              customClass: {
                popup: "custom-swal",
                confirmButton: "custom-confirm-button",
              },
            });
          } else {
            console.error("Error Delete Ticket:", response.data.error);
            Swal.fire({
              title: "Error",
              text: response.data.error,
              icon: "error",
              confirmButtonText: "Ok",
              customClass: {
                popup: "custom-swal",
                confirmButton: "custom-confirm-button",
              },
            });
          }
        } catch (error) {
          console.error("Error Delete Ticket:", error);
          Swal.fire({
            title: "Error",
            text: error,
            icon: "error",
            confirmButtonText: "Ok",
            customClass: {
              popup: "custom-swal",
              confirmButton: "custom-confirm-button",
            },
          });
        }
        fetchTickets();
      } else if (result.isDenied) {
        Swal.fire("Ticket are not Delete", "", "info");
      }
    });
  };

  const handleView = (id: string) => {
    setFlightSelected(id);
    setView("flightView");
    navigat("/Flights");
  };

  return (
    <div className={`${tickets.length > 3 ? "h-full" : "h-screen"}`}>
      {!loading ? (
        <>
          {tickets && flights.length !== 0 ? (
            tickets?.map((t, index) => (
              <div
                key={t.id}
                className="relative rounded-3xl my-5 border dark:border-white/40  max-w-[850px]"
              >
                <div className="flex">
                  <button
                    className="absolute top-0 text-lg bg-red-400 text-white hover:bg-red-500 p-3 rounded-tl-3xl"
                    onClick={() => handleDelete(t.id)}
                  >
                    <TbTrashXFilled />
                  </button>
                  <button
                    className="absolute top-0 left-10 text-lg bg-blue-400 text-white hover:bg-blue-500 p-3 "
                    onClick={() => handleView(t.flightId)}
                  >
                    <GrView />
                  </button>
                </div>
                <div className="flex">
                  <div className="lg:flex justify-between items-center p-10 bg-gray-100 dark:bg-[#181818] rounded-s-3xl flex-1">
                    <div>
                      <p className="text-xs -mb-1">from</p>
                      <p className="text-7xl font-medium">
                        {flights[index]?.fromIATA}
                      </p>
                      <p className="font-medium">
                        {new Date(flights[index]?.departure).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </p>
                      <p className="font-medium -mt-1">
                        {new Date(flights[index]?.departure).toLocaleTimeString(
                          "en-US",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          }
                        )}
                      </p>
                    </div>

                    <img
                      src={plane}
                      alt="plane"
                      aria-label="tickets airplane"
                      className="w-[100px] mb-10 mx-10 dark:invert dark:opacity-50"
                    />

                    <div className="">
                      <p className="text-xs -mb-1">to</p>
                      <p className="text-7xl font-medium">
                        {flights[index]?.toIATA}
                      </p>
                      <p className="font-medium">
                        {flights.length === 0 &&
                          new Date(
                            new Date(flights[index]?.departure).getTime() +
                              (() => {
                                const [hours, minutes] = flights[
                                  index
                                ].flightTime
                                  .split(":")
                                  .map(Number);
                                return (hours * 60 + minutes) * 60 * 1000;
                              })()
                          ).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                      </p>

                      <p className="font-medium -mt-1">
                        {flights &&
                          new Date(
                            new Date(flights[index]?.departure).getTime() +
                              (() => {
                                const [hours, minutes] = flights[
                                  index
                                ].flightTime
                                  .split(":")
                                  .map(Number);
                                return (hours * 60 + minutes) * 60 * 1000;
                              })()
                          ).toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          })}
                      </p>
                    </div>
                  </div>

                  <div className="w-[250px] bg-white dark:bg-[#212121] border-l-black/80 border-l-2 border-dashed border-gray-500 dark:border-white/30 rounded-e-3xl p-5">
                    <div className="flex justify-center items-center">
                      <p className="text-2xl font-medium">
                        {flights[index]?.fromIATA}
                      </p>

                      <img
                        src={plane}
                        alt="plane"
                        aria-label="tickets airplane"
                        className="w-[40px] mx-3 dark:invert dark:opacity-50"
                      />

                      <p className="text-2xl font-medium">
                        {flights[index]?.toIATA}
                      </p>
                    </div>

                    <div className="grid grid-cols-[1fr,2fr] p-2 mt-3 bg-gray-100 dark:bg-[#181818]">
                      <p className="">Flight:</p>
                      <p className="">{t.flightNumber}</p>
                      <p className="">Gate:</p>
                      <p className="">{t.gate}</p>
                      <p className="">Name:</p>
                      <p className="">{t.firstName + " " + t.lastName}</p>
                    </div>

                    <div className="flex mt-5 items-center">
                      <div className="flex-1 h-[60px] text-center pt-0.5 bg-gray-100 dark:bg-[#181818]">
                        <p className="text-4xl font-bold">{t.seat}</p>
                        <p className="-mt-2 tracking-widest">SEAT</p>
                      </div>
                      <QRCodeSVG
                        value={t.id}
                        size={60}
                        fgColor="#ffffff"
                        bgColor="#181818"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center mt-10 transition-colors duration-500 ease-in-out dark:text-[#555555] text-gray-200">
              <div className="flex justify-center">
                <LuTicketsPlane className="text-8xl" />
              </div>
              <p className="text-lg mt-4">No Tickets Found</p>
            </div>
          )}
        </>
      ) : (
        <>
          {localStorage.getItem("theme") === "light" ? (
            <div className="flex justify-center mt-10">
              <MutatingDots
                visible={true}
                height="100"
                width="100"
                color="#003268"
                secondaryColor="#003268"
                radius="12.5"
                ariaLabel="mutating-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            </div>
          ) : (
            <div className="flex justify-center mt-10">
              <MutatingDots
                visible={true}
                height="100"
                width="100"
                color="#ffffff"
                secondaryColor="#ffffff"
                radius="12.5"
                ariaLabel="mutating-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Tickets;
