import { useContext, useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import { getAllDestinations } from "../../services/destinations-service";
import { IoClose } from "react-icons/io5";
import Swal from "sweetalert2";
import { putFlightById } from "../../services/flights-service";
import { DataContext } from "../../contexts/DataContext";

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

interface option {
  label: string;
  value: string;
}

const Details = ({
  flight,
  fetchFlight,
}: {
  flight: Flight;
  fetchFlight: () => Promise<void>;
}) => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [options, setOptions] = useState<option[]>([]);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [fromCity, setFromCity] = useState<string>(flight.fromCity);
  const [fromCountry, setFromCountry] = useState<string>(flight.fromCountry);
  const [fromICAO, setFromICAO] = useState<string>(flight.fromICAO);
  const [fromIATA, setFromIATA] = useState<string>(flight.fromIATA);
  const [fromAirport, setFromAirport] = useState<string>(flight.fromAirport);
  const [toCity, setToCity] = useState<string>(flight.toCity);
  const [toCountry, setToCountry] = useState<string>(flight.toCountry);
  const [toICAO, setToICAO] = useState<string>(flight.toICAO);
  const [toIATA, setToIATA] = useState<string>(flight.toIATA);
  const [toAirport, setToAirport] = useState<string>(flight.toAirport);
  const [flightNumber, setFlightNumber] = useState<string>(flight.flightNumber);
  const [gate, setGate] = useState<string>(flight.gate);
  const [departure, setDeparture] = useState<string>(
    flight.departure.toString()
  );
  const [flightTime, setFlightTime] = useState<string>(flight.flightTime);
  const [seatsF, setSeatsF] = useState<number>(flight.seats[0]);
  const [seatsB, setSeatsB] = useState<number>(flight.seats[1]);
  const [seatsE, setSeatsE] = useState<number>(flight.seats[2]);
  const [priceF, setPriceF] = useState<number>(flight.price[0]);
  const [priceB, setPriceB] = useState<number>(flight.price[1]);
  const [priceE, setPriceE] = useState<number>(flight.price[2]);
  const [isActive, setIsActive] = useState<boolean>(flight.isActive);
  const { flightSelected } = useContext(DataContext);

  const fetchDestinations = async () => {
    try {
      const response = await getAllDestinations();
      if (!response.data.error) {
        setDestinations(response.data);
      }
    } catch (error) {
      console.error("Error fetching Deatinations:", error);
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  const updateOptions = () => {
    if (destinations) {
      const updatedOptions = destinations.map((des) => ({
        label: des.city + ", " + des.country,
        value: des.iata,
      }));
      setOptions(updatedOptions);
    }
  };

  useEffect(() => {
    updateOptions();
  }, [destinations]);

  const handleEdit = () => {
    setDisabled(!disabled);
    if (!disabled) {
      fetchFlight();
      setFlightNumber(flight.flightNumber);
      setFromCity(flight.fromCity);
      setFromCountry(flight.fromCountry);
      setFromIATA(flight.fromIATA);
      setFromICAO(flight.fromICAO);
      setFromAirport(flight.fromAirport);
      setToCity(flight.toCity);
      setToCountry(flight.toCountry);
      setToIATA(flight.toIATA);
      setToICAO(flight.toICAO);
      setToAirport(flight.toAirport);
      setDeparture(flight.departure.toISOString);
      setFlightTime(flight.flightTime);
      setSeatsF(flight.seats[0]);
      setSeatsB(flight.seats[1]);
      setSeatsE(flight.seats[2]);
      setPriceF(flight.price[0]);
      setPriceB(flight.price[1]);
      setPriceE(flight.price[2]);
      setIsActive(flight.isActive);
    }
  };

  const handleFromChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newDestination = destinations.find(
      (des) => des.iata === event.target.value
    );
    setFromCity(newDestination.city);
    setFromCountry(newDestination.country);
    setFromIATA(newDestination.iata);
    setFromICAO(newDestination.icao);
    setFromAirport(newDestination.airport);
    setFlightNumber(newDestination.flightNumber);
  };

  const handleToChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newDestination = destinations.find(
      (des) => des.iata === event.target.value
    );
    setToCity(newDestination.city);
    setToCountry(newDestination.country);
    setToIATA(newDestination.iata);
    setToICAO(newDestination.icao);
    setToAirport(newDestination.airport);
    setFlightNumber(newDestination.flightNumber);
  };

  const handleGateChange = (e) => {
    const value = e.target.value;
    const regex = /^[a-zA-Z0-9]*$/;

    if (regex.test(value)) {
      setGate(value);
    }
  };

  const handleDepartureChange = (e) => {
    const value = e.target.value;
    setDeparture(value);
  };

  const handleFlightTimeChange = (e) => {
    const value = e.target.value;
    setFlightTime(value);
  };

  const handleSeatsFChange = (e) => {
    const value = e.target.value;
    const regex = /^[0-9]*$/;
    if (regex.test(value)) {
      setSeatsF(value);
    }

    if (value < 0) {
      setSeatsF(0);
    }
  };

  const handleSeatsBChange = (e) => {
    const value = e.target.value;
    const regex = /^[0-9]*$/;
    if (regex.test(value)) {
      setSeatsB(value);
    }
  };

  const handleSeatsEChange = (e) => {
    const value = e.target.value;
    const regex = /^[0-9]*$/;
    if (regex.test(value)) {
      setSeatsE(value);
    }
  };

  const handlePriceFChange = (e) => {
    const value = e.target.value;
    const regex = /^[0-9]*$/;
    if (regex.test(value)) {
      setPriceF(value);
    }
  };

  const handlePriceBChange = (e) => {
    const value = e.target.value;
    const regex = /^[0-9]*$/;
    if (regex.test(value)) {
      setPriceB(value);
    }
  };

  const handlePriceEChange = (e) => {
    const value = e.target.value;
    const regex = /^[0-9]*$/;
    if (regex.test(value)) {
      setPriceE(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (fromIATA === toIATA) {
      return Swal.fire({
        title: "Destinations",
        text: "2 different destinations must be entered",
        icon: "warning",
        confirmButtonText: "Ok",
        customClass: {
          popup: "custom-swal",
          confirmButton: "custom-confirm-button",
        },
      });
    }

    if (fromIATA !== "TLV" && toIATA !== "TLV") {
      return Swal.fire({
        title: "Destinations",
        text: "One of the directions must be Tel Aviv",
        icon: "warning",
        confirmButtonText: "Ok",
        customClass: {
          popup: "custom-swal",
          confirmButton: "custom-confirm-button",
        },
      });
    }

    if (!gate || gate.length < 2 || !/^[a-zA-z]$/.test(gate[0])) {
      return Swal.fire({
        title: "Gate",
        text: "Gate must be between 2-3 characters and must start with an English letter",
        icon: "warning",
        confirmButtonText: "Ok",
        customClass: {
          popup: "custom-swal",
          confirmButton: "custom-confirm-button",
        },
      });
    }

    if (!flightTime) {
      return Swal.fire({
        title: "Flight Time",
        text: "Flight times must be entered.",
        icon: "warning",
        confirmButtonText: "Ok",
        customClass: {
          popup: "custom-swal",
          confirmButton: "custom-confirm-button",
        },
      });
    }

    if (seatsF % 4 !== 0 || seatsB % 6 !== 0 || seatsE % 6 !== 0) {
      return Swal.fire({
        title: "Seats",
        text: "The number of seats for first class must be divided by 4 and seats for business and economy classes must be divided by 6.",
        icon: "warning",
        confirmButtonText: "Ok",
        customClass: {
          popup: "custom-swal",
          confirmButton: "custom-confirm-button",
        },
      });
    }

    if (seatsF > 0 && (priceF <= 0 || priceF === null)) {
      return Swal.fire({
        title: "Seats and Price",
        text: "There are a number of seats in First Class but no seat price has been entered",
        icon: "warning",
        confirmButtonText: "Ok",
        customClass: {
          popup: "custom-swal",
          confirmButton: "custom-confirm-button",
        },
      });
    }

    if (seatsB > 0 && (priceB <= 0 || priceB === null)) {
      return Swal.fire({
        title: "Seats and Price",
        text: "There are a number of seats in Business Class but no seat price has been entered",
        icon: "warning",
        confirmButtonText: "Ok",
        customClass: {
          popup: "custom-swal",
          confirmButton: "custom-confirm-button",
        },
      });
    }

    if (seatsE > 0 && (priceE <= 0 || priceE === null)) {
      return Swal.fire({
        title: "Seats and Price",
        text: "There are a number of seats in Economy Class but no seat price has been entered",
        icon: "warning",
        confirmButtonText: "Ok",
        customClass: {
          popup: "custom-swal",
          confirmButton: "custom-confirm-button",
        },
      });
    }

    const updateFlight: Flight = {
      id: flight.id,
      flightNumber: flightNumber,
      fromCity: fromCity,
      fromCountry: fromCountry,
      fromIATA: fromIATA,
      fromICAO: fromICAO,
      fromAirport: fromAirport,
      toCity: toCity,
      toCountry: toCountry,
      toIATA: toIATA,
      toICAO: toICAO,
      toAirport: toAirport,
      gate: gate,
      departure: new Date(departure),
      flightTime: flightTime,
      seats: [seatsF, seatsB, seatsE],
      price: [priceF, priceB, priceE],
      seatsTaken: flight.seatsTaken,
      isActive: isActive,
    };

    try {
      const response = await putFlightById(flightSelected, updateFlight);
      if (response.data === "Flight successfully updated") {
        Swal.fire({
          title: "success",
          text: response.data,
          icon: "success",
          confirmButtonText: "Ok",
          customClass: {
            popup: "custom-swal",
            confirmButton: "custom-confirm-button",
          },
        });
      } else if (response.data.error) {
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
      console.error("Error update Flight:", error);
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

    setDisabled(true);
    fetchFlight();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-between items-center dark:text-white/60">
        <div className="flex">
          <p className="mb-5 me-5">Status:</p>
          <p className="mb-5">{isActive ? "Avtive" : "Cancelled"}</p>
        </div>

        <button
          type="button"
          className={`transition-border duration-500 ease-in-out rounded-full border ${
            disabled
              ? "border-blue-500 hover:bg-blue-500 text-blue-500"
              : "border-red-500 hover:bg-red-500 text-red-500"
          } hover:text-white p-2`}
          onClick={() => handleEdit()}
        >
          {disabled ? (
            <MdEdit className="text-lg" />
          ) : (
            <IoClose className="text-lg" />
          )}
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="fromCity"
            className="transition-border duration-500 ease-in-out block ms-2.5 mb-2 text-gray-400 dark:text-white/60"
          >
            From
          </label>
          <div className="relative">
            <select
              id="fromCity"
              disabled={disabled}
              value={options?.find((op) => op.value === fromIATA)?.value || ""}
              onChange={handleFromChange}
              className="z-10 transition-border duration-500 ease-in-out w-full p-3 rounded-2xl border border-gray-400 bg-white text-black dark:text-white/60 dark:bg-[#181818] dark:border-white/60 disabled:border-none dark:disabled:border-none disabled:bg-gray-100 dark:disabled:bg-[#2f2f2f] disabled:text-gray-400 dark:disabled:text-white/30 focus:outline-none focus:bg-blue-50 appearance-none dark:disabled:opacity-100 disabled:opacity-100"
            >
              {options?.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <div
              className={`absolute right-3 top-3.5 p-1 rounded-full bg-blue-500 text-white ${
                disabled && "hidden"
              }`}
            >
              <MdEdit className="text-sm" />
            </div>
          </div>

          <div
            className={`z-0 bg-gray-50  text-gray-400 dark:bg-[#2f2f2f] ${
              disabled &&
              "bg-gray-50 text-gray-400 dark:bg-[#252525] dark:text-white/40"
            } p-5 pt-10 -mt-5 rounded-b-2xl dark:text-white/40`}
          >
            <div className="grid grid-cols-2 mb-2 gap-3">
              <p className="">Airport</p>
              <p className="">{fromAirport}</p>
              <p className="">IATA:</p>
              <p className="">{fromIATA}</p>
              <p className="">ICAO:</p>
              <p className="">{fromICAO}</p>
              <p className="">Flight Number:</p>
              <p className="">{flightNumber}</p>
            </div>
          </div>
        </div>

        <div>
          <label
            htmlFor="toCity"
            className="transition-border duration-500 ease-in-out block ms-2.5 mb-2 text-gray-400 dark:text-white/60"
          >
            To
          </label>
          <div className="relative">
            <select
              id="toCity"
              disabled={disabled}
              value={options?.find((op) => op.value === toIATA)?.value || ""}
              onChange={handleToChange}
              className="z-10 transition-border duration-500 ease-in-out w-full p-3 rounded-2xl border border-gray-400 bg-white text-black dark:text-white/60 dark:bg-[#181818] dark:border-white/60 disabled:border-none dark:disabled:border-none disabled:bg-gray-100 dark:disabled:bg-[#2f2f2f] disabled:text-gray-400 dark:disabled:text-white/30 focus:outline-none focus:bg-blue-50 appearance-none dark:disabled:opacity-100 disabled:opacity-100"
            >
              {options?.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <div
              className={`absolute right-3 top-3.5 p-1 rounded-full bg-blue-500 text-white ${
                disabled && "hidden"
              }`}
            >
              <MdEdit className="text-sm" />
            </div>
          </div>
          <div
            className={`z-0 bg-gray-50  text-gray-400 dark:bg-[#2f2f2f] ${
              disabled &&
              "bg-gray-50 text-gray-400 dark:bg-[#252525] dark:text-white/40"
            } p-5 pt-10 -mt-5 rounded-b-2xl dark:text-white/40`}
          >
            <div className="grid grid-cols-2 mb-2 gap-3">
              <p className="">Airport</p>
              <p className="">{toAirport}</p>
              <p className="">IATA:</p>
              <p className="">{toIATA}</p>
              <p className="">ICAO:</p>
              <p className="">{toICAO}</p>
              <p className="">Flight Number:</p>
              <p className="">{flightNumber}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-5">
        <div>
          <label
            htmlFor="gate"
            className="transition-border duration-500 ease-in-out block ms-2.5 mb-2 text-gray-400 dark:text-white/60"
          >
            Gate
          </label>
          <div className="relative">
            <input
              id="gate"
              type="text"
              disabled={disabled}
              value={gate}
              onChange={handleGateChange}
              className="transition-border duration-500 ease-in-out w-full p-3 rounded-2xl border border-gray-400 bg-white text-black dark:text-white/60 dark:bg-[#181818] dark:border-white/60 disabled:border-none dark:disabled:border-none disabled:bg-gray-100 dark:disabled:bg-[#2f2f2f] disabled:text-gray-400 dark:disabled:text-white/30 focus:outline-none focus:bg-blue-50"
            />
            <div
              className={`absolute right-3 top-3.5 p-1 rounded-full bg-blue-500 text-white ${
                disabled && "hidden"
              }`}
            >
              <MdEdit className="text-sm" />
            </div>
          </div>
        </div>

        <div>
          <label
            htmlFor="departure"
            className="transition-border duration-500 ease-in-out block ms-2.5 mb-2 text-gray-400 dark:text-white/60"
          >
            Departure
          </label>
          <div className="relative">
            <input
              id="departure"
              className="h-[48px] flex justify-end w-full transition-colors duration-500 ease-in-out dark:border-[#9a9a9a] border rounded-2xl p-1.5 ps-2 text-sm font-medium dark:text-[#9a9a9a] dark:hover:border-white dark:hover:text-white text-gray-400 dark:bg-[#212121] hover:text-gray-500 hover:border-gray-500 gap-2 datePicker disabled:border-none disabled:opacity-100 disabled:bg-gray-100 dark:disabled:bg-[#2f2f2f]"
              disabled={disabled}
              type="datetime-local"
              value={departure}
              onChange={handleDepartureChange}
            />
            <div
              className={`absolute right-3 top-3.5 p-1 rounded-full bg-blue-500 text-white ${
                disabled && "hidden"
              }`}
            >
              <MdEdit className="text-sm" />
            </div>
          </div>
        </div>

        <div>
          <label
            htmlFor="flightTime"
            className="transition-border duration-500 ease-in-out block ms-2.5 mb-2 text-gray-400 dark:text-white/60"
          >
            Flight Time
          </label>
          <div className="relative">
            <input
              id="flightTime"
              className="h-[48px] flex justify-end w-full transition-colors duration-500 ease-in-out dark:border-[#9a9a9a] border rounded-2xl p-1.5 px-2 text-sm font-medium dark:text-[#9a9a9a] dark:hover:border-white dark:hover:text-white text-gray-400 dark:bg-[#212121] hover:text-gray-500 hover:border-gray-500 gap-2 datePicker disabled:border-none disabled:opacity-100 disabled:bg-gray-100 dark:disabled:bg-[#2f2f2f]"
              disabled={disabled}
              type="time"
              value={flightTime}
              onChange={handleFlightTimeChange}
            />
            <div
              className={`absolute right-3 top-3.5 p-1 rounded-full bg-blue-500 text-white ${
                disabled && "hidden"
              }`}
            >
              <MdEdit className="text-sm" />
            </div>
          </div>
        </div>
      </div>

      <hr className="mt-10 mb-8 border-gray-200 dark:border-white/20" />

      <div className="dark:text-white/60 mb-7">
        <p className="text-2xl">Seats Count</p>
        <p className="dark:text-white/40">Number of seats in each class.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-5">
        <div>
          <label
            htmlFor="seatsFirstClass"
            className="transition-border duration-500 ease-in-out block ms-2.5 mb-2 text-gray-400 dark:text-white/60"
          >
            First Class
          </label>
          <div className="relative">
            <input
              id="seatsFirstClass"
              type="number"
              disabled={disabled}
              value={seatsF}
              onChange={handleSeatsFChange}
              className="transition-border duration-500 ease-in-out w-full p-3 rounded-2xl border border-gray-400 bg-white text-black dark:text-white/60 dark:bg-[#181818] dark:border-white/60 disabled:border-none dark:disabled:border-none disabled:bg-gray-100 dark:disabled:bg-[#2f2f2f] disabled:text-gray-400 dark:disabled:text-white/30 focus:outline-none focus:bg-blue-50"
            />
            <div
              className={`absolute right-3 top-3.5 p-1 rounded-full bg-blue-500 text-white ${
                disabled && "hidden"
              }`}
            >
              <MdEdit className="text-sm" />
            </div>
          </div>
        </div>

        <div>
          <label
            htmlFor="seatsBusinessClass"
            className="transition-border duration-500 ease-in-out block ms-2.5 mb-2 text-gray-400 dark:text-white/60"
          >
            Business Class
          </label>
          <div className="relative">
            <input
              id="seatsBusinessClass"
              type="number"
              disabled={disabled}
              value={seatsB}
              onChange={handleSeatsBChange}
              className="transition-border duration-500 ease-in-out w-full p-3 rounded-2xl border border-gray-400 bg-white text-black dark:text-white/60 dark:bg-[#181818] dark:border-white/60 disabled:border-none dark:disabled:border-none disabled:bg-gray-100 dark:disabled:bg-[#2f2f2f] disabled:text-gray-400 dark:disabled:text-white/30 focus:outline-none focus:bg-blue-50"
            />
            <div
              className={`absolute right-3 top-3.5 p-1 rounded-full bg-blue-500 text-white ${
                disabled && "hidden"
              }`}
            >
              <MdEdit className="text-sm" />
            </div>
          </div>
        </div>

        <div>
          <label
            htmlFor="seatsEconomyClass"
            className="transition-border duration-500 ease-in-out block ms-2.5 mb-2 text-gray-400 dark:text-white/60"
          >
            Economy Class
          </label>
          <div className="relative">
            <input
              id="seatsEconomyClass"
              type="number"
              disabled={disabled}
              value={seatsE}
              onChange={handleSeatsEChange}
              className="transition-border duration-500 ease-in-out w-full p-3 rounded-2xl border border-gray-400 bg-white text-black dark:text-white/60 dark:bg-[#181818] dark:border-white/60 disabled:border-none dark:disabled:border-none disabled:bg-gray-100 dark:disabled:bg-[#2f2f2f] disabled:text-gray-400 dark:disabled:text-white/30 focus:outline-none focus:bg-blue-50"
            />
            <div
              className={`absolute right-3 top-3.5 p-1 rounded-full bg-blue-500 text-white ${
                disabled && "hidden"
              }`}
            >
              <MdEdit className="text-sm" />
            </div>
          </div>
        </div>
      </div>

      <hr className="mt-10 mb-8 border-gray-200 dark:border-white/20" />

      <div className="dark:text-white/60 mb-7">
        <p className="text-2xl">Seats Cost</p>
        <p className="dark:text-white/40">Cost of seats in each class.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-5 mb-2">
        <div>
          <label
            htmlFor="priceFirstClass"
            className="transition-border duration-500 ease-in-out block ms-2.5 mb-2 text-gray-400 dark:text-white/60"
          >
            First Class
          </label>
          <div className="relative">
            <input
              id="priceFirstClass"
              type="number"
              disabled={disabled}
              value={priceF}
              onChange={handlePriceFChange}
              className="transition-border duration-500 ease-in-out w-full p-3 rounded-2xl border border-gray-400 bg-white text-black dark:text-white/60 dark:bg-[#181818] dark:border-white/60 disabled:border-none dark:disabled:border-none disabled:bg-gray-100 dark:disabled:bg-[#2f2f2f] disabled:text-gray-400 dark:disabled:text-white/30 focus:outline-none focus:bg-blue-50 ps-6"
            />
            <div
              className={`absolute right-3 top-3.5 p-1 rounded-full bg-blue-500 text-white ${
                disabled && "hidden"
              }`}
            >
              <MdEdit className="text-sm" />
            </div>

            <p className="absolute top-2.5 left-2 text-lg text-gray-400 dark:text-white/30">
              $
            </p>
          </div>
        </div>

        <div>
          <label
            htmlFor="priceBusinessClass"
            className="transition-border duration-500 ease-in-out block ms-2.5 mb-2 text-gray-400 dark:text-white/60"
          >
            Business Class
          </label>
          <div className="relative">
            <input
              id="priceBusinessClass"
              type="number"
              disabled={disabled}
              value={priceB}
              onChange={handlePriceBChange}
              className="transition-border duration-500 ease-in-out w-full p-3 rounded-2xl border border-gray-400 bg-white text-black dark:text-white/60 dark:bg-[#181818] dark:border-white/60 disabled:border-none dark:disabled:border-none disabled:bg-gray-100 dark:disabled:bg-[#2f2f2f] disabled:text-gray-400 dark:disabled:text-white/30 focus:outline-none focus:bg-blue-50 ps-6"
            />
            <div
              className={`absolute right-3 top-3.5 p-1 rounded-full bg-blue-500 text-white ${
                disabled && "hidden"
              }`}
            >
              <MdEdit className="text-sm" />
            </div>

            <p className="absolute top-2.5 left-2 text-lg text-gray-400 dark:text-white/30">
              $
            </p>
          </div>
        </div>

        <div>
          <label
            htmlFor="priceEconomyClass"
            className="transition-border duration-500 ease-in-out block ms-2.5 mb-2 text-gray-400 dark:text-white/60"
          >
            Economy Class
          </label>
          <div className="relative">
            <input
              id="priceEconomyClass"
              type="number"
              disabled={disabled}
              value={priceE}
              onChange={handlePriceEChange}
              className="transition-border duration-500 ease-in-out w-full p-3 rounded-2xl border border-gray-400 bg-white text-black dark:text-white/60 dark:bg-[#181818] dark:border-white/60 disabled:border-none dark:disabled:border-none disabled:bg-gray-100 dark:disabled:bg-[#2f2f2f] disabled:text-gray-400 dark:disabled:text-white/30 focus:outline-none focus:bg-blue-50 ps-6"
            />
            <div
              className={`absolute right-3 top-3.5 p-1 rounded-full bg-blue-500 text-white ${
                disabled && "hidden"
              }`}
            >
              <MdEdit className="text-sm" />
            </div>

            <p className="absolute top-2.5 left-2 text-lg text-gray-400 dark:text-white/30">
              $
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-center col-span-1 md:col-span-2 mt-10 mb-5">
        <button
          className="transition-colors duration-500 ease-in-out w-1/2 p-3 rounded-2xl text-white bg-blue-400 hover:bg-blue-500 disabled:bg-gray-100 disabled:text-gray-400 dark:disabled:bg-white/30 dark:disabled:text-white/40"
          disabled={disabled}
          type="submit"
        >
          Save changes
        </button>
      </div>
    </form>
  );
};

export default Details;
