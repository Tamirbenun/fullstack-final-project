import { useEffect, useState } from "react";
import { MdRefresh } from "react-icons/md";
import { getAllUsers } from "../../services/user-service";
import { MutatingDots } from "react-loader-spinner";
import { TbFaceIdError } from "react-icons/tb";
import { PiUserBold } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";

const CubeThree = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [countUsers, setCountUsers] = useState<number>(-1);
  const navigate = useNavigate();

  const fetchCountUsers = async () => {
    setLoading(true);
    try {
      const response = await getAllUsers();
      if (!response.data.error) {
        setCountUsers(response.data.length);
      }
    } catch (error) {
      console.error("Error fetching flights:", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    fetchCountUsers();
  }, []);

  const handleRefresh = () => {
    fetchCountUsers();
  };

  return (
    <div className="relative transition-colors duration-500 ease-in-out dark:bg-[#343434] bg-gray-100 rounded-3xl p-6 min-h-[256px]">
      <div className="flex justify-between items-center gap-3">
        <Link className="text-lg font-semibold" to={"/Users"}>
          Users
        </Link>
        <button
          className="bg-none rounded-full hover:text-white hover:bg-black p-1"
          onClick={handleRefresh}
        >
          <MdRefresh className="text-lg" />
        </button>
      </div>

      {!loading ? (
        countUsers >= 0 ? (
          <>
            <div className="flex justify-center items-center gap-5 text-5xl mt-8 font-medium text-gray-500 dark:text-white/60">
              <PiUserBold />
              <div className="text-center">
                <p>{countUsers < 10 ? "0" + countUsers : countUsers}</p>
                <p className="text-sm tracking-widest -mt-1.5 ms-1">USERS</p>
              </div>
            </div>

            <div className="absolute bottom-6 w-full -mx-6 px-6">
              <button
                className="transition-colors duration-500 ease-in-out rounded-2xl border border-gray-400 w-full p-3 text-gray-400 hover:text-gray-500 hover:border-gray-500
                 dark:text-white/40 dark:border-white/40 dark:hover:border-white dark:hover:text-white"
                onClick={() => navigate("/Users")}
              >
                User Managment
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

export default CubeThree;
