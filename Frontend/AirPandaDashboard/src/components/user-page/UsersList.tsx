import { useContext, useEffect, useState } from "react";
import { getAllUsers } from "../../services/user-service";
import { IoClose, IoFilter } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import { RiUserForbidLine } from "react-icons/ri";
import { MutatingDots } from "react-loader-spinner";
import { AiOutlineDelete } from "react-icons/ai";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import UserModal from "./UserModal";
import { DataContext } from "../../contexts/DataContext";
import { GrView } from "react-icons/gr";

interface User {
  id: string;
  userName: string;
  email: string;
  image: string;
  role: string;
}

const UsersList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [action, setAction] = useState<string>("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const { setView, setUserSelected } = useContext(DataContext);
  const img00: string = "https://i.postimg.cc/hPx0tY04/avatar-00.jpg";

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await getAllUsers();
      setUsers(response.data);
      setFilteredUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      fetchUsers();
    }
  }, [isOpen]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    let filterOne: User[];

    if (roleFilter === "all") {
      filterOne = users;
    } else {
      filterOne = users.filter((user) => user.role.includes(roleFilter));
    }

    const query = event.target.value.toLowerCase();
    setSearch(query);

    const filterTwo = filterOne.filter(
      (user) =>
        user.userName.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
    );
    setFilteredUsers(filterTwo);
  };

  const handleClear = () => {
    setSearch("");
    setFilteredUsers(users);
  };

  const filterRole = () => {
    let filter: User[];

    if (users) {
      if (roleFilter === "all") {
        filter = users;
      } else {
        filter = users.filter((user) => user.role.includes(roleFilter));
      }
      setSearch("");
      setFilteredUsers(filter);
    }
  };

  useEffect(() => {
    filterRole();
  }, [roleFilter]);

  const handleView = (id: string, name: string) => {
    const userSelected: string[] = [id, name];
    setUserSelected(userSelected);
    setView("UserView");
  };

  const handleDelete = (id: string, name: string) => {
    const userSelected: string[] = [id, name];
    localStorage.setItem("userSelected", JSON.stringify(userSelected));
    setAction("delete");
    setIsOpen(true);
  };

  const handleAddUser = () => {
    setAction("register");
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
            {filteredUsers ? filteredUsers.length.toString() : "0"}
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

          <Menu as="div" className="relative mt-2 lg:mt-0">
            <div>
              <MenuButton className="relative flex justify-center transition-colors duration-500 ease-in-out dark:border-[#9a9a9a] border items-center rounded-lg p-1.5 px-2 text-sm font-medium dark:text-[#9a9a9a] dark:hover:border-white dark:hover:text-white text-gray-400 hover:text-gray-500 hover:border-gray-500 gap-2 w-full">
                <span className="absolute -inset-1.5" />
                <span className="sr-only">Open user menu</span>
                <IoFilter className=" text-[16px]" />
                <p>Filter</p>
              </MenuButton>
            </div>
            <MenuItems
              transition
              className="absolute right-0 z-10 mt-2 w-full lg:w-48 origin-top-right rounded-xl bg-white dark:bg-[#242424] dark:ring-white/60 py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
              <MenuItem>
                <button
                  className={`w-full ${
                    roleFilter === "all" && "bg-gray-100 dark:bg-[#545454]"
                  } hover:bg-gray-100 dark:hover:bg-[#545454]`}
                  onClick={() => setRoleFilter("all")}
                >
                  All Users
                </button>
              </MenuItem>
              <MenuItem>
                <button
                  className={`w-full ${
                    roleFilter === "member" && "bg-gray-100 dark:bg-[#545454]"
                  } hover:bg-gray-100 dark:hover:bg-[#545454]`}
                  onClick={() => setRoleFilter("member")}
                >
                  Member Only
                </button>
              </MenuItem>
              <MenuItem>
                <button
                  className={`w-full ${
                    roleFilter === "admin" && "bg-gray-100 dark:bg-[#545454]"
                  } hover:bg-gray-100 dark:hover:bg-[#545454]`}
                  onClick={() => setRoleFilter("admin")}
                >
                  Admins Only
                </button>
              </MenuItem>
            </MenuItems>
          </Menu>

          <button
            className="transition-colors duration-500 ease-in-out border mt-2 lg:mt-0 flex justify-center items-center rounded-lg p-1.5 px-2 text-sm font-medium hover:border-blue-500 hover:text-blue-500 dark:hover:border-blue-200 dark:hover:text-blue-200 text-blue-400 border-blue-400 w-full lg:w-auto"
            onClick={() => handleAddUser()}
          >
            <p className="w-[16px] md:w-auto md:me-1">+</p>
            <p>Add User</p>
          </button>
        </div>
      </div>

      <hr className="mt-5 opacity-0" />

      {!loading ? (
        filteredUsers?.length > 0 ? (
          <table className="table-auto border-collapse text-left w-full">
            <thead className="font-normal">
              <tr className="transition-colors duration-500 ease-in-out dark:bg-[#2f2f2f] dark:text-white/60 bg-gray-100 text-sm text-gray-400 h-8">
                <th className="text-start rounded-s-lg ps-4">User Name</th>
                <th className="text-start hidden md:table-cell">Email</th>
                <th className="text-start">Role</th>
                <th className="text-start rounded-e-lg">Actions</th>
              </tr>
            </thead>
            <tbody className="rounded-xl overflow-hidden">
              {filteredUsers?.map((u) => (
                <tr
                  key={u.id}
                  className="dark:border-[#5c5c5c] hover:bg-gray-50 dark:hover:bg-[#242424] border-b"
                >
                  <td className="flex items-center gap-4 p-4">
                    <img
                      className="h-[35px] dark:opacity-90 rounded-full"
                      src={u.image[0] === "h" ? u.image : img00}
                      alt="profil img"
                    />
                    {u.userName}
                  </td>
                  <td className="hidden md:table-cell">{u.email}</td>
                  <td>
                    <p
                      className={`w-[80px] p-1 text-xs text-center font-meium border rounded-full ${
                        u.role === "admin" &&
                        "border-[#ab996d] bg-[#fff5dd] text-[#ab996d] dark:bg-[#fff5dd]/20"
                      } ${
                        u.role === "member" &&
                        "border-blue-400 bg-blue-50 text-blue-400 dark:bg-blue-50/20"
                      }`}
                    >
                      {u.role}
                    </p>
                  </td>
                  <td className="h-full">
                    <button
                      className="me-2 p-2 dark:hover:text-blue-300 hover:text-blue-500"
                      onClick={() => handleView(u.id, u.userName)}
                    >
                      <GrView />
                    </button>

                    <button
                      className={`p-2 dark:hover:text-red-300 hover:text-red-500 ${
                        u.role === "admin" && "hidden"
                      }`}
                      onClick={() => handleDelete(u.id, u.userName)}
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
                <tr className="transition-colors duration-500 ease-in-out dark:bg-[#2f2f2f] dark:text-white/60  bg-gray-100 text-sm font-medium text-gray-400 h-8">
                  <th className="text-start rounded-s-lg ps-4">User Name</th>
                  <th className="text-start hidden md:table-cell">Email</th>
                  <th className="text-start rounded-e-lg">Actions</th>
                </tr>
              </thead>
            </table>

            <div className="text-center mt-10 transition-colors duration-500 ease-in-out dark:text-white/20 text-gray-200">
              <div className="flex justify-center">
                <RiUserForbidLine className="text-8xl" />
              </div>
              <p className="text-lg mt-4">No users to show</p>
            </div>
          </>
        )
      ) : (
        <>
          <table className="table-auto border-collapse text-left w-full">
            <thead>
              <tr className="transition-colors duration-500 ease-in-out dark:bg-[#2f2f2f] dark:text-white/60  bg-gray-100 text-sm font-medium text-gray-400 h-8">
                <th className="text-start rounded-s-lg ps-4">User Name</th>
                <th className="text-start hidden md:table-cell">Email</th>
                <th className="text-start">Role</th>
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
      <UserModal isOpen={isOpen} setIsOpen={setIsOpen} action={action} />
    </div>
  );
};

export default UsersList;
