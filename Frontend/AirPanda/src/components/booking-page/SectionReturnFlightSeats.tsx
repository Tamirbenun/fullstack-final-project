import { IoAirplane, IoClose } from "react-icons/io5";
import SeatsContainer from "./SeatsContainer";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../contexts/DataContext";
import ScrollToTop from "../ScrollToTop";
import ScrollToBottom from "../ScrollToBottom";

interface ReturnFlight {
  id: string;
  fromICAO: string;
  fromIATA: string;
  fromAirPorts: string;
  departure: Date;
  flightTime: Date;
  seats: number[];
  price: number[];
  seatsTaken: string[];
}

interface SearchData {
  from: string;
  to: string;
  startDate: Date;
  endDate: Date;
  passengers: number;
}

const SectionReturnFlightSeats = () => {
  const { selectedSeats, setSelectedSeats, setProgressStage } =
    useContext(DataContext);
  const returnFlight = JSON.parse(
    localStorage.getItem("ReturnFlight") || "{}"
  ) as ReturnFlight;
  const [disabledBtn, setDisabledBtn] = useState<boolean>(true);
  const searchDataObj: SearchData = JSON.parse(
    localStorage.getItem("searchData")
  );

  useEffect(() => {
    ScrollToTop();
  }, []);

  useEffect(() => {
    setSelectedSeats([]);
    localStorage.removeItem("ReturnFlightSeats");
  }, [setSelectedSeats]);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      localStorage.removeItem("OutboundFlightSeats");
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    if (selectedSeats.length === searchDataObj?.passengers) {
      setDisabledBtn(false);
      ScrollToBottom();
    } else {
      setDisabledBtn(true);
    }
  }, [selectedSeats, searchDataObj]);

  const handleNext = (): void => {
    setProgressStage("Passengers");
  };

  const handleBack = (): void => {
    setProgressStage("ReturnFlight");
    setSelectedSeats([]);
    localStorage.removeItem("ReturnFlightSeats");
    localStorage.removeItem("ReturnFlight");
  };

  return (
    <section>
      <div className="text-center md:text-start">
        <h2 className="text-4xl font font-medium text-darkblue">
          Select Seats
        </h2>
        <p className="mb-5">Seat selection for Return flight</p>
      </div>

      <div className="border rounded-3xl bg-gray-100">
        <div className="flex justify-around items-center m-5">
          <p className="text-2xl font-medium w-[60px]">
            {(() => {
              const departureTime = new Date(returnFlight.departure);
              if (isNaN(departureTime.getTime())) {
                return "Invalid Date";
              }
              return departureTime.toLocaleTimeString("he-IL", {
                hour: "2-digit",
                minute: "2-digit",
              });
            })()}
          </p>
          <div className="">
            <p className="text-sm font-medium text-center text-gray-400">
              {(() => {
                const flightTime = new Date(returnFlight.flightTime);
                if (isNaN(flightTime.getTime())) {
                  return "Invalid Date";
                }
                return flightTime.toLocaleTimeString("he-IL", {
                  hour: "2-digit",
                  minute: "2-digit",
                });
              })()}
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
              Flight Time
            </p>
          </div>
          <p className="text-2xl font-medium w-[60px]">
            {(() => {
              const departureTime = new Date(returnFlight.departure);
              const flightTime = new Date(new Date().setHours(3, 0, 0, 0));
              departureTime.setHours(
                departureTime.getHours() + flightTime.getHours()
              );
              departureTime.setMinutes(
                departureTime.getMinutes() + flightTime.getMinutes()
              );
              return departureTime.toLocaleTimeString("he-IL", {
                hour: "2-digit",
                minute: "2-digit",
              });
            })()}
          </p>
        </div>

        <div className="m-3 p-5 bg-white rounded-2xl">
          <div className="grid grid-cols-1 md:grid-cols-[auto,1fr]  gap-8 md:gap-0 justify-between items-start w-full mb-2">
            <div className="flex justify-center md:justify-start bg-gray-100 rounded-2xl py-2 px-4">
              <p className="">Selected Seats:</p>
              {selectedSeats?.map((s, index) => (
                <p
                  className={`font-medium ms-3 ${
                    index !== 0 ? "border-l border-gray-300 pl-2" : ""
                  }`}
                  key={s}
                >
                  {s}
                </p>
              ))}
            </div>
            <div className="flex items-center gap-2 justify-center md:justify-end">
              <div className="w-[20px] h-[20px] bg-darkblue rounded-md"></div>
              <p className="me-2">Available</p>
              <div className="w-[20px] h-[20px] border-2 border-darkblue rounded-md"></div>
              <p className="me-2">Selected</p>
              <div className="w-[20px] h-[20px] bg-gray-300 rounded-md">
                <IoClose className="text-gray-400 w-[20px] h-[20px]" />
              </div>
              <p className="me-2">Taken</p>
            </div>
          </div>

          <SeatsContainer direction="Return" />
        </div>
      </div>
      <div className="flex justify-center gap-4 md:justify-end mt-5 lg:col-span-2">
        <button
          className="button px-10 py-2 w-full sm:w-1/2 md:w-auto rounded-full hover:ring-4 ring-blue-400/30 disabled:bg-black/40 disabled:ring-0 mt-3"
          onClick={handleBack}
        >
          Back
        </button>
        <button
          className="button px-10 py-2 w-full sm:w-1/2 md:w-auto rounded-full hover:ring-4 ring-blue-400/30 disabled:bg-black/40 disabled:ring-0 mt-3"
          onClick={handleNext}
          disabled={disabledBtn}
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default SectionReturnFlightSeats;
