import { useEffect, useState } from "react";
import { MdOutlineAlternateEmail, MdRefresh } from "react-icons/md";
import { MutatingDots } from "react-loader-spinner";
import { TbFaceIdError } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { getAllEmails } from "../../services/newsletter-service";

const CubeFive = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [countEmails, setCountEmails] = useState<number>(-1);
  const navigate = useNavigate();

  const fetchEmails = async () => {
    setLoading(true);
    try {
      const response = await getAllEmails();
      if (!response.data.error) {
        setCountEmails(response.data.length);
      }
    } catch (error) {
      console.error("Error fetching Emails:", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  const handleRefresh = () => {
    fetchEmails();
  };

  return (
    <div className="relative transition-colors duration-500 ease-in-out dark:bg-[#343434] bg-gray-100 rounded-3xl p-6 min-h-[256px]">
      <div className="flex justify-between items-center gap-3">
        <Link className="text-lg font-semibold" to={"/Newsletter"}>
          Newsletter
        </Link>
        <button
          className="bg-none rounded-full hover:text-white hover:bg-black p-1"
          onClick={handleRefresh}
        >
          <MdRefresh className="text-lg" />
        </button>
      </div>

      {!loading ? (
        countEmails >= 0 ? (
          <>
            <div className="flex justify-center items-center gap-5 text-5xl mt-8 font-medium text-gray-500 dark:text-white/60">
              <MdOutlineAlternateEmail />
              <div className="text-center">
                <p>{countEmails < 10 ? "0" + countEmails : countEmails}</p>
                <p className="text-sm tracking-widest -mt-1.5 ms-1">Emails</p>
              </div>
            </div>

            <div className="absolute bottom-6 w-full -mx-6 px-6">
              <button
                className="transition-colors duration-500 ease-in-out rounded-2xl border border-gray-400 w-full p-3 text-gray-400 hover:text-gray-500 hover:border-gray-500
                 dark:text-white/40 dark:border-white/40 dark:hover:border-white dark:hover:text-white"
                onClick={() => navigate("/Users")}
              >
                Newsletter
              </button>
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center mt-[28px]">
            <div className="text-center">
              <div className="flex justify-center">
                <TbFaceIdError className="text-5xl" />
              </div>
              <p className="font-medium text-xl">Network Error</p>
              <p className="text-sm">
                Plase Check your Network
                <br /> and try again
              </p>
            </div>
          </div>
        )
      ) : (
        <>
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
    </div>
  );
};

export default CubeFive;
