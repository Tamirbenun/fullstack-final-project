import airplaneNose from "../../assets/images/airplane-nose.svg";
import airplaneTail from "../../assets/images/airplane-tail.svg";
import SeatsButtons from "./SeatsButtons";

interface Flight {
  id: string;
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
  isActive: string;
}

const SeatsContainer = ({ flight }) => {
  const seatsRow = (
    flightClass: number,
    colNumber: number,
    rowStart: number
  ) => {
    const rows = [];
    for (
      let row = 1;
      row < flight?.seats[flightClass] / colNumber + +1;
      row++
    ) {
      rows.push(
        <p className="text-xs text-gray-400 w-[35px]" key={row}>
          {row + rowStart}
        </p>
      );
    }
    return rows;
  };

  return (
    <div className="flex w-full overflow-x-auto overflow-y-hidden py-5 custom-scroll">
      <img
        src={airplaneNose}
        alt="airplane nose"
        className="h-[330px] min-h-[330px] dark:opacity-30"
      />

      <div className="h-[330px] -ms-11 bg-white dark:bg-[#242424] border-gray-100 dark:border-[#606161] border-8 rounded-[40px] pe-10 relative z-10">
        <div className="flex items-center h-full">
          <p className="-rotate-90 whitespace-nowrap flex items-center justify-center text-gray-400 text-xl tracking-widest w-[80px]">
            First Class
          </p>
          <div>
            <div className="flex items-center my-2">
              <p className="text-gray-400 w-[20px]">F</p>
              <SeatsButtons
                seatsRow={flight?.seats[0] / 4}
                seatsCol="F"
                startRow={0}
                price={flight?.price[0]}
              />
            </div>

            <div className="flex text-center ms-6 gap-2 my-3">
              {seatsRow(0, 4, 0)}
            </div>

            <div className="flex items-center my-2">
              <p className="text-gray-400 w-[20px]">D</p>
              <SeatsButtons
                seatsRow={flight?.seats[0] / 4}
                seatsCol="D"
                startRow={0}
                price={flight?.price[0]}
              />
            </div>

            <div className="flex text-center ms-6 gap-2 my-3">
              {seatsRow(0, 4, 0)}
            </div>

            <div className="flex items-center my-2">
              <p className="text-gray-400 w-[20px]">C</p>
              <SeatsButtons
                seatsRow={flight?.seats[0] / 4}
                seatsCol="C"
                startRow={0}
                price={flight?.price[0]}
              />
            </div>

            <div className="flex text-center ms-6 gap-2 my-3">
              {seatsRow(0, 4, 0)}
            </div>

            <div className="flex items-center my-2">
              <p className="text-gray-400 w-[20px]">A</p>
              <SeatsButtons
                seatsRow={flight?.seats[0] / 4}
                seatsCol="A"
                startRow={0}
                price={flight?.price[0]}
              />
            </div>
          </div>

          <p className="ms-5 -rotate-90 whitespace-nowrap flex items-center justify-center text-gray-400 text-xl tracking-widest w-[80px]">
            Business Class
          </p>

          <div className="">
            <div className="flex items-center ">
              <p className="text-gray-400 w-[20px]">F</p>
              <SeatsButtons
                seatsRow={flight?.seats[1] / 6}
                seatsCol="F"
                startRow={flight?.seats[0] / 4}
                price={flight?.price[1]}
              />
            </div>
            <div className="flex items-center ">
              <p className="text-gray-400 w-[20px]">E</p>
              <SeatsButtons
                seatsRow={flight?.seats[1] / 6}
                seatsCol="E"
                startRow={flight?.seats[0] / 4}
                price={flight?.price[1]}
              />
            </div>
            <div className="flex items-center ">
              <p className="text-gray-400 w-[20px]">D</p>
              <SeatsButtons
                seatsRow={flight?.seats[1] / 6}
                seatsCol="D"
                startRow={flight?.seats[0] / 4}
                price={flight?.price[1]}
              />
            </div>

            <div className="flex text-center ms-6 gap-2 my-3">
              {seatsRow(1, 6, flight?.seats[0] / 4)}
            </div>

            <div className="flex items-center">
              <p className="text-gray-400 w-[20px]">C</p>
              <SeatsButtons
                seatsRow={flight?.seats[1] / 6}
                seatsCol="C"
                startRow={flight?.seats[0] / 4}
                price={flight?.price[1]}
              />
            </div>
            <div className="flex items-center ">
              <p className="text-gray-400 w-[20px]">B</p>
              <SeatsButtons
                seatsRow={flight?.seats[1] / 6}
                seatsCol="B"
                startRow={flight?.seats[0] / 4}
                price={flight?.price[1]}
              />
            </div>
            <div className="flex items-center ">
              <p className="text-gray-400 w-[20px]">A</p>
              <SeatsButtons
                seatsRow={flight?.seats[1] / 6}
                seatsCol="A"
                startRow={flight?.seats[0] / 4}
                price={flight?.price[1]}
              />
            </div>
          </div>

          <p className="ms-5 -rotate-90 whitespace-nowrap flex items-center justify-center text-gray-400 text-xl tracking-widest w-[80px]">
            Economy Class
          </p>

          <div>
            <div className="flex items-center ">
              <p className="text-gray-400 w-[20px]">F</p>
              <SeatsButtons
                seatsRow={flight?.seats[2] / 6}
                seatsCol="F"
                startRow={flight?.seats[1] / 6 + flight?.seats[0] / 4}
                price={flight?.price[2]}
              />
            </div>
            <div className="flex items-center ">
              <p className="text-gray-400 w-[20px]">E</p>
              <SeatsButtons
                seatsRow={flight?.seats[2] / 6}
                seatsCol="E"
                startRow={flight?.seats[1] / 6 + flight?.seats[0] / 4}
                price={flight?.price[2]}
              />
            </div>
            <div className="flex items-center ">
              <p className="text-gray-400 w-[20px]">D</p>
              <SeatsButtons
                seatsRow={flight?.seats[2] / 6}
                seatsCol="D"
                startRow={flight?.seats[1] / 6 + flight?.seats[0] / 4}
                price={flight?.price[2]}
              />
            </div>

            <div className="flex text-center ms-6 gap-2 my-3">
              {seatsRow(2, 6, flight?.seats[1] / 6 + flight?.seats[0] / 4)}
            </div>

            <div className="flex items-center">
              <p className="text-gray-400 w-[20px]">C</p>
              <SeatsButtons
                seatsRow={flight?.seats[2] / 6}
                seatsCol="C"
                startRow={flight?.seats[1] / 6 + flight?.seats[0] / 4}
                price={flight?.price[2]}
              />
            </div>
            <div className="flex items-center ">
              <p className="text-gray-400 w-[20px]">B</p>
              <SeatsButtons
                seatsRow={flight?.seats[2] / 6}
                seatsCol="B"
                startRow={flight?.seats[1] / 6 + flight?.seats[0] / 4}
                price={flight?.price[2]}
              />
            </div>
            <div className="flex items-center ">
              <p className="text-gray-400 w-[20px]">A</p>
              <SeatsButtons
                seatsRow={flight?.seats[2] / 6}
                seatsCol="A"
                startRow={flight?.seats[1] / 6 + flight?.seats[0] / 4}
                price={flight?.price[2]}
              />
            </div>
          </div>
        </div>
      </div>

      <img
        src={airplaneTail}
        alt="airplane tail"
        className="h-[330px] -ms-9 relative z-0 dark:opacity-30"
      />
    </div>
  );
};

export default SeatsContainer;
