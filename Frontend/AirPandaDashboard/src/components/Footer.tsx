import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="text-center p-5 transition-colors duration-500 ease-in-out dark:bg-[#212121] dark:text-white/60 text-gray-400">
      <p>
        © 2024 AirPanda. Designed and Developed by{" "}
        <Link
          target="_blank"
          rel="noopener noreferrer"
          to="https://www.linkedin.com/in/tamir-benun-222a4127a"
          className="text-hover-darkblue"
        >
          <span className="transition-border duration-500 ease-in-out hover:text-blue-400">
            [Tamir Benun]
          </span>
        </Link>
      </p>
    </footer>
  );
};

export default Footer;
