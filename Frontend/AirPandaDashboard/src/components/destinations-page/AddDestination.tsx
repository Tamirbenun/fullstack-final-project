import { useEffect, useState } from "react";
import {
  getAirportsByCity,
  postDestination,
} from "../../services/destinations-service";
import { IoClose } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import { TbBuildingAirport } from "react-icons/tb";
import { LuImagePlus } from "react-icons/lu";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { MutatingDots } from "react-loader-spinner";
import Swal from "sweetalert2";

interface Airport {
  icao: string;
  iata: string;
  name: string;
  city: string;
  region: string;
  country: string;
  elevation_ft: string;
  latitude: string;
  longitude: string;
  timezone: string;
  message: string;
}

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

const AddDestination = ({
  setIsOpen,
  destinations,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  destinations: Destination[];
}) => {
  const [stage, setStage] = useState<string>("search");
  const [search, setSearch] = useState<string>("");
  const [searchPlaceHolder, setSearchPlaceHolder] =
    useState<string>('"Ben Gurion..."');
  const [searchFilter, setSearchFilter] = useState<string>("name");
  const [loading, setLoading] = useState<boolean>(false);
  const [airportsResults, setAirportsResults] = useState<Airport[]>([]);
  const [city, setCity] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [airport, setAirport] = useState<string>("");
  const [icao, setIcao] = useState<string>("");
  const [iata, setIata] = useState<string>("");
  const [elevationFt, setElevationFt] = useState<string>("");
  const [latitude, setLatitude] = useState<string>("");
  const [longitude, setLongitude] = useState<string>("");
  const [timeZone, setTimeZone] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [flightNumber, setFlightNumber] = useState<string>("");
  const [disabled, setDisabled] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const fetchAirports = async (filter: string, search: string) => {
    setLoading(true);
    try {
      const response = await getAirportsByCity(filter, search);
      if (response.data && !response.data.message) {
        const filterData = response.data.filter(
          (a) => a.iata && a.icao && a.city && a.country
        );
        setAirportsResults(filterData);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching Airports:", error);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearch(query);
    if (query.length > 1) {
      fetchAirports(searchFilter, query);
    } else {
      setAirportsResults([]);
    }
  };

  useEffect(() => {
    if (searchFilter === "name") {
      setSearchPlaceHolder('"Ben Gurion"');
    } else if (searchFilter === "city") {
      setSearchPlaceHolder('"Tel Aviv"');
    } else if (searchFilter === "iata") {
      setSearchPlaceHolder('"TLV"');
    } else if (searchFilter === "icao") {
      setSearchPlaceHolder('"LLGB"');
    }
    setSearch("");
  }, [searchFilter]);

  const handleClear = () => {
    setSearch("");
    setAirportsResults([]);
  };

  const handleChoose = (airport: Airport) => {
    setCity(airport.city);
    setCountry(airport.country);
    setAirport(airport.name);
    setIata(airport.iata);
    setIcao(airport.icao);
    setElevationFt(airport.elevation_ft);
    setLatitude(airport.latitude);
    setLongitude(airport.longitude);
    setTimeZone(airport.timezone);
    setStage("form");
  };

  const handleFlightNumberChange = (e) => {
    const value = e.target.value;
    const regex = /^[0-9]*$/;

    if (regex.test(value)) {
      setFlightNumber(value);
    }

    const exists = destinations.some((d) =>
      d.flightNumber.includes(`AP${value}`)
    );

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

  const handleCreateDestination = async () => {
    const newDestination = {
      city: city,
      country: country,
      airport: airport,
      icao: icao,
      iata: iata,
      flightNumber: "AP" + flightNumber,
      elevationFt: elevationFt,
      latitude: latitude,
      longitude: longitude,
      timeZone: timeZone,
      image: image,
    };

    try {
      setLoading(true);
      const response = await postDestination(newDestination);
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
      console.error("Error Create Destination:", error);
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
    <div className="px-2 md:px-5">
      <div className={`${stage !== "search" && "hidden"}`}>
        <div className="relative flex h-[40px]">
          <label htmlFor="city-select" className="sr-only">
            Select a Column
          </label>
          <select
            id="city-select"
            className="transition-colors duration-500 ease-in-out text-gray-500 dark:text-white/60 w-[100px] ps-2 z-0 focus:outline-none border-s border-t border-b rounded-s-lg h-full dark:bg-[#212121] border-gray-200 dark:border-white/60 dark:placeholder:text-white/40"
            value={searchFilter}
            onChange={(event) => setSearchFilter(event.target.value)}
          >
            <option value="name">Airport</option>
            <option value="city">City</option>
            <option value="iata">IATA</option>
            <option value="icao">Icao</option>
          </select>
          <input
            type="text"
            placeholder={searchPlaceHolder}
            value={search}
            onChange={handleSearch}
            className="transition-colors duration-500 ease-in-out dark:text-white/60 flex-1 ps-8 pe-3 z-0 focus:outline-none border rounded-e-lg h-full dark:bg-[#212121] border-gray-200 dark:border-white/60 dark:placeholder:text-white/40"
          />
          <FiSearch className="absolute start-[109px] top-[11px] text-lg text-gray-400 dark:text-white/60" />
          <button
            className={`absolute end-2 top-[11px] text-lg text-gray-400 dark:text-white/60 z-10 ${
              search ? "opacity-100" : "opacity-0"
            }`}
          >
            <IoClose onClick={handleClear} />
          </button>
        </div>

        <div>
          <div className="h-[68vh] overflow-y-auto custom-scroll mt-4">
            {!loading ? (
              <>
                {airportsResults[0]?.message || airportsResults.length === 0 ? (
                  <p className="text-center m-10 text-lg text-gray-400 dark:text-white/60">
                    {airportsResults[0]?.message
                      ? airportsResults[0]?.message
                      : search
                      ? `No airports found for "${search}"`
                      : "Search for a flight destination"}
                  </p>
                ) : (
                  airportsResults.map((a, index) => (
                    <div
                      key={a.city + a.name + a.country}
                      className={`transition-colors duration-300 ease-in-out flex items-center my-3 hover:bg-gray-100 dark:hover:bg-[#212121] p-2 rounded-2xl me-2 ${
                        index % 2 === 0 && "bg-gray-50 dark:bg-[#363636]"
                      } px-3 dark:text-white/60`}
                    >
                      <TbBuildingAirport className="text-5xl me-4 text-gray-300 dark:text-[#555555]" />
                      <div className="flex justify-between items-center w-full">
                        <div>
                          <p className="font-medium">{a.name}</p>
                          <p className="text-gray-500 dark:text-white/40">
                            {a.city}, {a.country}
                          </p>
                        </div>
                        <button
                          className="transition-colors duration-300 ease-in-out bg-gray-200 dark:bg-white/20 hover:bg-blue-500 dark:hover:bg-blue-500 px-3 py-2 rounded-full text-gray-400 hover:text-white text-xs"
                          onClick={() => handleChoose(a)}
                        >
                          Choose
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </>
            ) : (
              <div className="mt-5">
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
          </div>
        </div>
      </div>

      <div
        className={`${
          stage !== "form" && "hidden"
        } h-[68vh] overflow-y-auto custom-scroll mt-4 dark:text-white/60 pe-5`}
      >
        <p className="font-medium text-2xl">
          {city}, {country}
        </p>
        <p className="font-medium text-lg">{airport}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 rounded-2xl bg-gray-100 dark:bg-[#4f4f4f] p-4 mt-3">
          <p className="">IATA: {iata}</p>
          <p className="">ICAO: {icao}</p>
          <p className="">elevationFt: {elevationFt}</p>
          <p className="">LAT: {latitude}</p>
          <p className="">LON: {longitude}</p>
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

        <div className="flex justify-center gap-2 mt-8">
          <button
            className="rounded-2xl p-2 text-black bg-gray-300 hover:bg-gray-400 dark:text-black/60 dark:bg-white/40 dark:hover:bg-white/60"
            onClick={() => setStage("search")}
          >
            Back
          </button>
          <button
            className="rounded-2xl py-2 px-5 bg-blue-500 hover:bg-blue-600 text-white disabled:bg-gray-400"
            disabled={disabled}
            onClick={() => handleCreateDestination()}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddDestination;
