import "../css/Footer.css";
import logo from "../assets/logo.svg";
import { Link, NavLink } from "react-router-dom";

const Footer = () => {
  const navigationPublic = [
    { name: "Home", to: "/" },
    { name: "Contact Us", to: "/contact" },
    { name: "About", to: "/about" },
    { name: "Accessibility Statment", to: "/accessibility" },
  ];

  return (
    <footer className="p-20 text-black/50">
      <div className="lg:flex justify-center lg:justify-between">
        <div className="flex justify-center lg:justify-start mb-10 lg:mb-0">
          <img alt="airpanda logo" src={logo} className="h-8  footer-logo" />
        </div>

        <div className="text-center lg:text-start mt-1 gap-5">
          {navigationPublic.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              className="mx-5 my-5 sm:my-0 font-semibold text-hover-darkblue block sm:inline"
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      </div>

      <hr className="my-8 border-gray-200" />

      <div className="text-center">
        <p className="">
          © 2024 AirPanda. Designed and Developed by{" "}
          <Link
            target="_blank"
            rel="noopener noreferrer"
            to="https://www.linkedin.com/in/tamir-benun-222a4127a"
            className="text-hover-darkblue"
          >
            [Tamir Benun]
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
