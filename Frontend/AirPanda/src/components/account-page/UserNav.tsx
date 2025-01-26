import { useContext } from "react";
import { MdAirplaneTicket } from "react-icons/md";
import { RiNotification3Fill } from "react-icons/ri";
import { TbUserFilled } from "react-icons/tb";
import { DataContext } from "../../contexts/DataContext";

const pages = [
  { name: "Profile", icon: <TbUserFilled />, link: "profile" },
  {
    name: "Notifications",
    icon: <RiNotification3Fill />,
    link: "notifications",
  },
  { name: "Tickets", icon: <MdAirplaneTicket />, link: "tickets" },
];

const UserNav = () => {
  const { setAccountView, accountView } = useContext(DataContext);
  return (
    <div className="rounded-3xl bg-gray-100 p-10">
      {pages.map((p) => (
        <button
          key={p.name}
          className={`transition-all duration-500 ease-in-out flex items-center gap-2 text-start rounded-2xl px-4 py-3 w-full hover:bg-gray-300 text-black/60 my-1 ${
            accountView === p.link && "bg-gray-200"
          }`}
          onClick={() => setAccountView(p.link)}
        >
          <p className="">{p.icon}</p>
          <p className="">{p.name}</p>
        </button>
      ))}
    </div>
  );
};

export default UserNav;
