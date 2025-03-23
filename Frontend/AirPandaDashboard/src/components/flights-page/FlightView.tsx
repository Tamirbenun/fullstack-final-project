import { useContext, useEffect, useState } from "react";
import { MutatingDots } from "react-loader-spinner";
import { DataContext } from "../../contexts/DataContext";
import plane from "../../assets/images/tickets-plane.svg";
import { getFlightById } from "../../services/flights-service";
import SeatsContainer from "./SeatsContainer";
import { MdNavigateNext } from "react-icons/md";
import Details from "./Details";

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

const FlightView = () => {
  const [flight, setFlight] = useState<Flight>();
  const { flightSelected, setSeatsTaken, view, setView } =
    useContext(DataContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [tab, setTab] = useState<string>("Details");

  const fetchFlightById = async () => {
    setLoading(true);
    try {
      const response = await getFlightById(flightSelected);
      setFlight(response.data);
    } catch (error) {
      console.error("Error fetching flights:", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    fetchFlightById();
  }, []);

  useEffect(() => {
    if (flight) {
      setSeatsTaken(flight.seatsTaken);
    }
  }, [flight]);

  const handleTab = (to: string) => {
    if (to === "Flights") {
      setView("FlightsList");
      setTab("Details");
    } else if (to === "Details") {
      setTab(to);
    } else if (to === "Seats") {
      setTab(to);
    }
  };

  return (
    <div
      className={`transition-all duration-500 ease-in-out dark:bg-[#212121] px-5 md:px-10`}
    >
      <div className="flex items-center text-gray-400 dark:text-white/40 mb-5">
        <button
          className="transition-colors duration-500 ease-in-out hover:text-blue-400"
          onClick={() => handleTab("Flights")}
        >
          Flights
        </button>
        {view === "flightView" && (
          <>
            <MdNavigateNext className="transition-colors duration-500 ease-in-out" />
            <button
              className="transition-colors duration-500 ease-in-out hover:text-blue-400"
              onClick={() => handleTab("Details")}
            >
              Details
            </button>
          </>
        )}
        {tab === "Seats" && (
          <>
            <MdNavigateNext className="transition-colors duration-500 ease-in-out" />
            <button
              className="transition-colors duration-500 ease-in-out hover:text-blue-400"
              onClick={() => handleTab("Seats")}
            >
              Seats
            </button>
          </>
        )}
      </div>

      {!loading ? (
        flight ? (
          <div>
            <div className="md:flex text-center md:text-start justify-center items-center p-10 bg-gray-100 dark:bg-[#2f2f2f] dark:text-white/60 rounded-t-3xl">
              <div>
                <p className="text-xs -mb-1">from</p>
                <p className="text-7xl font-medium">{flight.fromIATA}</p>
                <p className="font-medium">
                  {new Date(flight.departure).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour12: false,
                  })}
                </p>
                <p className="font-medium -mt-1">
                  {new Date(flight.departure).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}
                </p>
              </div>

              <div className="flex justify-center">
                <img
                  src={plane}
                  alt="plane"
                  aria-label="tickets airplane"
                  className="w-[100px] my-10 md:mt-0 md:mx-10 lg:mx-20 dark:invert dark:opacity-50"
                />
              </div>

              <div>
                <p className="text-xs -mb-1">to</p>
                <p className="text-7xl font-medium">{flight.toIATA}</p>
                <p className="font-medium">
                  {new Date(
                    new Date(flight.departure).getTime() +
                      (() => {
                        const [hours, minutes] = flight.flightTime
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
                  {new Date(
                    new Date(flight.departure).getTime() +
                      (() => {
                        const [hours, minutes] = flight.flightTime
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
            <div className="rounded-b-3xl bg-gray-100 dark:bg-[#2f2f2f] p-2">
              <div className="inline-flex bg-white/40 dark:bg-[#2a2a2a] rounded-t-xl">
                <button
                  className={` rounded-t-xl px-5 py-3 dark:text-white/60 text-black/60 ${
                    tab === "Details"
                      ? "dark:bg-[#212121] dark:hover:text-white bg-white hover:text-black"
                      : "dark:bg-[#2a2a2a] dark:hover:text-white hover:text-black"
                  }`}
                  onClick={() => handleTab("Details")}
                >
                  Details
                </button>
                <button
                  className={`rounded-t-xl px-5 py-3 dark:text-white/60 text-black/60 ${
                    tab === "Seats"
                      ? "dark:bg-[#212121] dark:hover:text-white bg-white hover:text-black"
                      : "dark:bg-[#2a2a2a] dark:hover:text-white hover:text-black"
                  }`}
                  onClick={() => handleTab("Seats")}
                >
                  Seats
                </button>
              </div>
              <div className="bg-white rounded-b-2xl rounded-tr-2xl dark:bg-[#212121] p-5">
                {tab === "Details" && (
                  <Details flight={flight} fetchFlight={fetchFlightById} />
                )}
                {tab === "Seats" && <SeatsContainer flight={flight} />}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center pt-32 transition-colors duration-500 ease-in-out dark:text-[#555555] text-gray-300 h-screen">
            <div className="flex justify-center">
              <img
                src={plane}
                alt="plane"
                aria-label="tickets airplane"
                className="transition-all duration-500 ease-in-out w-[100px] opacity-20 dark:invert"
              />
            </div>
            <p className="text-lg mt-4">No Flight Found</p>
            <p className="text-lg">with ID: {flightSelected}</p>
          </div>
        )
      ) : (
        <>
          {localStorage.getItem("theme") === "light" ? (
            <div className="flex justify-center pt-20 h-screen">
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
            <div className="flex justify-center pt-20 h-screen">
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

export default FlightView;
