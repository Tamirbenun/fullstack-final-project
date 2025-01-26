import { NavLink } from "react-router-dom";

const ConnectionButtons = () => {
  return (
    <>
      <NavLink to="/register">
        <button className="btn-register rounded-full p-2 ps-3 pe-3 me-2 hover:bg-gray-200">
          Register
        </button>
      </NavLink>
      <NavLink to="/login">
        <button className="button p-2 ps-3 pe-3 rounded-full hover:ring-4 ring-blue-400/30">
          Login
        </button>
      </NavLink>
    </>
  );
};

export default ConnectionButtons;
