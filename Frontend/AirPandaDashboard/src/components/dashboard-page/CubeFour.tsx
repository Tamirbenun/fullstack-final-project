import { useEffect, useState } from "react";
import { MdRefresh } from "react-icons/md";
import { MutatingDots } from "react-loader-spinner";
import { TbFaceIdError } from "react-icons/tb";
import { Link } from "react-router-dom";
import { getAllDestinations } from "../../services/destinations-service";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

interface Destination {
  id: string;
  city: string;
  country: string;
  airport: string;
  icao: string;
  iata: string;
  flightNumber: string;
  elevationFt: number;
  latitude: number;
  longitude: number;
  timeZone: string;
  image: string;
}

const CubeFour = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [index, setIndex] = useState<number>(1);

  const fetchDestinations = async () => {
    setLoading(true);
    try {
      const response = await getAllDestinations();
      if (!response.data.error) {
        setDestinations(response.data);
      }
    } catch (error) {
      console.error("Error fetching destinations:", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  const handleRefresh = () => {
    fetchDestinations();
  };

  const handleSwap = (dir: string) => {
    if (dir === "next" && index < destinations.length - 1) {
      setIndex(index + 1);
    } else if (dir === "back" && index > 1) {
      setIndex(index - 1);
    }
  };

  return (
    <div className="transition-colors duration-500 ease-in-out dark:bg-[#343434] bg-gray-100 rounded-3xl lg:col-span-2">
      {!loading ? (
        destinations ? (
          <div className="relative flex items-center overflow-hidden h-[256px] rounded-3xl">
            <img
              src={destinations[index]?.image}
              alt="image destination"
              className="absolute inset-0 w-full h-full object-cover"
            />

            <div className="z-10 p-6 bg-black/50 from-black/60 text-white h-full w-full">
              <div className="flex justify-between items-start">
                <Link className="text-lg font-semibold" to={"/Destinations"}>
                  Destinations
                </Link>
                <button
                  className="bg-none rounded-full hover:text-black hover:bg-white p-1"
                  onClick={handleRefresh}
                >
                  <MdRefresh className="text-lg" />
                </button>
              </div>

              <div className="flex justify-between items-center h-full pb-[50px]">
                <button
                  className="text-white/40 hover:text-white text-xl"
                  onClick={() => handleSwap("back")}
                >
                  <FaAngleLeft />
                </button>
                <p className="text-white text-3xl">
                  {destinations[index]?.city +
                    ", " +
                    destinations[index]?.country}
                </p>
                <button
                  className="text-white/40 hover:text-white"
                  onClick={() => handleSwap("next")}
                >
                  <FaAngleRight />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-start p-6">
              <p className="text-lg font-semibold">Destinations</p>
              <button
                className="bg-none rounded-full hover:text-black hover:bg-white p-1"
                onClick={handleRefresh}
              >
                <MdRefresh className="text-lg" />
              </button>
            </div>
            <div className="flex justify-center items-center mt-1">
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
          </>
        )
      ) : (
        <>
          <div className="flex justify-between items-start p-6">
            <p className="text-lg font-semibold">Destinations</p>
            <button
              className="bg-none rounded-full hover:text-black hover:bg-white p-1"
              onClick={handleRefresh}
            >
              <MdRefresh className="text-lg" />
            </button>
          </div>
          {localStorage.getItem("theme") === "light" ? (
            <div className="flex justify-center mt-1">
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
            <div className="flex justify-center mt-1">
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

export default CubeFour;
