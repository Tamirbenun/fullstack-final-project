import { LuTicketsPlane } from "react-icons/lu";
import { MutatingDots } from "react-loader-spinner";
import { useEffect, useState } from "react";
import { getFlightById } from "../../services/booking-service";
import { getAllTicketsByUserId } from "../../services/tickets-service";
import { JwtDecodedID } from "../../services/jwt-service";
import plane from "../../assets/images/tickets-plane.svg";
import { QRCodeSVG } from "qrcode.react";

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
  const [loading, setLoading] = useState<boolean>(false);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [flights, setFlights] = useState<Flight[]>([]);

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
      const response = await getAllTicketsByUserId(JwtDecodedID());
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

  return (
    <div
      className={`${tickets.length > 3 ? "h-full" : "h-screen"} md:ps-5 flex-1`}
    >
      <div className="flex justify-between mb-5 mt-5 md:mt-0">
        <h2 className="font-medium text-3xl">Tickets</h2>
      </div>
      {!loading ? (
        <>
          {tickets && flights.length !== 0 ? (
            tickets?.map((t, index) => (
              <div
                key={t.id}
                className="relative rounded-3xl my-5 border dark:border-white/40  max-w-[850px]"
              >
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
                        {new Date(
                          new Date(flights[index]?.departure).getTime() +
                            (() => {
                              const [hours, minutes] = flights[index].flightTime
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
        <div className="flex justify-center mt-10 h-screen flex-1 w-full">
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
      )}
    </div>
  );
};

export default Tickets;
