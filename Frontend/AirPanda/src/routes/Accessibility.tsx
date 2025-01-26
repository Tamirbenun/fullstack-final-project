import { FaFont } from "react-icons/fa";
import { RiMarkPenFill } from "react-icons/ri";
import { IoContrastOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { LuPhone } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ScrollToTop from "../components/ScrollToTop";

const Accessibility = () => {
  const [mark, setMark] = useState<boolean>(false);
  const [fontBig, setFontBig] = useState<boolean>(false);
  const [grayscale, setGrayscale] = useState<boolean>(false);

  useEffect(() => {
    ScrollToTop();
  }, []);
  
  const sectionOne = [
    {
      key: "01",
      name: "Text Enlargement",
      description: "An option to increase the text size on all website pages.",
      toggleName: "Larger Font",
      icon: <FaFont className="text-2xl me-2" />,
    },
    {
      key: "02",
      name: "Link Highlighting",
      description: "Special markers for links to make them easier to identify.",
      toggleName: "Marked Links",
      icon: <RiMarkPenFill className="text-2xl me-2" />,
    },
    {
      key: "03",
      name: "Color Adjustment",
      description:
        "A monochrome (black and white) mode to reduce visual strain.",
      toggleName: "Gray Color",
      icon: <IoContrastOutline className="text-2xl me-2" />,
    },
  ];

  const sectionTwo = [
    {
      key: "01",
      description: "The website is navigable via keyboard.",
    },
    {
      key: "02",
      description: "Content is compatible with screen readers.",
    },
    {
      key: "03",
      description:
        "The site has a simple and clear structure, with accessible and easy-to-use menus.",
    },
  ];

  return (
    <>
      <header className="bg-gray-100 rounded-3xl mx-5 md:mx-10 text-center p-10 md:p-20">
        <h1 className="text-3xl md:text-5xl font-medium mb-10">
          Accessibility Statement
        </h1>
        <p>
          AirPanda is committed to providing an accessible browsing experience
          for all its customers, including individuals with disabilities. We
          continuously work to improve the accessibility of our website,
          believing that everyone deserves to use our online services easily and
          conveniently.
        </p>
      </header>

      <main className="p-5 md:p-10 text-center">
        <section id="one" className="mb-32 mt-20">
          <h2 className="text-3xl font-medium mb-2">
            Measures Taken to Ensure Accessibility
          </h2>
          <p className="text-xl">
            The AirPanda website includes accessibility features such as
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-12">
            {sectionOne.map((item) => (
              <div
                key={item.key}
                className="relative bg-gray-100 rounded-3xl p-10 py-20 text-center"
              >
                <p className="absolute right-0 top-0 m-6 text-3xl font-light">
                  {item.key}
                </p>
                <h3 className="text-lg font-medium mb-5">{item.name}</h3>
                <p>{item.description}</p>
                <div className="bg-gray-200 rounded-full px-2 mt-10 font-semibold text-gray-500">
                  <div className="flex justify-between p-3">
                    <div className="flex items-center">
                      {item.icon}
                      <p
                        className={`${
                          (item.key === "01" &&
                            fontBig === true &&
                            "text-lg") ||
                          (item.key === "02" &&
                            mark === true &&
                            "bg-yellow-200") ||
                          (item.key === "03" &&
                            grayscale === true &&
                            "text-black")
                        }`}
                      >
                        {item.toggleName}
                      </p>
                    </div>
                    <label className="switch rounded-full bg-gray-200">
                      <input
                        type="checkbox"
                        onChange={() => {
                          if (item.key === "01") {
                            setFontBig(!fontBig);
                          } else if (item.key === "02") {
                            setMark(!mark);
                          } else if (item.key === "03") {
                            setGrayscale(!grayscale);
                          }
                        }}
                      />
                      <span className="slider round bg-gray-300"></span>
                    </label>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="two" className="my-32">
          <h2 className="text-3xl font-medium mb-2">
            Additional Accessibility Features
          </h2>
          <h3 className="text-xl">
            The AirPanda website includes accessibility features such as
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-10">
            {sectionTwo.map((item) => (
              <div
                key={item.key}
                className="flex items-center text-start bg-gray-100 p-4 rounded-full m-2 w-c"
              >
                <p className="text-3xl font-light mx-2">{item.key}</p>
                <p className="mx-5">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="three" className="my-28">
          <h2 className="text-3xl font-medium mb-5">
            Compliance with Standards
          </h2>
          <p className="text-xl">
            The website is designed to comply with WCAG 2.1 Level AA
            accessibility standards and meets the requirements of the Equal
            Rights for Persons with Disabilities Regulations (Service
            Accessibility Adjustments).
          </p>
        </section>

        <section
          id="four"
          className="bg-gray-100 p-5 pt-10 md:p-10 rounded-3xl"
        >
          <h2 className="text-3xl font-medium mb-5">Further Assistance</h2>
          <p className="text-xl mb-10">
            If you encounter any issues while browsing the website or have
            questions, we are here to help. You can contact our Accessibility
            Coordinator in one of the following ways:
          </p>
          <div className="lg:flex block justify-center items-center bg-gray-200 rounded-2xl p-10 text-center lg:text-left">
            <div className="flex items-center text-xl lg:me-12 mb-4 lg:mb-0 justify-center lg:justify-start">
              <MdOutlineEmail className="text-2xl me-3" />
              <Link
                className="hover:underline"
                to="mailto:accessibility@airpanda.com"
              >
                accessibility@airpanda.com
              </Link>
            </div>
            <div className="flex items-center text-xl justify-center lg:justify-start">
              <LuPhone className="text-2xl me-3" />
              <Link className="hover:underline" to="tel:1-800-123-456">
                1-800-123-456
              </Link>
            </div>
          </div>
          <p className="mt-10">
            ⓘ Telephone assistance through transcription or video call services
            for individuals with hearing impairments.
          </p>
        </section>

        <section id="five" className="my-28">
          <h2 className="text-3xl font-medium mb-5">
            Accessibility Statement Updates
          </h2>
          <p className="text-xl">
            We are committed to updating this accessibility statement whenever
            changes are made to the website or accessibility regulations. Last
            updated on: November 15, 2024.
          </p>
        </section>
      </main>
    </>
  );
};

export default Accessibility;
