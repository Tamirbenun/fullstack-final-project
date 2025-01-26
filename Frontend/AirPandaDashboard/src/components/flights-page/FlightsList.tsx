import "../../css/datePicker.css";
import { useContext, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import { MutatingDots } from "react-loader-spinner";
import { AiOutlineDelete } from "react-icons/ai";
import { GrView } from "react-icons/gr";
import { getFlightsByDate } from "../../services/flights-service";
import { DataContext } from "../../contexts/DataContext";
import FlightModal from "./FlightModal";
import { PiAirplaneInFlightBold } from "react-icons/pi";

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

const FlightsList = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [filteredFlights, setFilteredFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [dateFilter, setDateFilter] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [searchFilter, setSearchFilter] = useState<string>("from");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [action, setAction] = useState<string>("");
  const { setView, setFlightSelected } = useContext(DataContext);

  const fetchFlightsByDates = async (date: string) => {
    setLoading(true);
    try {
      const response = await getFlightsByDate(date);
      setFlights(response.data);
      setFilteredFlights(response.data);
    } catch (error) {
      console.error("Error fetching flights:", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    fetchFlightsByDates(dateFilter);
  }, [dateFilter]);

  useEffect(() => {
    if (!isOpen) {
      fetchFlightsByDates(dateFilter);
    }
  }, [isOpen]);

  const handleSearchFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchFilter(event.target.value);
  };

  const handleSearchUpdate = (query: string) => {
    let newFilter: Flight[];

    if (searchFilter === "from") {
      newFilter = flights.filter(
        (flight) =>
          flight.fromCity.toLowerCase().includes(query) ||
          flight.fromCountry.toLowerCase().includes(query) ||
          flight.fromIATA.toLowerCase().includes(query) ||
          flight.fromICAO.toLowerCase().includes(query) ||
          flight.fromAirport.toLowerCase().includes(query)
      );
    } else if (searchFilter === "to") {
      newFilter = flights.filter(
        (flight) =>
          flight.toCity.toLowerCase().includes(query) ||
          flight.toCountry.toLowerCase().includes(query) ||
          flight.toIATA.toLowerCase().includes(query) ||
          flight.toICAO.toLowerCase().includes(query) ||
          flight.toAirport.toLowerCase().includes(query)
      );
    } else if (searchFilter === "flightNumber") {
      newFilter = flights.filter((flight) =>
        flight.flightNumber.toLowerCase().includes(query)
      );
    }
    setFilteredFlights(newFilter);
  };

  useEffect(() => {
    handleSearchUpdate(search);
  }, [searchFilter]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearch(query);

    let newFilter: Flight[];

    if (searchFilter === "from") {
      newFilter = flights.filter(
        (flight) =>
          flight.fromCity.toLowerCase().includes(query) ||
          flight.fromCountry.toLowerCase().includes(query) ||
          flight.fromIATA.toLowerCase().includes(query) ||
          flight.fromICAO.toLowerCase().includes(query) ||
          flight.fromAirport.toLowerCase().includes(query)
      );
    } else if (searchFilter === "to") {
      newFilter = flights.filter(
        (flight) =>
          flight.toCity.toLowerCase().includes(query) ||
          flight.toCountry.toLowerCase().includes(query) ||
          flight.toIATA.toLowerCase().includes(query) ||
          flight.toICAO.toLowerCase().includes(query) ||
          flight.toAirport.toLowerCase().includes(query)
      );
    } else if (searchFilter === "flightNumber") {
      newFilter = flights.filter((flight) =>
        flight.flightNumber.toLowerCase().includes(query)
      );
    }
    setFilteredFlights(newFilter);
  };

  const handleClear = () => {
    setSearch("");
    setFilteredFlights(flights);
  };

  const handleDates = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();

    if (query) {
      setDateFilter(query);
    } else {
      setDateFilter(new Date().toISOString().split("T")[0]);
    }
  };

  const handleView = (flightIid: string) => {
    setFlightSelected(flightIid);
    setView("flightView");
  };

  const handleDelete = (flightIid: string) => {
    setFlightSelected(flightIid);
    setAction("delete");
    setIsOpen(true);
  };

  const handleAddFlights = () => {
    setAction("addFlights");
    setIsOpen(true);
  };

  return (
    <div
      className={`transition-all duration-500 ease-in-out dark:bg-[#212121] dark:text-white/60 px-3 md:px-10 pt-5 ${
        filteredFlights?.length > 5 ? "h-full" : "h-screen"
      }`}
    >
      <div className="lg:flex items-center lg:justify-between">
        <div className="flex">
          <p className="text-xl font-semibold">Flights</p>
          <p className="ms-2 text-xl font-medium text-gray-400 mb-5 lg:mb-0">
            {filteredFlights ? filteredFlights.length.toString() : "0"}
          </p>
        </div>
        <div className="w-full lg:w-auto lg:flex gap-1">
          <div className="relative flex h-10 lg:h-auto">
            <label htmlFor="city-select" className="sr-only">
              Select a Column
            </label>
            <select
              id="city-select"
              className="transition-colors duration-500 ease-in-out text-gray-400 w-[80px] ps-2 z-0 focus:outline-none border-s border-t border-b rounded-s-lg h-full dark:bg-[#212121] border-gray-200 dark:border-white/60 dark:placeholder:text-white/40"
              value={searchFilter}
              onChange={handleSearchFilter}
            >
              <option value="from">From</option>
              <option value="to">To</option>
              <option value="flightNumber">Flight</option>
            </select>
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={handleSearch}
              className="transition-colors duration-500 ease-in-out flex-1 ps-8 pe-3 z-0 focus:outline-none border rounded-e-lg h-full dark:bg-[#212121] border-gray-200 dark:border-white/60 dark:placeholder:text-white/40"
            />
            <FiSearch className="absolute start-[88px] top-[8px] text-lg text-gray-400 dark:text-white/60" />
            <button
              className={`absolute end-2 top-[8px] text-lg text-gray-400 dark:text-white/60 z-10 ${
                search ? "opacity-100" : "opacity-0"
              }`}
            >
              <IoClose onClick={handleClear} />
            </button>
          </div>

          <input
            className="mt-3 lg:mt-0 flex justify-center w-full lg:w-auto transition-colors duration-500 ease-in-out dark:border-[#9a9a9a] border items-center rounded-lg p-1.5 px-2 text-sm font-medium dark:text-[#9a9a9a] dark:hover:border-white dark:hover:text-white text-gray-400 dark:bg-[#212121] hover:text-gray-500 hover:border-gray-500 gap-2 datePicker"
            type="date"
            value={dateFilter}
            onChange={handleDates}
          />

          <button
            className="mt-3 lg:mt-0 transition-colors duration-500 ease-in-out border flex justify-center items-center rounded-lg p-1.5 px-2 text-sm font-medium hover:border-blue-500 hover:text-blue-500 dark:hover:border-blue-200 dark:hover:text-blue-200 text-blue-400 border-blue-400 w-full lg:w-auto"
            onClick={() => handleAddFlights()}
          >
            <p className="w-[16px] md:w-auto md:me-1">+</p>
            <p>Add Flights</p>
          </button>
        </div>
      </div>

      <hr className="mt-5 opacity-0" />

      {!loading ? (
        filteredFlights?.length > 0 ? (
          <table className="table-auto border-collapse text-left w-full">
            <thead className="font-normal">
              <tr className="transition-colors duration-500 ease-in-out dark:bg-[#2f2f2f] dark:text-white/60 bg-gray-100 text-sm text-gray-400 h-8">
                <th className="text-start rounded-s-lg ps-4">Date and Time</th>
                <th className="text-start">From</th>
                <th className="text-start">To</th>
                <th className="text-start hidden md:table-cell">Flight</th>
                <th className="text-start hidden md:table-cell">Status</th>
                <th className="text-start rounded-e-lg">Actions</th>
              </tr>
            </thead>
            <tbody className="rounded-xl overflow-hidden">
              {filteredFlights?.map((f) => (
                <tr
                  key={f.id}
                  className="dark:border-[#5c5c5c] hover:bg-gray-50 dark:hover:bg-[#242424] border-b"
                >
                  <td className="items-center gap-4 p-4">
                    <p className="">
                      {new Date(f.departure).toLocaleString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <p>
                      {new Date(f.departure).toLocaleString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      })}
                    </p>
                  </td>
                  <td>
                    <p>{f.fromIATA}</p>
                    <p className="hidden md:table-cell">
                      {f.fromCity + ", " + f.fromCountry}
                    </p>
                  </td>
                  <td>
                    <p>{f.toIATA}</p>
                    <p className="hidden md:table-cell">
                      {f.toCity + ", " + f.toCountry}
                    </p>
                  </td>
                  <td className="hidden md:table-cell w-20">
                    {f.flightNumber}
                  </td>
                  <td className="hidden md:table-cell">
                    <p
                      className={`w-[80px] p-1 text-xs text-center font-meium border rounded-full ${
                        f.isActive &&
                        "border-green-400 bg-green-50 text-green-400 dark:bg-green-50/20"
                      } ${
                        !f.isActive &&
                        "border-red-400 bg-red-50 text-red-400 dark:bg-red-50/20"
                      }`}
                    >
                      {f.isActive ? "Active" : "Cancelled"}
                    </p>
                  </td>
                  <td className="h-full">
                    <button
                      className="me-2 p-2 dark:hover:text-blue-300 hover:text-blue-500"
                      onClick={() => handleView(f.id)}
                    >
                      <GrView />
                    </button>

                    <button
                      className={`p-2 dark:hover:text-red-300 hover:text-red-500`}
                      onClick={() => handleDelete(f.id)}
                    >
                      <AiOutlineDelete className="text-lg" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <>
            <table className="table-auto border-collapse text-left w-full">
              <thead>
                <tr className="transition-colors duration-500 ease-in-out dark:bg-[#2f2f2f] dark:text-white/60 bg-gray-100 text-sm text-gray-400 h-8">
                  <th className="text-start rounded-s-lg ps-4">
                    Date and Time
                  </th>
                  <th className="text-start">From</th>
                  <th className="text-start">To</th>
                  <th className="text-start hidden md:table-cell">Flight</th>
                  <th className="text-start hidden md:table-cell">Status</th>
                  <th className="text-start rounded-e-lg">Actions</th>
                </tr>
              </thead>
            </table>

            <div className="text-center mt-10 transition-colors duration-500 ease-in-out dark:text-white/20 text-gray-200">
              <div className="flex justify-center">
                <PiAirplaneInFlightBold className="text-8xl" />
              </div>
              <p className="text-lg mt-4">No Flights found</p>
            </div>
          </>
        )
      ) : (
        <>
          <table className="table-auto border-collapse text-left w-full">
            <thead>
              <tr className="transition-colors duration-500 ease-in-out dark:bg-[#2f2f2f] dark:text-white/60 bg-gray-100 text-sm text-gray-400 h-8">
                <th className="text-start rounded-s-lg ps-4">Date and Time</th>
                <th className="text-start">From</th>
                <th className="text-start">To</th>
                <th className="text-start hidden md:table-cell">Flight</th>
                <th className="text-start hidden md:table-cell">Status</th>
                <th className="text-start rounded-e-lg">Actions</th>
              </tr>
            </thead>
          </table>

          {localStorage.getItem("theme") === "light" ? (
            <div className="flex justify-center mt-10 h-screen">
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
            <div className="flex justify-center mt-10 h-screen">
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
      <FlightModal isOpen={isOpen} setIsOpen={setIsOpen} action={action} />
    </div>
  );
};

export default FlightsList;
