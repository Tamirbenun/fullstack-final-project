import { MutatingDots } from "react-loader-spinner";
import { TbMapPinCancel } from "react-icons/tb";
import DestinationsModal from "./DestinationsModal";
import { IoClose } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../contexts/DataContext";
import { getAllDestinations } from "../../services/destinations-service";
import { AiOutlineDelete } from "react-icons/ai";
import { GrView } from "react-icons/gr";

interface Destination {
  id: string;
  city: string;
  country: string;
  airport: string;
  icao: string;
  iata: string;
  flightNumber: string;
  elevationFt: string;
  latitude: string;
  longitude: string;
  timeZone: string;
  image: string;
}

const DestinationsList = () => {
  const { setDestinationSelected } = useContext(DataContext);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [destinationsFiltered, setDestinationsFiltered] = useState<
    Destination[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [action, setAction] = useState<string>("");

  const fetchDestinations = async () => {
    setLoading(true);
    try {
      const response = await getAllDestinations();
      if (response.data) {
        const filteredData = response.data.slice(1);
        setDestinations(filteredData);
        setDestinationsFiltered(filteredData);
      }
    } catch (error) {
      console.error("Error fetching Destinations:", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      fetchDestinations();
    }
  }, [isOpen]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearch(query);

    const filter = destinations.filter(
      (des) =>
        des.city.toLowerCase().includes(query) ||
        des.country.toLowerCase().includes(query) ||
        des.flightNumber.toLowerCase().includes(query) ||
        des.iata.toLowerCase().includes(query) ||
        des.icao.toLowerCase().includes(query)
    );
    setDestinationsFiltered(filter);
  };

  const handleClear = () => {
    setSearch("");
    setDestinationsFiltered(destinations);
  };

  const handleAdd = () => {
    setAction("add");
    setIsOpen(true);
  };

  const handleView = (id: string) => {
    setDestinationSelected(id);
    setAction("view");
    setIsOpen(true);
  };

  const handleDelete = (id: string) => {
    setDestinationSelected(id);
    setAction("delete");
    setIsOpen(true);
  };

  return (
    <div
      className={`transition-all duration-500 ease-in-out dark:bg-[#212121] dark:text-white/60 px-3 md:px-10 pt-5 pb-5 ${
        destinationsFiltered.length > 5 ? "h-full" : "h-screen"
      }`}
    >
      <div className="lg:flex items-center justify-between">
        <div className="flex">
          <p className="text-xl font-semibold">{search ? "Matches" : "All"}</p>
          <p className="ms-2 text-xl font-medium text-gray-400">
            {destinationsFiltered
              ? destinationsFiltered?.length.toString()
              : "0"}
          </p>
        </div>
        <div className="lg:flex gap-2">
          <div className="relative mt-3 lg:mt-0">
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={handleSearch}
              className="transition-all duration-500 ease-in-out w-full ps-8 pe-3 z-0 focus:outline-none border rounded-lg h-[35px] lg:h-full dark:bg-[#212121] border-gray-200 dark:border-white/60 dark:placeholder:text-white/40"
            />
            <FiSearch className="absolute start-2 top-[8px] text-lg text-gray-400 dark:text-white/60" />
            <button
              className={`absolute end-2 top-[8px] text-lg text-gray-400 dark:text-white/60 z-10 ${
                search ? "opacity-100" : "opacity-0"
              }`}
            >
              <IoClose onClick={handleClear} />
            </button>
          </div>

          <button
            className="transition-colors duration-500 ease-in-out border mt-2 lg:mt-0 flex justify-center items-center rounded-lg p-1.5 px-2 text-sm font-medium hover:border-blue-500 hover:text-blue-500 dark:hover:border-blue-200 dark:hover:text-blue-200 text-blue-400 border-blue-400 w-full lg:w-auto"
            onClick={() => handleAdd()}
          >
            <p className="w-[16px] md:w-auto md:me-1">+</p>
            <p>New Destinations</p>
          </button>
        </div>
      </div>

      {!loading ? (
        destinationsFiltered?.length > 0 ? (
          <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
            {destinationsFiltered?.map((d) => (
              <div
                key={d.id}
                className="p-2 rounded-3xl border border-black/8 dark:border-none dark:bg-[#2f2f2f]"
              >
                <div className="relative rounded-2xl h-[200px] overflow-hidden">
                  <div className="z-0">
                    <img
                      src={d.image}
                      alt="image destination"
                      className="absolute inset-0 w-full h-full object-cover dark:opacity-80"
                    />
                  </div>
                </div>
                <div className="w-full p-3">
                  <p className="font-medium text-xl">
                    {d.city}, {d.country}
                  </p>
                  <p className="dark:text-white/40 text-gray-400 text-sm">
                    {d.airport}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2 rounded-2xl bg-gray-100 p-3 text-gray-500 dark:bg-[#3f3f3f] dark:text-white/40 text-sm">
                  <p>IATA: {d.iata}</p>
                  <p>ICAO: {d.icao}</p>
                  <p className="col-span-2">Flight Number: {d.flightNumber}</p>
                  <div className="col-span-2 flex items-center justify-between rounded-2xl bg-gray-200 dark:bg-[#4f4f4f] px-3">
                    <p className="text-xs">Actions:</p>
                    <div className="flex items-center">
                      <button
                        className="p-2 dark:hover:text-yellow-500 hover:text-yellow-500 focus:outline-none"
                        onClick={() => handleView(d.id)}
                      >
                        <GrView className="text-[15px] " />
                      </button>
                      <button
                        className={`p-2 dark:hover:text-red-400 hover:text-red-600 focus:outline-none`}
                        onClick={() => handleDelete(d.id)}
                      >
                        <AiOutlineDelete className="text-lg" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center mt-10 transition-colors duration-500 ease-in-out dark:text-white/20 text-gray-200">
            <div className="flex justify-center">
              <TbMapPinCancel className="text-8xl" />
            </div>
            <p className="text-lg mt-4">No destinations found</p>
          </div>
        )
      ) : (
        <div className="mt-5 h-screen">
          {localStorage.getItem("theme") === "light" ? (
            <div className="flex justify-center mt-10">
              <MutatingDots
                visible={true}
                height="100"
                width="100"
                color="#003268"
                secondaryColor="#003268"
                radius="12.5"
                ariaLabel="mutating-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            </div>
          ) : (
            <div className="flex justify-center mt-10">
              <MutatingDots
                visible={true}
                height="100"
                width="100"
                color="#ffffff"
                secondaryColor="#ffffff"
                radius="12.5"
                ariaLabel="mutating-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            </div>
          )}
        </div>
      )}
      <DestinationsModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        action={action}
        destinations={destinations}
      />
    </div>
  );
};

export default DestinationsList;
