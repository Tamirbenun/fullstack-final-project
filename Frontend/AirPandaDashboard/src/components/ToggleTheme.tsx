import "../css/Toggle.css";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { PiSunDimFill } from "react-icons/pi";
import { MdNightlight } from "react-icons/md";

const ToggleTheme = () => {
  const { theme, toggle } = useContext(ThemeContext);

  return (
    <label className="switch rounded-full border-gray-200 rotate-90 md:rotate-0">
      <input type="checkbox" checked={theme} onChange={toggle} />
      <span
        className={`flex justify-between round border ${
          theme ? "border-white/40 slider-dark" : "slider border-gray-300"
        } p-1.5 transition-colors duration-500 ease-in-out`}
      >
        <PiSunDimFill
          className={`text-xl transition-colors duration-500 ease-in-out ${
            theme ? "text-white/40" : "text-gray-300"
          } hover:text-yellow-200`}
        />
        <MdNightlight
          className={`text-xl transition-colors duration-500 ease-in-out ${
            theme ? "text-white/40" : "text-gray-300"
          } hover:text-purple-700 `}
        />
      </span>
    </label>
  );
};

export default ToggleTheme;
