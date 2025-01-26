import { useContext, useEffect, useState } from "react";
import { IoAirplane } from "react-icons/io5";
import { DataContext } from "../../contexts/DataContext";
import { JwtDecodedID } from "../../services/jwt-service";
import { PiUserBold } from "react-icons/pi";
import ScrollToTop from "../ScrollToTop";
import { MdAirlineSeatLegroomExtra } from "react-icons/md";

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
}

interface SeatAndPrice {
  seatNumber: string;
  price: number;
}

interface Passenger {
  firstName: string;
  lastName: string;
  idNumber: number;
}

interface Ticket {
  flightId: string;
  userId: string;
  firstName: string;
  LastName: string;
  idNumber: string;
  flightNumber: string;
  date: Date;
  class: string;
  seat: string;
  gate: string;
}

const SectionOverview = () => {
  const [outboundFlight] = useState<Flight>(() =>
    JSON.parse(localStorage.getItem("OutboundFlight") || "{}")
  );
  const [outboundSeats] = useState<string[]>(() =>
    JSON.parse(localStorage.getItem("OutboundFlightSeats") || "[]")
  );
  const [returnFlight] = useState<Flight>(() =>
    JSON.parse(localStorage.getItem("ReturnFlight") || "{}")
  );
  const [returnSeats] = useState<string[]>(() =>
    JSON.parse(localStorage.getItem("ReturnFlightSeats") || "[]")
  );
  const passengers = JSON.parse(
    localStorage.getItem("Passengers") || "[]"
  ) as Passenger[];
  const [outboundSeatsAndPrice, setOutboundSeatsAndPrice] = useState<
    SeatAndPrice[]
  >([]);
  const [returnSeatsAndPrice, setReturnSeatsAndPrice] = useState<
    SeatAndPrice[]
  >([]);
  const { setProgressStage } = useContext(DataContext);

  useEffect(() => {
    ScrollToTop();
  }, []);

  useEffect(() => {
    localStorage.setItem("OutboundFlightSeats", JSON.stringify(outboundSeats));
    localStorage.setItem("ReturnFlightSeats", JSON.stringify(returnSeats));
    localStorage.setItem("ReturnFlight", JSON.stringify(returnFlight));
    localStorage.setItem("OutboundFlight", JSON.stringify(outboundFlight));
  }, [outboundSeats, returnSeats, outboundFlight, returnFlight]);

  useEffect(() => {
    outboundSeats.forEach((seat) => {
      if (!outboundSeatsAndPrice.some((item) => item.seatNumber === seat)) {
        seatsPrice("outbound", seat);
      }
    });
    if (returnFlight) {
      returnSeats.forEach((seat) => {
        if (!returnSeatsAndPrice.some((item) => item.seatNumber === seat)) {
          seatsPrice("return", seat);
        }
      });
    }
  }, [outboundSeats, returnSeats, returnFlight]);

  const seatsPrice = (dir: string, seat: string) => {
    if (dir === "outbound") {
      const first: number = outboundFlight.seats[0] / 4;
      const business: number = first + outboundFlight.seats[1] / 6;

      const str = seat;
      const seatRowNumber = +str.substring(1);

      const newObject = {
        seatNumber: seat,
        price:
          seatRowNumber <= first
            ? outboundFlight.price[0]
            : seatRowNumber <= business
            ? outboundFlight.price[1]
            : outboundFlight.price[2],
      };

      setOutboundSeatsAndPrice((prevArray) => {
        const index = prevArray.findIndex((item) => item.seatNumber === seat);
        if (index !== -1) {
          const updatedArray = [...prevArray];
          updatedArray[index] = newObject;
          return updatedArray;
        }
        return [...prevArray, newObject];
      });
    } else if (dir === "return") {
      const first: number = returnFlight.seats[0] / 4;
      const business: number = returnFlight.seats[1] / 6 + first;

      const str = seat;
      const seatRowNumber = +str.substring(1);

      const newObject = {
        seatNumber: seat,
        price:
          seatRowNumber <= first
            ? returnFlight.price[0]
            : seatRowNumber <= business
            ? returnFlight.price[1]
            : returnFlight.price[2],
      };

      setReturnSeatsAndPrice((prevArray) => {
        const index = prevArray.findIndex((item) => item.seatNumber === seat);
        if (index !== -1) {
          const updatedArray = [...prevArray];
          updatedArray[index] = newObject;
          return updatedArray;
        }
        return [...prevArray, newObject];
      });
    }
  };

  useEffect(() => {
    outboundSeats.forEach((seat) => {
      if (!outboundSeatsAndPrice.some((item) => item.seatNumber === seat)) {
        seatsPrice("outbound", seat);
      }
    });
    if (returnFlight) {
      returnSeats.forEach((seat) => {
        if (!returnSeatsAndPrice.some((item) => item.seatNumber === seat)) {
          seatsPrice("return", seat);
        }
      });
    }
    localStorage.setItem(
      "outboundSeatsPrice",
      JSON.stringify(outboundSeatsAndPrice)
    );
    if (returnFlight) {
      localStorage.setItem(
        "returnSeatsPrice",
        JSON.stringify(returnSeatsAndPrice)
      );
    }
  }, [
    outboundSeats,
    returnSeats,
    returnFlight,
    outboundFlight,
    outboundSeatsAndPrice,
    returnSeatsAndPrice,
  ]);

  const flightTimeDisplay = (flightTime: string) => {
    const [hours, minutes] = flightTime.split(":").map(String);
    return hours + ":" + minutes;
  };

  const landingTimeDisplay = (departure: Date, flightTime: string) => {
    const departureDate: Date = new Date(departure);
    const [hours, minutes] = flightTime.split(":").map(Number);

    departureDate.setMinutes(departureDate.getMinutes() + minutes);
    departureDate.setHours(departureDate.getHours() + hours);

    const formattedHours = departureDate.getHours().toString().padStart(2, "0");
    const formattedMinutes = departureDate
      .getMinutes()
      .toString()
      .padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}`;
  };

  const priceCalculation = () => {
    const outboundFlightTotalPrice = outboundSeatsAndPrice.reduce(
      (sum, seat) => sum + seat.price,
      0
    );

    let returnFlightTotalPrice: number = 0;

    if (localStorage.getItem("ReturnFlightSeats")) {
      returnFlightTotalPrice = returnSeatsAndPrice.reduce(
        (sum, seat) => sum + seat.price,
        0
      );
    }

    return outboundFlightTotalPrice + returnFlightTotalPrice;
  };

  const handleStage = (dir: string): void => {
    if (dir === "next") {
      createTickets();
      setProgressStage("Payment");
    } else if (dir === "back") {
      setProgressStage("Passengers");
    }
  };

  const seatsClass = (seat: string): string => {
    const first: number = outboundFlight.seats[0] / 4;
    const business: number = first + outboundFlight.seats[1] / 6;

    const str = seat;
    const seatRowNumber = +str.substring(1);

    if (seatRowNumber <= first) {
      return "First";
    } else if (seatRowNumber > first && seatRowNumber <= business) {
      return "Business";
    } else if (seatRowNumber > business) {
      return "Economy";
    }
  };

  const createTickets = () => {
    const newTickets: Ticket[] = [];
    let x: number = 0;

    passengers.forEach((passenger) => {
      const newTicket: Ticket = {
        flightId: outboundFlight.id,
        userId: JwtDecodedID(),
        firstName: passenger.firstName,
        LastName: passenger.lastName,
        idNumber: passenger.idNumber.toString(),
        flightNumber: outboundFlight.flightNumber,
        date: outboundFlight.departure,
        class: seatsClass(outboundSeats[x]),
        seat: outboundSeats[x],
        gate: outboundFlight.gate,
      };

      newTickets.push(newTicket);
      x++;
    });

    if (returnFlight) {
      let y: number = 0;

      passengers.forEach((passenger) => {
        const newTicket: Ticket = {
          flightId: returnFlight.id,
          userId: JwtDecodedID(),
          firstName: passenger.firstName,
          LastName: passenger.lastName,
          idNumber: passenger.idNumber.toString(),
          flightNumber: returnFlight.flightNumber,
          date: returnFlight.departure,
          class: seatsClass(returnSeats[y]),
          seat: returnSeats[y],
          gate: returnFlight.gate,
        };

        newTickets.push(newTicket);
        y++;
      });
    }

    if (localStorage.getItem("Tickets")) {
      localStorage.removeItem("Tickets");
    }

    localStorage.setItem("Tickets", JSON.stringify(newTickets));
  };

  return (
    <section className="p-5 md:p-0">
      <div className="text-center md:text-start mb-10">
        <h2 className="text-4xl font font-medium text-darkblue">Overview</h2>
        <p>Verify your details and price before completing the purchase.</p>
      </div>

      <div>
        <h3 className="font-semibold text-xl mb-3 flex justify-center md:justify-start">
          Flights and Seats
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={`border rounded-3xl bg-gray-100`}>
            <div className="flex justify-around items-center m-5">
              <p className="text-2xl font-medium w-[60px]">
                {new Date(outboundFlight.departure).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              <div>
                <p className="text-sm font-medium text-center text-gray-400">
                  {outboundFlight.fromIATA + " - " + outboundFlight.toIATA}
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
                  {flightTimeDisplay(outboundFlight.flightTime)}
                </p>
              </div>
              <p className="text-2xl font-medium w-[60px]">
                {landingTimeDisplay(
                  outboundFlight.departure,
                  outboundFlight.flightTime
                )}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 p-3">
              {outboundSeatsAndPrice.map((os) => (
                <div
                  key={os.seatNumber}
                  className="flex justify-around items-center gap-2 rounded-2xl p-2 bg-white"
                >
                  <div className="flex items-center gap-5">
                    <p className="font-bold">{os.seatNumber}</p>
                  </div>
                  <p className="font-bold">{os.price}$</p>
                </div>
              ))}
            </div>
          </div>

          <div className={`border rounded-3xl bg-gray-100`}>
            <div className="flex justify-around items-center m-5">
              <p className="text-2xl font-medium w-[60px]">
                {new Date(returnFlight.departure).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              <div>
                <p className="text-sm font-medium text-center text-gray-400">
                  {returnFlight.fromIATA + " - " + returnFlight.toIATA}
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
                  {flightTimeDisplay(returnFlight.flightTime)}
                </p>
              </div>
              <p className="text-2xl font-medium w-[60px]">
                {landingTimeDisplay(
                  returnFlight.departure,
                  returnFlight.flightTime
                )}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 p-3">
              {returnSeatsAndPrice.map((os) => (
                <div
                  key={os.seatNumber}
                  className="flex justify-around items-center gap-2 rounded-2xl p-2 bg-white"
                >
                  <div className="flex items-center gap-5">
                    <p className="font-bold">{os.seatNumber}</p>
                  </div>
                  <p className="font-bold">{os.price}$</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <h3 className="font-semibold text-2xl mb-3 flex justify-center md:justify-start mt-8">
        Passengers
      </h3>
      {passengers.map((p, index) => (
        <div
          key={p.firstName}
          className="flex w-full items-center border bg-gray-100 rounded-3xl p-3 my-4"
        >
          <PiUserBold className="text-3xl mx-5" />

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full items-center">
            <div className="mx-5">
              <p className="text-sm font-medium text-gray-400">Full Name:</p>
              <p className="text-lg">
                {p.firstName.toLowerCase()} {p.lastName.toLowerCase()}
              </p>
            </div>

            <div className="mx-5">
              <p className="text-sm font-medium text-gray-400">ID Number:</p>
              <p className="text-lg">{p.idNumber}</p>
            </div>

            <div className="flex md:flex-col bg-white rounded-2xl p-3 col-span-2 md:col-span-1 ms-3 md:ms-0">
              <div className="flex items-center">
                <p className="text-sm font-medium text-gray-400">
                  {outboundFlight.fromIATA + " - " + outboundFlight.toIATA}:
                </p>
                <MdAirlineSeatLegroomExtra className="ms-3 me-2" />
                <p className="">{outboundSeats[index]}</p>
              </div>
              {returnFlight && (
                <div className="flex items-center ms-5 md:ms-0">
                  <p className="text-sm font-medium text-gray-400">
                    {returnFlight.fromIATA + " - " + returnFlight.toIATA}:
                  </p>
                  <MdAirlineSeatLegroomExtra className="ms-3 me-2" />
                  <p className="">{returnSeats[index]}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}

      <hr className="my-10" />

      <h3 className="font-semibold text-3xl mb-3 text-darkblue flex justify-center md:justify-start mt-8">
        Total: {priceCalculation()}$
      </h3>

      <hr className="my-10" />

      <div className="flex justify-center gap-4 md:justify-end mt-5 lg:col-span-2">
        <button
          className="button px-10 py-2 w-full sm:w-1/2 md:w-auto rounded-full hover:ring-4 ring-blue-400/30 disabled:bg-black/40 disabled:ring-0 mt-3"
          onClick={() => handleStage("back")}
        >
          Back
        </button>
        <button
          className="button px-10 py-2 w-full sm:w-1/2 md:w-auto rounded-full hover:ring-4 ring-blue-400/30 disabled:bg-black/40 disabled:ring-0 mt-3"
          onClick={() => handleStage("next")}
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default SectionOverview;
