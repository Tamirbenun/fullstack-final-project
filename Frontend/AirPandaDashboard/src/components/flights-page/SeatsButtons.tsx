import { useState, useEffect, useContext } from "react";
import { IoClose } from "react-icons/io5";
import { putFlightSeatsTakenById } from "../../services/flights-service";
import { DataContext } from "../../contexts/DataContext";
import { RotatingLines } from "react-loader-spinner";

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
  const { flightSelected, seatsTaken, setSeatsTaken } = useContext(DataContext);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {}, []);

  const handleClick = async (buttonValue: string) => {
    localStorage.setItem("temp", buttonValue);
    setLoading(true);
    try {
      const response = await putFlightSeatsTakenById(
        flightSelected,
        buttonValue
      );
      if (response.data.error) {
        console.error(response.data.error);
      } else {
        setSeatsTaken((prevSeats: string[]) =>
          prevSeats.includes(buttonValue)
            ? prevSeats.filter((s) => s !== buttonValue)
            : [...prevSeats, buttonValue]
        );
      }
    } catch (error) {
      console.error("Error fetching flights:", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <>
      {buttons.map((buttonValue) => (
        <span key={buttonValue} className="relative group h-[43px]">
          <p className="absolute left-1/2 transform -translate-x-1/2 -translate-y-8 bg-green-500 text-white text-sm px-2 py-1.5 rounded-xl hidden group-hover:block transition-opacity">
            {price}$
          </p>
          <button
            onClick={() => handleClick(buttonValue)}
            className={`w-[35px] h-[35px] rounded-[12px] m-1 ${
              seatsTaken.includes(buttonValue)
                ? "dark:bg-white/40 bg-gray-100 hover:bg-gray-300 dark:hover:bg-[#bcbcbc]"
                : "bg-darkblue text-white/80 hover:bg-blue-500"
            } bg-gray-100 text-black`}
          >
            {loading && buttonValue === localStorage.getItem("temp") ? (
              <div className="flex justify-center items-center">
                <RotatingLines
                  visible={true}
                  width="20"
                  strokeColor="#202020"
                  strokeWidth="5"
                  animationDuration="0.75"
                  ariaLabel="rotating-lines-loading"
                />
              </div>
            ) : seatsTaken.includes(buttonValue) ? (
              <IoClose className="text-black/20 dark:text-black/40 w-[35px] h-[35px]" />
            ) : (
              <p className="text-xs">{buttonValue}</p>
            )}
          </button>
        </span>
      ))}
    </>
  );
};

export default SeatsButtons;
