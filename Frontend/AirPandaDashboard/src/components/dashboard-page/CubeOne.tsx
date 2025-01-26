import { MdRefresh } from "react-icons/md";
import plane from "../../assets/images/tickets-plane.svg";
import { useEffect, useState } from "react";
import { getClosestFlights } from "../../services/flights-service";
import { MutatingDots } from "react-loader-spinner";
import { TbFaceIdError } from "react-icons/tb";
import { Link } from "react-router-dom";

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

const CubeOne = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [flights, setFlights] = useState<Flight[]>([]);

  const formatDate = (): string => {
    const today: Date = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const hours = String(today.getHours()).padStart(2, "0");
    const minutes = String(today.getMinutes()).padStart(2, "0");
    const seconds = String(today.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  };

  const fetchClosestFlights = async () => {
    setLoading(true);
    try {
      const response = await getClosestFlights(formatDate());
      setFlights(response.data);
    } catch (error) {
      console.error("Error fetching flights:", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    fetchClosestFlights();
  }, []);

  const handleRefresh = () => {
    fetchClosestFlights();
  };

  return (
    <div className="relative transition-colors duration-500 ease-in-out bg-darkblue text-white rounded-3xl p-5 h-64">
      <div className="flex justify-between items-center gap-3">
        <Link className="text-lg font-semibold" to={"/Flights"}>
          Departures
        </Link>
        <button
          className="bg-none rounded-full text-white hover:text-blue-500 hover:bg-white p-1"
          onClick={handleRefresh}
        >
          <MdRefresh className="text-lg" />
        </button>
      </div>

      {!loading ? (
        flights?.length > 0 ? (
          <>
            <div className="font-bold mt-6 text-center">
              <div className="flex justify-center mb-3">
                <img
                  src={plane}
                  alt="plane"
                  aria-label="tickets airplane"
                  className="w-[40px] invert"
                />
              </div>
              <p className="text-4xl">
                {flights[0].fromIATA + "-" + flights[0].toIATA}
              </p>
              <div className="flex justify-center items-center gap-4">
                <p className="text-lg">
                  {new Date(flights[0].departure).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}
                </p>
                <p className="text-lg">{flights[0].flightNumber}</p>
              </div>
            </div>

            <div className="absolute bottom-5 w-full -mx-5">
              <div className="flex justify-center">
                <div className="flex items-center justify-between w-full max-w-[300px] mx-5 border-b border-white/40">
                  <p>
                    {new Date(flights[1]?.departure).toLocaleTimeString(
                      "en-US",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      }
                    )}
                  </p>
                  <p>{flights[1]?.fromIATA + "-" + flights[1]?.toIATA}</p>
                  <p>{flights[1]?.flightNumber}</p>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="flex items-center justify-between w-full max-w-[300px] mx-5">
                  <p>
                    {new Date(flights[2]?.departure).toLocaleTimeString(
                      "en-US",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      }
                    )}
                  </p>
                  <p>{flights[2]?.fromIATA + "-" + flights[2]?.toIATA}</p>
                  <p>{flights[2]?.flightNumber}</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center mt-[28px]">
            <div className="text-center">
              <div className="flex justify-center">
                <TbFaceIdError className="text-5xl" />
              </div>
              <p className="font-medium text-xl">Network Error</p>
              <p className="text-sm">
                Plase Check your Network
                <br /> and try again
              </p>
            </div>
          </div>
        )
      ) : (
        <div className="flex justify-center items-center -mt-[28px] h-full">
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
    </div>
  );
};

export default CubeOne;
