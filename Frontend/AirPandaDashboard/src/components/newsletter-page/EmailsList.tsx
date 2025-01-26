import { MutatingDots } from "react-loader-spinner";
import NewsletterModal from "./NewsletterModal";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../contexts/DataContext";
import { getAllEmails } from "../../services/newsletter-service";
import { FiSearch } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { AiOutlineDelete } from "react-icons/ai";
import { MdAlternateEmail } from "react-icons/md";

interface Email {
  email: string;
  joiningDate: Date;
}

const EmailsList = () => {
  const [emails, setEmails] = useState<Email[]>([]);
  const [filteredEmails, setFilteredEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [action, setAction] = useState<string>("");
  const { setEmailSelected } = useContext(DataContext);

  const fetchEmails = async () => {
    setLoading(true);
    try {
      const response = await getAllEmails();
      setEmails(response.data);
      setFilteredEmails(response.data);
    } catch (error) {
      console.error("Error fetching Emails:", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      fetchEmails();
    }
  }, [isOpen]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearch(query);

    const filter = emails.filter((e) => e.email.toLowerCase().includes(query));
    setFilteredEmails(filter);
  };

  const handleClear = () => {
    setSearch("");
    setFilteredEmails(emails);
  };

  const handleDelete = (email: string) => {
    setEmailSelected(email);
    setAction("delete");
    setIsOpen(true);
  };

  const handleAddEmail = () => {
    setAction("add");
    setIsOpen(true);
  };
  return (
    <div className="transition-all duration-500 ease-in-out dark:bg-[#212121] dark:text-white/60 md:h-screen px-3 md:px-10 pt-5 h-screen">
      <div className="lg:flex items-center justify-between">
        <div className="flex">
          <p className="text-xl font-semibold">
            {search ? "Matches" : "All Users"}
          </p>
          <p className="ms-2 text-xl font-medium text-gray-400">
            {filteredEmails ? filteredEmails.length.toString() : "0"}
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
            onClick={() => handleAddEmail()}
          >
            <p className="w-[16px] md:w-auto md:me-1">+</p>
            <p>Add Email</p>
          </button>
        </div>
      </div>

      <hr className="mt-5 opacity-0" />

      {!loading ? (
        filteredEmails?.length > 0 ? (
          <table className="table-auto border-collapse text-left w-full">
            <thead className="font-normal">
              <tr className="transition-colors duration-500 ease-in-out dark:bg-[#2f2f2f] dark:text-white/60 bg-gray-100 text-sm text-gray-400 h-8">
                <th className="text-start rounded-s-lg ps-4">Email</th>
                <th className="text-start hidden md:table-cell">
                  Joining Date
                </th>
                <th className="text-start rounded-e-lg">Actions</th>
              </tr>
            </thead>
            <tbody className="rounded-xl overflow-hidden">
              {filteredEmails?.map((e) => (
                <tr
                  key={e.email}
                  className="dark:border-[#5c5c5c] hover:bg-gray-50 dark:hover:bg-[#242424] border-b"
                >
                  <td className="flex items-center gap-4 p-4">{e.email}</td>
                  <td className="hidden md:table-cell">
                    {e.joiningDate.toString()}
                  </td>
                  <td className="h-full">
                    <button
                      className="p-2 dark:hover:text-red-300 hover:text-red-500"
                      onClick={() => handleDelete(e.email)}
                    >
                      <AiOutlineDelete className="text-lg" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <>
            <table className="table-auto border-collapse text-left w-full">
              <thead>
                <tr className="transition-colors duration-500 ease-in-out dark:bg-[#2f2f2f] dark:text-white/60 bg-gray-100 text-sm text-gray-400 h-8">
                  <th className="text-start rounded-s-lg ps-4">Email</th>
                  <th className="text-start hidden md:table-cell">
                    Joining Date
                  </th>
                  <th className="text-start rounded-e-lg">Actions</th>
                </tr>
              </thead>
            </table>

            <div className="text-center mt-10 transition-colors duration-500 ease-in-out dark:text-white/20 text-gray-200">
              <div className="flex justify-center">
                <MdAlternateEmail className="text-8xl" />
              </div>
              <p className="text-lg mt-4">No users to show</p>
            </div>
          </>
        )
      ) : (
        <>
          <table className="table-auto border-collapse text-left w-full">
            <thead>
              <tr className="transition-colors duration-500 ease-in-out dark:bg-[#2f2f2f] dark:text-white/60 bg-gray-100 text-sm text-gray-400 h-8">
                <th className="text-start rounded-s-lg ps-4">Email</th>
                <th className="text-start hidden md:table-cell">
                  Joining Date
                </th>
                <th className="text-start rounded-e-lg">Actions</th>
              </tr>
            </thead>
          </table>

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
        </>
      )}
      <NewsletterModal isOpen={isOpen} setIsOpen={setIsOpen} action={action} />
    </div>
  );
};

export default EmailsList;
