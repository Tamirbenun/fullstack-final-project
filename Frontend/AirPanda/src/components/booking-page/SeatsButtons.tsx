import { useContext, useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { DataContext } from "../../contexts/DataContext";

interface FlightData {
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

const SeatsButtons = ({
  seatsRow,
  seatsCol,
  startRow,
  price,
}: {
  seatsRow: number;
  seatsCol: string;
  startRow: number;
  price: number;
}) => {
  const buttons = Array.from(
    { length: seatsRow },
    (_, index) => `${seatsCol}${index + 1 + startRow}`
  );

  const [flight, setFlight] = useState<FlightData | null>(null);
  const [seatMark, setSeatMark] = useState<string[]>([]);
  const { setSelectedSeats, progressStage } = useContext(DataContext);

  useEffect(() => {
    const storedFlight = localStorage.getItem(
      progressStage === "OutboundFlightSeats"
        ? "OutboundFlight"
        : "ReturnFlight"
    );
    if (storedFlight) {
      setFlight(JSON.parse(storedFlight));
    }
  }, []);

  const disabledSeat = (seatToCheck: string) => {
    if (!flight) return false;
    return flight.seatsTaken.includes(seatToCheck);
  };

  const handleClick = (buttonValue: string) => {
    const seats: string[] = JSON.parse(
      localStorage.getItem(progressStage) || "[]"
    );
    const searchData = JSON.parse(localStorage.getItem("searchData") || "{}");
    if (seats.includes(buttonValue)) {
      const index = seats.indexOf(buttonValue);
      seats.splice(index, 1);
      localStorage.setItem(progressStage, JSON.stringify(seats));
      setSelectedSeats(seats);
      setSeatMark([...seats]);
    } else if (seats.length < searchData.passengers) {
      seats.push(buttonValue);
      localStorage.setItem(progressStage, JSON.stringify(seats));
      setSelectedSeats(seats);
      setSeatMark([...seats]);
    }
  };

  return (
    <>
      {buttons.map((buttonValue) => (
        <span key={buttonValue} className="relative group">
          <p className="absolute left-1/2 transform -translate-x-1/2 -translate-y-8 bg-green-500 text-white text-sm px-2 py-1 rounded-xl hidden group-hover:block transition-opacity">
            {price}$
          </p>
          <button
            onClick={() => handleClick(buttonValue)}
            disabled={disabledSeat(buttonValue)}
            className={`w-[35px] h-[35px] rounded-[12px] m-1 ${
              seatMark.includes(buttonValue)
                ? "bg-white ring ring-inset ring-darkblue"
                : "bg-darkblue hover:bg-white"
            } disabled:bg-gray-300 ${
              !disabledSeat(buttonValue) &&
              "ring-hover-darkblue hover:ring hover:ring-inset"
            }`}
          >
            {disabledSeat(buttonValue) ? (
              <IoClose className="text-gray-400 w-[35px] h-[35px]" />
            ) : (
              <p className="text-xs text-gray-500">{buttonValue}</p>
            )}
          </button>
        </span>
      ))}
    </>
  );
};

export default SeatsButtons;
