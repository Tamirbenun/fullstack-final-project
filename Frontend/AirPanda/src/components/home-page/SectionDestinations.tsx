import { useEffect, useState } from "react";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import DestinationsPlaceHolder from "./DestinationsPlaceHolder";
import { getAllDestinations } from "../../services/destinations-service";
import imgPlaceHolder from "../../assets/images/destinations-images/img-placeholder.svg";

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
  image: string;
}

const SectionDestinations = () => {
  const [destinatons, setDestinatons] = useState<Destinaton[]>([]);
  const [destinatonsGroup, setDestinatonsGroup] = useState<Destinaton[]>([]);
  const [navigatCard, setNavigatCard] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [btnFocus, setBtnFocus] = useState<number>(0);

  useEffect(() => {
    getAllDestinations()
      .then((response) => {
        if (response.data && response.data.length > 0) {
          const updatedArray = [...response.data];
          updatedArray.shift();
          setDestinatons(updatedArray);
          setDestinatonsGroup(updatedArray.slice(0, 3));
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(true);
      });
  }, []);

  const handleDestinationsGroup = (startIndex: number) => {
    setDestinatonsGroup(destinatons.slice(startIndex, startIndex + 3));
    setBtnFocus(startIndex);
  };

  const generatorButtons = () => {
    const buttonCount = Math.ceil(destinatons.length / 3);

    const buttons = [];

    for (let b = 0; b < buttonCount; b++) {
      const startIndex = b * 3;

      buttons.push(
        <button
          key={b}
          onClick={() => handleDestinationsGroup(startIndex)}
          className={`rounded-full px-3 py-1 bg-gray-200 hover:bg-gray-400 focus:underline-offset-0 ${
            btnFocus === startIndex && "bg-gray-500"
          }`}
        ></button>
      );
    }
    return buttons;
  };

  const handleDestinations = (dir: string): void => {
    if (dir === "next") {
      if (navigatCard < destinatons?.length - 1) {
        setNavigatCard(navigatCard + 1);
      }
    } else if (dir === "back") {
      if (navigatCard > 0) {
        setNavigatCard(navigatCard - 1);
      }
    }
  };

  return (
    <div className="px-4 lg:px-0 w-full">
      <div>
        <div className="text-center mb-8 lg:mb-10">
          <p className="tracking-[8px] text-xl font-light ms-0.5 mb-1">
            EXPLORE
          </p>
          <h2 className="text-5xl font-medium">Our destinations</h2>
        </div>

        <div className="hidden lg:flex justify-between gap-4 xl:gap-12 w-full">
          {!isLoading ? (
            destinatonsGroup?.map((d) => (
              <div
                key={d.id}
                className="flex-1 rounded-3xl border overflow-hidden"
              >
                <div className="w-full h-80">
                  <img
                    src={d.image ? d.image : imgPlaceHolder}
                    alt={d.city}
                    className="w-full h-full rounded-t-3xl object-cover mx-auto"
                  />
                </div>

                <div className="buttom p-6">
                  <p className="text-2xl font-medium">{d.city}</p>
                  <div className="flex mt-2">
                    <p className="text-xl font-medium">From 300$</p>
                    <p className="text-sm mt-1.5">/per person</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <DestinationsPlaceHolder screen="big" />
          )}
        </div>

        {Array.isArray(destinatons) && destinatons.length !== 0 ? (
          <div className="lg:hidden">
            <div className="flex-1 rounded-3xl border overflow-hidden">
              <div className="w-full h-80">
                <img
                  src=""
                  alt="Larnaca"
                  className="w-full h-full rounded-t-3xl object-cover mx-auto"
                />
              </div>

              <div className="buttom p-6">
                <p className="text-2xl font-medium">
                  {destinatons[navigatCard]?.city}
                </p>
                <div className="flex mt-2">
                  <p className="text-xl font-medium">300$</p>
                  <p className="text-sm mt-1.5">/per person</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-4">
              <button
                className="m-3 p-2 bg-gray-100 rounded-full w-[35px] h-[35px]"
                onClick={() => handleDestinations("back")}
              >
                <MdArrowBackIos
                  className={`ms-1 ${navigatCard === 0 && "text-gray-300"}`}
                />
              </button>
              <button
                className="m-3 p-2 bg-gray-100 rounded-full w-[35px] h-[35px]"
                onClick={() => handleDestinations("next")}
              >
                <MdArrowForwardIos
                  className={`ms-0.5 ${
                    navigatCard === destinatons?.length - 1 && "text-gray-300"
                  }`}
                />
              </button>
            </div>
          </div>
        ) : (
          <DestinationsPlaceHolder screen="small" />
        )}
      </div>

      <div className="hidden lg:flex justify-center items-center pt-10 gap-2">
        {destinatons && generatorButtons()}
      </div>
    </div>
  );
};

export default SectionDestinations;
