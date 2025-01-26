import { useContext, useEffect, useRef, useState } from "react";
import { TbUserFilled } from "react-icons/tb";
import { DataContext } from "../../contexts/DataContext";
import ScrollToTop from "../ScrollToTop";

interface Passenger {
  firstName: string;
  lastName: string;
  idNumber: number;
}

const SectionPassengers = () => {
  const [passengers, setPassengers] = useState<Passenger[]>(
    JSON.parse(localStorage.getItem("Passengers") || "[]")
  );
  const outboundSeats: string[] = JSON.parse(
    localStorage.getItem("OutboundFlightSeats")
  );
  const [disabledBtn, setDisabledBtn] = useState<boolean>(true);
  const { setProgressStage } = useContext(DataContext);

  useEffect(() => {
    ScrollToTop();
  }, []);

  const areAllFieldsFilled = () => {
    return passengers.every((passenger) => {
      const idNumberStr = passenger.idNumber.toString();
      return (
        passenger.firstName.length >= 2 &&
        passenger.lastName.length >= 2 &&
        idNumberStr.length >= 9
      );
    });
  };

  useEffect(() => {
    if (areAllFieldsFilled()) {
      setDisabledBtn(false);
    } else {
      setDisabledBtn(true);
    }
  }, [passengers]);

  const handleInputChange = (
    index: number,
    field: keyof Passenger,
    value: string | number
  ) => {
    setPassengers((prevPassengers) => {
      const updatedPassengers = [...prevPassengers];
      if (!updatedPassengers[index]) {
        updatedPassengers[index] = { firstName: "", lastName: "", idNumber: 0 };
      }
      updatedPassengers[index][field] = value as never;
      localStorage.setItem("Passengers", JSON.stringify(updatedPassengers));
      return updatedPassengers;
    });
  };

  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    localStorage.setItem("Passengers", JSON.stringify(passengers));
    setProgressStage("Overview");
  };

  const handleBack = () => {
    setProgressStage("ReturnFlightSeats");
  };

  return (
    <section>
      <div className="text-center md:text-start">
        <h2 className="text-4xl font font-medium text-darkblue">Passengers</h2>
        <p className="mb-5">Please fill in the passenger details</p>
      </div>

      <div className="p-3 border rounded-3xl bg-gray-100">
        {outboundSeats.map((p, index) => (
          <div
            key={index}
            className={`${index !== 0 && "mt-3"} bg-white rounded-2xl p-10`}
          >
            <div className="flex items-center">
              <TbUserFilled className="text-3xl text-darkblue" />
              <p className="text-3xl font-medium ms-2 text-darkblue">
                Passenger {index + 1}
              </p>
            </div>
            <hr className="my-3" />
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="grid grid-col-1 md:grid-cols-3 gap-8"
            >
              <div>
                <label htmlFor="firstName" className="sr-only">
                  First Name
                </label>
                <div className="relative group">
                  <input
                    name="firstName"
                    id={`firstName-${index}`}
                    type="text"
                    placeholder="First Name"
                    required
                    pattern="^[a-zA-Z]{2,12}$"
                    title="Only letters, between 2 and 12 characters"
                    minLength={2}
                    maxLength={15}
                    className="border rounded-2xl p-3 mt-2 w-full"
                    value={passengers[index]?.firstName || ""}
                    onChange={(e) =>
                      handleInputChange(index, "firstName", e.target.value)
                    }
                  />
                </div>
              </div>

              <div>
                <label htmlFor="lastName" className="sr-only">
                  Last Name
                </label>
                <input
                  name="lastName"
                  id={`lastName-${index}`}
                  type="text"
                  placeholder="Last Name"
                  required
                  pattern="^[a-zA-Z]{2,12}$"
                  title="Only letters, between 2 and 12 characters"
                  minLength={2}
                  maxLength={15}
                  className="border rounded-2xl p-3 mt-2 w-full"
                  value={passengers[index]?.lastName || ""}
                  onChange={(e) =>
                    handleInputChange(index, "lastName", e.target.value)
                  }
                />
              </div>

              <div>
                <label htmlFor="idNumber" className="sr-only">
                  ID Number
                </label>
                <input
                  name="idNumber"
                  id={`idNumber-${index}`}
                  type="text"
                  placeholder="ID Number"
                  required
                  pattern="^\d{9}$"
                  maxLength={9}
                  minLength={9}
                  title="Only numbers allowed. If the number is less than 9 digits, please add a leading zero"
                  className="border rounded-2xl p-3 mt-2 w-full"
                  value={passengers[index]?.idNumber || ""}
                  onChange={(e) =>
                    handleInputChange(index, "idNumber", Number(e.target.value))
                  }
                />
              </div>
            </form>
          </div>
        ))}
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
          onClick={() => {
            if (formRef.current) {
              formRef.current.requestSubmit();
            }
          }}
          disabled={disabledBtn}
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default SectionPassengers;
