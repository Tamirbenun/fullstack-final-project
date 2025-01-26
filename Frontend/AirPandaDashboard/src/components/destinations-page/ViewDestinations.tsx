import { useContext, useEffect, useState } from "react";
import { IoIosInformationCircleOutline } from "react-icons/io";
import Swal from "sweetalert2";
import {
  getDestinationsById,
  putDestination,
} from "../../services/destinations-service";
import { DataContext } from "../../contexts/DataContext";
import { LuImagePlus } from "react-icons/lu";
import { MutatingDots } from "react-loader-spinner";

interface Destination {
  id: string;
  city: string;
  country: string;
  airport: string;
  icao: string;
  iata: string;
  flightNumber: string;
  elevationFt: string;
  latitude: string;
  longitude: string;
  timeZone: string;
  image: string;
}

const ViewDestinations = ({
  setIsOpen,
  destinations,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  destinations: Destination[];
}) => {
  const { destinationSelected } = useContext(DataContext);
  const [destination, setDestination] = useState<Destination>();
  const [loading, setLoading] = useState<boolean>(false);
  const [image, setImage] = useState<string>("");
  const [flightNumber, setFlightNumber] = useState<string>("");
  const [disabled, setDisabled] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const fetchDestination = async () => {
    setLoading(true);
    try {
      const response = await getDestinationsById(destinationSelected);
      setDestination(response.data);
      const flightNumberFromData: string =
        response.data.flightNumber.substring(2);
      setFlightNumber(flightNumberFromData);
      setImage(response.data.image);
    } catch (error) {
      console.error("Error fetching Destination:", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    fetchDestination();
  }, []);

  const handleFlightNumberChange = (e) => {
    const value = e.target.value;
    const regex = /^[0-9]*$/;

    if (regex.test(value)) {
      setFlightNumber(value);
    }

    const filter = destinations.filter(
      (des) => des.flightNumber !== destination.flightNumber
    );
    const exists = filter.some((d) => d.flightNumber.includes(`AP${value}`));

    if (exists) {
      setError(true);
    } else {
      setError(false);
    }
  };

  useEffect(() => {
    if (flightNumber && image) {
      if (error) {
        setDisabled(true);
      }
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [flightNumber, image]);

  const handleUpdate = async () => {
    const updateDestination: Destination = {
      id: destination.id,
      city: destination.city,
      country: destination.country,
      airport: destination.airport,
      icao: destination.icao,
      iata: destination.iata,
      flightNumber: `AP${flightNumber}`,
      elevationFt: destination.elevationFt,
      latitude: destination.latitude,
      longitude: destination.longitude,
      timeZone: destination.timeZone,
      image: image,
    };
    try {
      setLoading(true);
      const response = await putDestination(
        destinationSelected,
        updateDestination
      );
      if (!response.data.error) {
        setLoading(false);
        Swal.fire({
          title: "Success",
          text: response.data,
          icon: "success",
          confirmButtonText: "Ok",
          customClass: {
            popup: "custom-swal",
            confirmButton: "custom-confirm-button",
          },
        }).then((result) => {
          if (result.isConfirmed) {
            setIsOpen(false);
          }
        });
      } else if (response.data.error) {
        setLoading(false);
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
      setLoading(false);
      console.error("Error Update Destination:", error);
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
  };
  return (
    <>
      {!loading ? (
        <div className="h-[68vh] overflow-y-auto custom-scroll mt-4 dark:text-white/60 pe-5">
          <p className="font-medium text-2xl">
            {destination?.city}, {destination?.country}
          </p>
          <p className="font-medium text-lg">{destination?.airport}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 rounded-2xl bg-gray-100 dark:bg-[#4f4f4f] p-4 mt-3">
            <p>IATA: {destination?.iata}</p>
            <p>ICAO: {destination?.icao}</p>
            <p>elevationFt: {destination?.elevationFt}</p>
            <p>LAT: {destination?.latitude}</p>
            <p>LON: {destination?.longitude}</p>
          </div>

          <div className="bg-gray-100 rounded-2xl mt-5 p-3">
            <div className="h-[100px] mb-3 overflow-hidden">
              {image ? (
                <img
                  src={image}
                  alt="image priview"
                  className=" object-cover w-full h-full rounded-xl"
                />
              ) : (
                <div className="flex justify-center items-center h-full text-gray-400 dark:text-white/60">
                  <LuImagePlus className="text-6xl" />
                  <p className="ms-2 text-lg">
                    The image from the link will be displayed here
                  </p>
                </div>
              )}
            </div>
            <div className="mt-2">
              <label
                htmlFor="image"
                className="transition-border duration-500 ease-in-out block ms-2.5 mb-2 text-gray-400 dark:text-white/60"
              >
                Image
              </label>
              <div className="relative">
                <input
                  id="image"
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  maxLength={100}
                  pattern="/^[0-9]*$/"
                  className="transition-border duration-500 ease-in-out w-full p-3 rounded-2xl border border-gray-400 bg-white text-black dark:text-white/60 dark:bg-[#181818] dark:border-white/60 disabled:border-none dark:disabled:border-none disabled:bg-gray-100 dark:disabled:bg-[#2f2f2f] disabled:text-gray-400 dark:disabled:text-white/30 focus:outline-none focus:bg-blue-50"
                />
              </div>
            </div>
          </div>

          <div className="mt-5 rounded-2xl p-3 bg-gray-100 dark:bg-[#212121]">
            <label
              htmlFor="flightNumber"
              className="transition-border duration-500 ease-in-out block ms-2.5 mb-2 text-gray-400 dark:text-white/60"
            >
              Flight Number
            </label>
            <div className="relative">
              <input
                id="flightNumber"
                type="text"
                value={flightNumber}
                onChange={handleFlightNumberChange}
                maxLength={4}
                minLength={2}
                pattern="/^[0-9]*$/"
                className={`transition-border duration-500 ease-in-out w-full p-3 rounded-2xl border border-gray-400 bg-white text-black dark:text-white/60 dark:bg-[#181818] dark:border-white/60 disabled:border-none dark:disabled:border-none disabled:bg-gray-100 dark:disabled:bg-[#2f2f2f] disabled:text-gray-400 dark:disabled:text-white/30 focus:outline-none focus:bg-blue-50 ps-8 ${
                  error && "border-red-400 bg-red-50 focus:bg-red-50"
                }`}
              />
              <p className="absolute left-3 top-3">AP</p>
            </div>
            <div className="mt-2">
              <div className="flex justify-center items-center gap-1 text-gray-400 dark:text-white/40">
                <IoIosInformationCircleOutline />
                <p className="my-2">
                  Please select a flight number that is not listed below.
                </p>
              </div>
              <div className="flex justify-center flex-wrap gap-2">
                {destinations?.map((des) => (
                  <div
                    key={des.iata}
                    className="rounded-full px-3 py-1 text-gray-400 bg-gray-200 dark:text-white/40 dark:bg-[#212121]"
                  >
                    {des.flightNumber}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-5">
            <button
              className="rounded-2xl py-2 px-5 bg-blue-500 hover:bg-blue-600 text-white disabled:bg-gray-400"
              disabled={disabled}
              onClick={() => handleUpdate()}
            >
              Save Changes
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center">
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
        </div>
      )}
    </>
  );
};

export default ViewDestinations;
