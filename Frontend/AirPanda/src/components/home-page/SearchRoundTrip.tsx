import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Select from "react-select";
import { TiMinus, TiPlus } from "react-icons/ti";
import { FaUser } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import { BsArrowRight } from "react-icons/bs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import { DataContext } from "../../contexts/DataContext";
import { getDestinations } from "../../services/booking-service";

interface Destinaton {
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
}

const SearchRoundTrip = () => {
  const [from, setFrom] = useState<string | null>(null);
  const [to, setTo] = useState<string | null>(null);
  const [dates, setDates] = useState<[Date | null, Date | null]>([null, null]);
  const [startDate, endDate] = dates;
  const today = new Date();
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [passengers, setPassengers] = useState<number>(0);
  const [isShaking, setIsShaking] = useState<boolean>(false);
  const location = useLocation();
  const { setProgressStage } = useContext(DataContext);
  const [destinatons, setDestinatons] = useState<Destinaton[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getDestinations()
      .then((response) => {
        if (response.data) {
          const options = response.data.map((destination) => ({
            value: destination.iata,
            label: destination.city,
          }));
          setDestinatons(options);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const customStyles = {
    control: (baseStyles) => ({
      ...baseStyles,
      border: "none",
      boxShadow: "none",
      "&:hover": { border: "none" },
    }),
    dropdownIndicator: (baseStyles) => ({
      ...baseStyles,
      padding: "0",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "rgb(0 0 0 / 0.2)",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "rgb(0 0 0 / 0.5)",
    }),
  };

  const handleFromChange = (selectedOption) => {
    setFrom(selectedOption.value);
  };

  const handleToChange = (selectedOption) => {
    setTo(selectedOption.value);
  };

  const handleDateChange = (date: [Date | null, Date | null]) => {
    if (date[0] && date[1] && date[0] > date[1]) {
      const updatedDates: [Date | null, Date | null] = [date[0], null];
      setDates(updatedDates);
    } else {
      setDates(date);
    }
  };

  const handleAddSub = (operation: string) => {
    if (operation === "Add" && passengers < 10) {
      setPassengers(passengers + 1);
    } else if (operation === "Sub" && passengers > 0) {
      setPassengers(Math.max(passengers - 1, 0));
    }
  };

  const handleFindFlightButton = () => {
    if (
      (from &&
        to &&
        startDate &&
        endDate &&
        passengers &&
        from !== to &&
        from === "TLV") ||
      to === "TLV"
    ) {
      const searchData = {
        from,
        to,
        startDate: startDate.toLocaleDateString("en-CA"),
        endDate: endDate.toLocaleDateString("en-CA"),
        passengers,
      };

      localStorage.setItem("searchData", JSON.stringify(searchData));

      setIsEmpty(false);

      if (location.pathname === "/Booking") {
        window.location.reload();
      } else {
        navigate("/Booking");
      }

      setProgressStage("OutboundFlight");

      localStorage.removeItem("OutboundFlight");
      localStorage.removeItem("OutboundFlightSeats");
    } else if (
      from &&
      to &&
      startDate &&
      endDate &&
      passengers &&
      from === to
    ) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 200);
      setIsEmpty(true);
      Swal.fire({
        title: "Same destination selected",
        text: "You can't select the same destination in both directions",
        icon: "warning",
        confirmButtonText: "Ok",
        customClass: {
          popup: "custom-swal",
          confirmButton: "custom-confirm-button",
        },
      });
    } else if (
      (from && to && startDate && endDate && passengers && from !== "TLV") ||
      to !== "TLV"
    ) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 200);
      setIsEmpty(true);
      Swal.fire({
        title: "Invalid destinations",
        text: "One of the destinations must be Tel Aviv.",
        icon: "warning",
        confirmButtonText: "Ok",
        customClass: {
          popup: "custom-swal",
          confirmButton: "custom-confirm-button",
        },
      });
    } else {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 200);
      setIsEmpty(true);
    }
  };

  return (
    <form
      className={`flex flex-col lg:flex-row items-center py-5 w-full gap-0 rounded-3xl ${
        location.pathname === "/Booking"
          ? "rounded-t-none rounded-b-2xl border-t px-7"
          : "rounded-tr-none md:rounded-e-3xl border px-10"
      } mx-auto bg-white`}
    >
      <div className="flex flex-col w-full pt-5 lg:pt-0">
        <div>
          <label htmlFor="from" className="font-medium">
            From
          </label>
          <Select
            name="from"
            id="from"
            options={destinatons}
            value={destinatons.find((destination) => destination.iata === from)}
            onChange={handleFromChange}
            placeholder="Where From"
            styles={customStyles}
            className="w-full border-0 focus:ring-0 text-gray-500 border-blue-500 -ms-2.5 -mt-1.5"
          />
        </div>
      </div>

      <div className="bg-gray-300 w-[4px] h-[40px] mx-8 hidden lg:block"></div>

      <div className="flex flex-col w-full pt-5 lg:pt-0">
        <div>
          <label htmlFor="to" className="font-medium">
            To
          </label>
          <Select
            name="to"
            id="to"
            options={destinatons}
            value={destinatons.find((destination) => destination.iata === to)}
            onChange={handleToChange}
            placeholder="Where to"
            styles={customStyles}
            className="w-full border-0 focus:ring-0 text-gray-500 border-blue-500 -ms-2.5 -mt-1.5"
          />
        </div>
      </div>

      <div className="bg-gray-300 w-[4px] h-[40px] mx-8 hidden lg:block"></div>

      <div className="flex flex-col w-full pt-5 lg:pt-0">
        <label
          htmlFor="dates"
          className={`font-medium block mb-0.5 ${
            (!startDate || !endDate) && isEmpty ? "text-red-400" : ""
          }`}
        >
          Dates
        </label>
        <div className="flex">
          <DatePicker
            id="dates"
            selected={startDate}
            onChange={(date: Date | null) => handleDateChange([date, endDate])}
            placeholderText="Departure"
            className={`peer w-full focus:outline-none focus:ring-0 bg-white/0 placeholder:text-black/20 text-black/50 ${
              !startDate && isEmpty ? "placeholder:text-red-400" : ""
            }`}
            minDate={today}
            dateFormat="MMM dd, yyyy"
          />
          <div className="text-center">
            <BsArrowRight className="mx-2 text-gray-300 text-[18px]" />
          </div>
          <DatePicker
            selected={endDate}
            onChange={(date: Date | null) =>
              handleDateChange([startDate, date])
            }
            placeholderText="Return"
            className={`peer w-full focus:outline-none focus:ring-0 bg-white/0 placeholder:text-black/20 text-black/50 ${
              !endDate && isEmpty ? "placeholder:text-red-400" : ""
            }`}
            minDate={startDate || today}
            dateFormat="MMM dd, yyyy"
          />
        </div>
      </div>

      <div className="bg-gray-300 w-[4px] h-[40px] mx-8 hidden lg:block"></div>

      <div className="flex flex-col lg:w-auto pt-5 lg:pt-0 lg:me-4">
        <div className="">
          <label
            className={`font-medium ${
              passengers === 0 && isEmpty ? "text-red-400" : ""
            }`}
          >
            Seats
          </label>
          <Menu as="div" className="relative text-left hidden lg:block">
            <div>
              <MenuButton
                as="button"
                className="inline-flex w-full lg:w-auto justify-center  font-semibold text-gray-300"
              >
                <div
                  className={`flex items-center pe-2 mt-0 ${
                    passengers === 0 && isEmpty ? "text-red-400" : ""
                  } ${passengers > 0 && "text-black/50"}`}
                >
                  <FaUser />
                  <p className="px-2 w-[30px] text-center">{passengers}</p>
                  <IoIosArrowDown />
                </div>
              </MenuButton>
            </div>

            <MenuItems
              as="div"
              className="absolute z-10 w-auto right-0 origin-top-right rounded-3xl bg-white border ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <p className="me-5">Passengers</p>
                  <button
                    type="button"
                    onClick={() => handleAddSub("Add")}
                    className="p-2 rounded-full border border-darkblue bg-gray-100 text-gray-600 hover:bg-gray-200"
                  >
                    <TiPlus />
                  </button>
                  <span className="text-center text-xl font-semibold text-darkblue w-[40px]">
                    {passengers}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleAddSub("Sub")}
                    className="p-2 rounded-full border border-darkblue bg-gray-100 text-gray-600 hover:bg-gray-200"
                  >
                    <TiMinus />
                  </button>
                </div>

                <div className="flex justify-between mt-4">
                  <MenuItem>
                    <button
                      type="button"
                      className="w-full p-2 rounded-full border border-darkblue bg-darkblue text-white hover:ring-4 ring-blue-400/30"
                    >
                      OK
                    </button>
                  </MenuItem>
                </div>
              </div>
            </MenuItems>
          </Menu>
        </div>
      </div>

      <div className="flex justify-between items-center lg:hidden text-gray-500 w-full">
        <div
          className={`flex items-center ${
            passengers === 0 && isEmpty ? "text-red-400" : ""
          }`}
        >
          <p>Passengers</p>
        </div>
        <button
          type="button"
          onClick={() => handleAddSub("Add")}
          className="p-2 rounded-full border border-darkblue bg-gray-100 text-gray-600 hover:bg-gray-200"
        >
          <TiPlus />
        </button>
        <span className="text-center text-xl font-semibold text-darkblue w-[40px]">
          {passengers}
        </span>
        <button
          type="button"
          onClick={() => handleAddSub("Sub")}
          className="p-2 rounded-full border border-darkblue bg-gray-100 text-gray-600 hover:bg-gray-200"
        >
          <TiMinus />
        </button>
      </div>

      <button
        type="button"
        onClick={handleFindFlightButton}
        className={`bg-darkblue text-white rounded-full p-3 w-full lg:w-auto lg:ml-4 mt-8 mb-3 lg:my-0 hover:ring-4 ring-blue-400/30 transition-all duration-300 ${
          isShaking ? "animate-shake" : ""
        }`}
      >
        <div className="flex justify-center items-center">
          <p className="me-3 lg:hidden">Find your flight </p>
          <FiSearch />
        </div>
      </button>
    </form>
  );
};

export default SearchRoundTrip;
