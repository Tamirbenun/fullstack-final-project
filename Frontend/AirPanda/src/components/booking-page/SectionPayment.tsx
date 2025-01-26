import "../../css/Payment.css";
import Isracard from "../../assets/images/payments-Icons/Isracard.svg";
import American from "../../assets/images/payments-Icons/american.svg";
import Mastercard from "../../assets/images/payments-Icons/mastercard.svg";
import Visa from "../../assets/images/payments-Icons/visa.svg";
import Diners from "../../assets/images/payments-Icons/Diners.svg";
import { useContext, useEffect, useState } from "react";
import { HiOutlineCreditCard } from "react-icons/hi2";
import ScrollToTop from "../ScrollToTop";
import { DataContext } from "../../contexts/DataContext";
import Swal from "sweetalert2";
import { postPayment } from "../../services/booking-service";
import { ThreeDots } from "react-loader-spinner";
import { BsCreditCard2Front } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

interface SeatAndPrice {
  seatNumber: string;
  price: number;
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

const SectionPayment = () => {
  const [cardNumber, setCardNumber] = useState<string>("");
  const [firstName, setfirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [cvv, setCvv] = useState<string>("");
  const [month, setMonth] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [isFormComplete, setIsFormComplete] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setProgressStage } = useContext(DataContext);
  const outboundSeatsPrice = JSON.parse(
    localStorage.getItem("outboundSeatsPrice") || "[]"
  ) as SeatAndPrice[];
  const returnSeatsPrice = JSON.parse(
    localStorage.getItem("returnSeatsPrice") || "[]"
  ) as SeatAndPrice[];
  const tickets = JSON.parse(
    localStorage.getItem("Tickets") || "[]"
  ) as Ticket[];
  const navigate = useNavigate();

  useEffect(() => {
    ScrollToTop();
  }, []);

  const handleInputCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9]/g, "");
    value = value.replace(/(\d{4})(?=\d)/g, "$1 ");
    setCardNumber(value);
  };

  const handleIconChange = (cardNumber: string) => {
    const cleanedCardNumber = cardNumber.replace(/\s+/g, "");

    const visaRegex = /^4\d*$/;
    const mastercardRegex = /^(51|52|53|54|55)\d*$/;
    const dinersRegex = /^(30|36|38)\d*$/;
    const amexRegex = /^(27|37)\d*$/;
    const isracardRegex = /^(?!51|52|53|54|55|37|27|30|36|38|4)\d{8}$/;

    if (visaRegex.test(cleanedCardNumber)) {
      return Visa;
    } else if (mastercardRegex.test(cleanedCardNumber)) {
      return Mastercard;
    } else if (dinersRegex.test(cleanedCardNumber)) {
      return Diners;
    } else if (amexRegex.test(cleanedCardNumber)) {
      return American;
    } else if (isracardRegex.test(cleanedCardNumber)) {
      return Isracard;
    }

    return "default";
  };

  const handleInputFirstNameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setfirstName(value);
  };

  const handleInputLastNameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setLastName(value);
  };

  const handleInputCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCvv(value);
  };

  const handleFocus = () => {
    flipCard();
  };

  const handleBlur = () => {
    flipCard();
  };

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  useEffect(() => {
    if (cardNumber && firstName && lastName && cvv && month && year) {
      setIsFormComplete(false);
    } else {
      setIsFormComplete(true);
    }
  }, [cardNumber, firstName, lastName, cvv, month, year]);

  const handleBack = (): void => {
    setProgressStage("Overview");
  };

  const handlePayment = () => {
    setIsLoading(true);
    if (!cardNumber || !firstName || !lastName || !cvv || !month || !year) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "All fields must be filled in!",
      });
      setIsLoading(false);
      return;
    }

    postPayment(
      cardNumber,
      `${firstName} ${lastName}`,
      `${month.length < 2 ? "0" + month : month}/${year[2] + year[3]}`,
      cvv,
      tickets
    )
      .then((response) => {
        if (response.data !== undefined) {
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
              navigate("/");
            }
          });
        } else if (response.code === "ERR_NETWORK") {
          Swal.fire({
            icon: "error",
            title: response.message,
            text: "Please try again.",
            customClass: {
              popup: "custom-swal",
              confirmButton: "custom-confirm-button",
            },
          });
        } else {
          Swal.fire({
            icon: "error",
            title: response.message,
            text: "Please check that all the details are correct and try again.",
            customClass: {
              popup: "custom-swal",
              confirmButton: "custom-confirm-button",
            },
          });
        }
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: error,
          text: "Please check that all the details are correct and try again.",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <section className="p-5 md:p-0">
      <div className="text-center md:text-start mb-10">
        <h2 className="text-4xl font font-medium text-darkblue lg:mb-20">
          Payment
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10">
        <div className="order-2 lg:order-1">
          <form onSubmit={handlePayment}>
            <label htmlFor="cardNumber" className="font-bold text-lg">
              Card Number
            </label>
            <p className="text-gray-400 mt-1">
              Enter the 16-digit card number on the card
            </p>
            <div className="flex relative items-center mt-5 border rounded-2xl">
              <div className="absolute left-3">
                {handleIconChange(cardNumber) === "default" ? (
                  <BsCreditCard2Front className="text-xl h-[25px] w-[50px]" />
                ) : (
                  <img
                    src={handleIconChange(cardNumber)}
                    alt="Company Card"
                    aria-label="Company Card"
                    className="h-[20px] w-[50px]"
                  />
                )}
              </div>
              <input
                id="cardNumber"
                type="tel"
                placeholder="XXXX XXXX XXXX XXXX"
                className="w-full h-14 text-lg p-3 ps-20 rounded-2xl font-medium focus:bg-blue-50 focus:outline-blue-500 focus:text-blue-500 disabled:bg-gray-100 disabled:text-gray-400"
                value={cardNumber}
                disabled={isLoading}
                onChange={handleInputCardChange}
                maxLength={19}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-10">
              <div>
                <label htmlFor="holder" className="font-bold text-lg">
                  Card Holder
                </label>
                <p className="text-gray-400 mt-1">
                  Enter the full name on the card
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input
                  id="holder"
                  type="text"
                  placeholder="First Name"
                  className="w-full h-14 text-lg my-0.5 text-center border rounded-2xl font-medium focus:bg-blue-50 focus:outline-blue-500 focus:text-blue-500 placeholder:text-gray-300 disabled:bg-gray-100 disabled:text-gray-400"
                  value={firstName}
                  disabled={isLoading}
                  onChange={handleInputFirstNameChange}
                  maxLength={15}
                />
                <input
                  id="holder"
                  type="text"
                  placeholder="Last Name"
                  className="w-full h-14 text-lg my-0.5 text-center border rounded-2xl font-medium focus:bg-blue-50 focus:outline-blue-500 focus:text-blue-500 placeholder:text-gray-300 disabled:bg-gray-100 disabled:text-gray-400"
                  value={lastName}
                  disabled={isLoading}
                  onChange={handleInputLastNameChange}
                  maxLength={15}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-10">
              <div>
                <label htmlFor="cvv" className="font-bold text-lg">
                  CVV Number
                </label>
                <p className="text-gray-400 mt-1">
                  Enter the 3 or 4 digit number on the card
                </p>
              </div>
              <div className=" relative">
                <input
                  id="cvv"
                  type="tel"
                  placeholder="XXX"
                  className="w-full h-14 text-lg my-0.5 text-center border rounded-2xl font-medium focus:bg-blue-50 focus:outline-blue-500 focus:text-blue-500 disabled:bg-gray-100 disabled:text-gray-400"
                  value={cvv}
                  onChange={handleInputCvvChange}
                  maxLength={4}
                  disabled={isLoading}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
                <div className=" absolute left-0 top-[18px]">
                  <HiOutlineCreditCard className="text-xl h-[25px] w-[50px]" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-10">
              <div>
                <label htmlFor="expMM" className="font-bold text-lg">
                  Expiry Date
                </label>
                <p className="text-gray-400 mt-1">
                  Enter the expiration date on the card
                </p>
              </div>
              <div className="flex items-center ">
                <select
                  id="expMM"
                  className={`w-full text-center text-lg border rounded-2xl p-3 font-medium focus:bg-blue-50 focus:outline-blue-500 focus:text-blue-500 disabled:bg-gray-100 disabled:text-gray-400 ${
                    !month && "text-gray-400"
                  }`}
                  value={month}
                  disabled={isLoading}
                  onChange={(e) => setMonth(e.target.value)}
                >
                  <option value="" disabled>
                    Month
                  </option>
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
                <p className="mx-5 font-medium text-gray-700">/</p>
                <select
                  id="expYY"
                  className={`w-full text-center text-lg border rounded-2xl p-3 font-medium focus:bg-blue-50 focus:outline-blue-500 focus:text-blue-500 disabled:bg-gray-100 disabled:text-gray-400 ${
                    !year && "text-gray-400"
                  }`}
                  value={year}
                  disabled={isLoading}
                  onChange={(e) => setYear(e.target.value)}
                >
                  <option value="" disabled>
                    Year
                  </option>
                  {Array.from({ length: 2099 - 2025 + 1 }, (_, i) => (
                    <option key={2025 + i} value={2025 + i}>
                      {2025 + i}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="lg:hidden w-full mt-10">
              <div className="grid grid-cols-[2fr,1fr] gap-x-4 gap-y-1 pb-2 border-b-2 border-gray-200">
                <p className="text-gray-500 font-medium">Outband Flight:</p>
                <p className="text-gray-500 font-medium text-end">
                  {outboundSeatsPrice.reduce(
                    (sum, seat) => sum + seat.price,
                    0
                  )}
                  $
                </p>
                {returnSeatsPrice && (
                  <>
                    <p className="text-gray-500 font-medium">Return Flight:</p>
                    <p className="text-gray-500 font-medium text-end">
                      {returnSeatsPrice.reduce(
                        (sum, seat) => sum + seat.price,
                        0
                      )}
                      $
                    </p>
                  </>
                )}
              </div>
              <div className="grid grid-cols-[2fr,1fr] gap-x-4 mt-2">
                <p className="text-gray-800 font-medium">Total:</p>
                <p className="text-gray-800 font-medium text-end">
                  {outboundSeatsPrice.reduce(
                    (sum, seat) => sum + seat.price,
                    0
                  ) +
                    returnSeatsPrice?.reduce(
                      (sum, seat) => sum + seat.price,
                      0
                    )}
                  $
                </p>
              </div>
              <p className="text-xs text-gray-400 text-center mt-2">
                {" "}
                *The prices include 18% VAT
              </p>
            </div>

            <div className="lg:hidden">
              <button
                onClick={handleBack}
                className="w-full mt-10 bg-none border border-gray-800 hover:bg-gray-800 text-gray-800 hover:text-white rounded-2xl p-3 transition duration-300 ease-in-out"
              >
                Back
              </button>
              <button
                onClick={handlePayment}
                disabled={isFormComplete}
                className="w-full bg-gray-800 hover:bg-blue-600 disabled:bg-gray-400 text-white rounded-2xl p-3 transition duration-300 ease-in-out mt-5"
                title={
                  isFormComplete
                    ? "All fields must be filled in."
                    : "Pay Button"
                }
              >
                Pay Now
              </button>
            </div>
          </form>
        </div>

        <div className="relative flex justify-center order-1 lg:order-2 lg:bg-gray-100 rounded-3xl md:p-5">
          <div className="relative w-80 h-48 lg:-mt-20">
            <div
              className={`w-80 h-full absolute transition-transform duration-700 transform shadow-2xl rounded-3xl ${
                isFlipped ? "rotate-y-180" : ""
              }`}
            >
              <div
                className={`absolute w-80 h-full bg-gray-800 text-white rounded-2xl transition-all duration-500 ease-in-out backface-hidden p-5`}
              >
                <div className="fixed top-5 right-5">
                  {handleIconChange(cardNumber) === "default" ? (
                    <p className="font-medium text-xl">CREDIT</p>
                  ) : (
                    <img
                      src={handleIconChange(cardNumber)}
                      alt="Company Card"
                      aria-label="Company Card"
                      className="h-[30px] w-[50px]"
                    />
                  )}
                </div>

                <div className="flex w-12 h-9 bg-gray-200 rounded-lg">
                  <div className="h-full w-1/3 border-e border-gray-400">
                    <div className="h-1/3 border-t border-b border-gray-400 mt-3"></div>
                  </div>
                  <div className="h-full w-1/3 border-e border-gray-400"></div>
                  <div className="h-full w-1/3">
                    <div className="h-1/3 border-t border-b border-gray-400 mt-3"></div>
                  </div>
                </div>

                <div className="flex justify-center mt-8 w-full font-medium">
                  <p className="me-[6px]">
                    {cardNumber[0] ? cardNumber[0] : "*"}
                  </p>
                  <p className="me-[6px]">
                    {cardNumber[1] ? cardNumber[1] : "*"}
                  </p>
                  <p className="me-[6px]">
                    {cardNumber[2] ? cardNumber[2] : "*"}
                  </p>
                  <p className="me-[6px]">
                    {cardNumber[3] ? cardNumber[3] : "*"}
                  </p>

                  <p className="mx-3 tracking-[6px]">****</p>
                  <p className="me-3 tracking-[6px]">****</p>

                  <p className="me-[6px]">
                    {cardNumber[15] ? cardNumber[15] : "*"}
                  </p>
                  <p className="me-[6px]">
                    {cardNumber[16] ? cardNumber[16] : "*"}
                  </p>
                  <p className="me-[6px]">
                    {cardNumber[17] ? cardNumber[17] : "*"}
                  </p>
                  <p className="me-[6px]">
                    {cardNumber[18] ? cardNumber[18] : "*"}
                  </p>
                </div>

                <div className="fixed bottom-5">
                  <p className="text-[10px] tracking-[5px]">Card Holder</p>
                  <div className="flex">
                    <p
                      className={`text-xs font-bold tracking-[5px] ${
                        !firstName && "text-white/30"
                      }`}
                    >
                      {firstName ? firstName.toUpperCase() : "YOUR"}
                    </p>
                    <p
                      className={`text-xs font-bold tracking-[5px] ${
                        !lastName && "text-white/30"
                      } ms-2`}
                    >
                      {lastName
                        ? lastName.toUpperCase()
                        : firstName
                        ? ""
                        : "NAME"}
                    </p>
                  </div>
                </div>

                <div className="fixed bottom-5 right-5">
                  <p className="text-[10px] tracking-[5px]">Expires</p>
                  <div className="flex">
                    <p
                      className={`text-xs font-bold tracking-[5px] ${
                        !month && "text-white/30"
                      }`}
                    >
                      {month ? (month.length < 2 ? "0" + month : month) : "01"}
                    </p>
                    <p
                      className={`text-xs font-bold tracking-[5px] ${
                        !month && !year && "text-white/30"
                      }`}
                    >
                      /
                    </p>
                    <p
                      className={`text-xs font-bold tracking-[5px] ${
                        !year && "text-white/30"
                      }`}
                    >
                      {year ? year[2] + year[3] : "25"}
                    </p>
                  </div>
                </div>
              </div>

              <div
                className={`absolute w-full h-full bg-gray-800 text-white rounded-2xl transform rotate-y-180 transition-all duration-500 ease-in-out ${
                  !isFlipped ? "backface-hidden opacity-0" : "opacity-100"
                }`}
              >
                <div className="bg-black/80 w-full h-10 mt-6"></div>
                <div className="bg-gray-50 mx-auto w-1/2 h-10 mt-3 rounded-lg text-gray-900 flex items-center justify-center font-bold">
                  <p className="tracking-wide">CVV: </p>
                  <p className="tracking-wide ms-3">{cvv}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden lg:block absolute bottom-40 w-full px-10">
            <div className="grid grid-cols-[2fr,1fr] gap-x-4 gap-y-1 pb-2 border-b-2 border-gray-200">
              <p className="text-gray-500 font-medium">Outband Flight:</p>
              <p className="text-gray-500 font-medium text-end">
                {outboundSeatsPrice.reduce((sum, seat) => sum + seat.price, 0)}$
              </p>
              {returnSeatsPrice && (
                <>
                  <p className="text-gray-500 font-medium">Return Flight:</p>
                  <p className="text-gray-500 font-medium text-end">
                    {returnSeatsPrice.reduce(
                      (sum, seat) => sum + seat.price,
                      0
                    )}
                    $
                  </p>
                </>
              )}
            </div>
            <div className="grid grid-cols-[2fr,1fr] gap-x-4 mt-2">
              <p className="text-gray-800 font-medium">Total:</p>
              <p className="text-gray-800 font-medium text-end">
                {outboundSeatsPrice.reduce((sum, seat) => sum + seat.price, 0) +
                  returnSeatsPrice?.reduce((sum, seat) => sum + seat.price, 0)}
                $
              </p>
            </div>
            <p className="text-xs text-gray-400 text-center mt-2">
              {" "}
              *The prices include 18% VAT
            </p>
          </div>

          <button
            onClick={handleBack}
            className="hidden lg:block absolute bottom-20 left-5 right-5 bg-none border border-gray-800 hover:bg-gray-800 text-gray-800 hover:text-white rounded-2xl p-3 mt-16 transition duration-300 ease-in-out"
          >
            Back
          </button>
          <button
            onClick={handlePayment}
            disabled={isFormComplete}
            className="hidden lg:block absolute bottom-5 left-5 right-5 bg-gray-800 hover:bg-blue-600 disabled:bg-gray-400 text-white rounded-2xl p-3 mt-16 transition duration-300 ease-in-out"
            title={
              isFormComplete ? "All fields must be filled in." : "Pay Button"
            }
          >
            {isLoading ? (
              <div className="flex justify-center items-center">
                <ThreeDots
                  visible={true}
                  height="20"
                  width="70"
                  color="#ffffff"
                  radius="5"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              </div>
            ) : (
              "Pay Now"
            )}
          </button>
        </div>
      </div>
    </section>
  );
};

export default SectionPayment;
