import { useContext, useEffect, useState } from "react";
import { IoAirplane } from "react-icons/io5";
import { ThreeDots } from "react-loader-spinner";
import { DataContext } from "../../contexts/DataContext";
import { getFlightsByDestination } from "../../services/booking-service";
import { useNavigate } from "react-router-dom";
import ScrollToTop from "../ScrollToTop";
import ScrollToBottom from "../ScrollToBottom";

interface SearchData {
  from: string;
  to: string;
  startDate: Date;
  endDate: Date;
  passengers: number;
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
}

const SectionOutboundFlight = () => {
  const searchData: SearchData | null = localStorage.getItem("searchData")
    ? JSON.parse(localStorage.getItem("searchData") as string)
    : null;
  const [outboundFlights, setOutboundFlights] = useState<Flight[]>();
  const [selectedFlightId, setSelectedFlightId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const { setProgressStage } = useContext(DataContext);

  useEffect(() => {
    ScrollToTop();
    if (!searchData) {
      navigate("/");
    } else if (searchData) {
      let date = searchData.startDate;
      if (!(date instanceof Date)) {
        date = new Date(date);
      }
      const formattedDate = date.toISOString().split("T")[0];
      getFlightsByDestination(searchData.from, searchData.to, formattedDate)
        .then((response) => {
          setOutboundFlights(response.data);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, []);

  const flightTimeDisplay = (flightTime: string) => {
    const [hours, minutes] = flightTime.split(":").map(String);
    return hours + ":" + minutes;
  };

  const landingTimeDisplay = (departure: Date, flightTime: string) => {
    const departureDate: Date = new Date(departure);
    const [hours, minutes] = flightTime.split(":").map(Number);

    departureDate.setMinutes(departureDate.getMinutes() + minutes);
    departureDate.setHours(departureDate.getHours() + hours);

    const formattedHours = departureDate.getHours().toString().padStart(2, "0");
    const formattedMinutes = departureDate
      .getMinutes()
      .toString()
      .padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}`;
  };

  const handleClick = (flight) => {
    if (flight.id !== selectedFlightId) {
      setSelectedFlightId(flight.id);
      ScrollToBottom();
      localStorage.setItem("OutboundFlight", JSON.stringify(flight));
    } else if (flight.id === selectedFlightId) {
      setSelectedFlightId(null);
      localStorage.removeItem("OutboundFlight");
    }
  };

  function handleNext(): void {
    setProgressStage("OutboundFlightSeats");
  }

  return (
    <section className="p-5 md:p-0">
      <div className="text-center md:text-start">
        <h2 className="text-4xl font font-medium text-darkblue mb-5">
          Outbound Flight
        </h2>
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center h-56">
          <ThreeDots
            visible={true}
            height="80"
            width="80"
            color="#003268"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {outboundFlights ? (
            outboundFlights.map((of) => (
              <div
                key={of.id}
                onClick={() => handleClick(of)}
                className={`border rounded-3xl my- ${
                  selectedFlightId === of.id && "bg-gray-100"
                }`}
              >
                <div className="flex justify-around items-center m-5">
                  <p className="text-2xl font-medium w-[60px]">
                    {new Date(of.departure).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <div>
                    <p className="text-sm font-medium text-center text-gray-400">
                      {of.fromIATA + " - " + of.toIATA}
                    </p>
                    <div className="flex items-center relative">
                      <p className="text-base text-gray-300 hidden md:block">
                        •••••••••••••••••••••••••
                      </p>
                      <p className="text-base text-gray-300 md:hidden">
                        •••••••••••••••
                      </p>
                      <IoAirplane className="absolute text-lg left-[45%]" />
                    </div>
                    <p className="text-center font-medium text-sm text-gray-400">
                      {flightTimeDisplay(of.flightTime)}
                    </p>
                  </div>
                  <p className="text-2xl font-medium w-[60px]">
                    {landingTimeDisplay(of.departure, of.flightTime)}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="flex justify-center">
              <div className="">
                <p className="">
                  No outbound flights were found for this date.
                </p>
                <button onClick={() => navigate("/")}>Back Home</button>
              </div>
            </div>
          )}
          <div className="flex justify-center md:justify-end mt-5 lg:col-span-2">
            <button
              className="button px-10 py-2 w-full sm:w-1/2 md:w-auto rounded-full hover:ring-4 ring-blue-400/30 disabled:bg-black/40 disabled:ring-0 mt-3"
              onClick={handleNext}
              disabled={!selectedFlightId}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default SectionOutboundFlight;
