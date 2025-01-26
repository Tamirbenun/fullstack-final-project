import { useContext, useEffect, useState } from "react";
import { IoAirplane } from "react-icons/io5";
import { TbEdit } from "react-icons/tb";
import SearchRoundTrip from "../components/home-page/SearchRoundTrip";
import SectionOutboundFlight from "../components/booking-page/SectionOutboundFlight";
import SectionOutboundFlightSeats from "../components/booking-page/SectionOutboundFlightSeats";
import { DataContext } from "../contexts/DataContext";
import SectionReturnFlight from "../components/booking-page/SectionReturnFlight";
import SectionReturnFlightSeats from "../components/booking-page/SectionReturnFlightSeats";
import usePageTransition from "../hooks/usePageTransition";
import SectionPassengers from "../components/booking-page/SectionPassengers";
import SectionOverview from "../components/booking-page/SectionOverview";
import SectionPayment from "../components/booking-page/SectionPayment";

interface SearchData {
  from: string;
  to: string;
  startDate: string;
  endDate: string;
  passengers: number;
}

const Booking = () => {
  const searchData: SearchData = JSON.parse(
    localStorage.getItem("searchData") || "{}"
  ) as SearchData;
  const searchSwitch = localStorage.getItem("SearchSwitch");
  const [search, setSearch] = useState<boolean>(false);
  const { progressStage, setProgressStage } = useContext(DataContext);

  usePageTransition(() => {});

  useEffect(() => {
    localStorage.setItem("progressStage", progressStage);
  }, [progressStage]);

  useEffect(() => {
    return () => {
      setProgressStage("OutboundFlight");
    };
  }, [setProgressStage]);

  let searchDataObject: SearchData | null = null;

  if (searchData) {
    try {
      searchDataObject = searchData;
    } catch (error) {
      console.error("Error parsing JSON:", error);
      searchDataObject = null;
    }
  } else {
    searchDataObject = null;
  }

  const handleEditSearch = () => {
    if (!search) {
      setSearch(true);
    } else if (search) {
      setSearch(false);
    }
  };

  return (
    <main className="p-5 md:p-0 md:px-10 md:pb-10 max-w-[1600px] mx-auto">
      <section className="mb-8">
        <div className="bg-gray-100 rounded-3xl p-3">
          <div
            className={`relative md:flex items-center gap-10 bg-white rounded-2xl ${
              search && "rounded-b-none"
            } p-8 py-10 md:p-5 md:px-7`}
          >
            <div className="flex items-center justify-between md:gap-10">
              <div>
                <p className="text-base text-gray-300 -mb-1">From</p>
                <p className="text-3xl font-medium text-darkblue">
                  {searchDataObject?.from}
                </p>
              </div>
              <IoAirplane className="text-xl mt-5 text-gray-300" />
              <div>
                <p className="text-base text-gray-300 -mb-1">To</p>
                <p className="text-3xl font-medium text-darkblue">
                  {searchDataObject?.to}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between mt-5 md:mt-0 md:gap-10">
              <div>
                <p className="text-base text-gray-300 -mb-1">Departure</p>
                <p className="text-3xl font-medium text-darkblue">
                  {searchDataObject?.endDate
                    ? new Date(searchDataObject?.startDate).toLocaleDateString(
                        "en",
                        {
                          day: "2-digit",
                          month: "short",
                        }
                      )
                    : "Date unavailable"}
                </p>
              </div>
              <div>
                <p className="text-base text-gray-300 -mb-1">Return</p>
                <p className="text-3xl font-medium text-darkblue">
                  {searchDataObject?.endDate
                    ? new Date(searchDataObject?.endDate).toLocaleDateString(
                        "en",
                        {
                          day: "2-digit",
                          month: "short",
                        }
                      )
                    : "Date unavailable"}
                </p>
              </div>
              <div>
                <p className="text-base text-gray-300 -mb-1 w-[60px]">Seats</p>
                <p className="text-3xl font-medium text-darkblue">
                  {searchDataObject?.passengers}
                </p>
              </div>
            </div>
            <button
              className="absolute end-0 md:end-3 top-0 md:top-auto m-3 md:m-5 text-hover-darkblue"
              onClick={handleEditSearch}
            >
              <TbEdit className="text-2xl md:text-3xl text-gray-300" />
            </button>
          </div>
          <SearchRoundTrip />
        </div>
      </section>

      {progressStage === "OutboundFlight" && <SectionOutboundFlight />}
      {progressStage === "OutboundFlightSeats" && (
        <SectionOutboundFlightSeats />
      )}
      {progressStage === "ReturnFlight" && <SectionReturnFlight />}
      {progressStage === "ReturnFlightSeats" && <SectionReturnFlightSeats />}
      {progressStage === "Passengers" && <SectionPassengers />}
      {progressStage === "Overview" && <SectionOverview />}
      {progressStage === "Payment" && <SectionPayment />}
    </main>
  );
};

export default Booking;
