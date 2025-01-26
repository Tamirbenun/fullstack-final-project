import { useState } from "react";
import { postEmail } from "../../services/newsletter-service";
import { MdErrorOutline } from "react-icons/md";

interface Email {
  email: string;
  joiningDate: Date;
}

const SectionNewsletter = () => {
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubscribe = async (e) => {
    e.preventDefault();

    if (!email) {
      setErrorMessage("Email is required");
      return;
    }

    setIsLoading(true);
    setMessage("");
    setErrorMessage("");

    const now = new Date();
    const isoWithoutMilliseconds = now.toISOString().split(".")[0] + "Z";
    const dateTime = new Date(isoWithoutMilliseconds);

    const newEmail: Email = {
      email: email,
      joiningDate: dateTime,
    };

    await postEmail(newEmail)
      .then((response) => {
        setIsLoading(false);
        if (response.data !== undefined) {
          setMessage("Subscribed successfully!");
        } else {
          setErrorMessage("Oops, something went wrong. Please try again.");
        }
      })
      .catch((error) => {
        setErrorMessage(error);
        setTimeout(() => {
          setErrorMessage("");
        }, 10000);
      })
      .finally(() => {
        setTimeout(() => {
          setMessage("");
          setErrorMessage("");
        }, 10000);
      });
  };

  return (
    <div className="bg-gray-100 md:rounded-3xl p-10 md:p-20 text-center">
      <h3 className="text-5xl text-black mb-5 font-medium leading-snug">
        Subscribe newsletter & <br className="hidden lg:block" /> get letest
        news
      </h3>
      <form
        onSubmit={handleSubscribe}
        className="flex justify-center h-11 mt-10"
      >
        <div className="flex bg-white rounded-xl w-full md:w-[400px]">
          <label htmlFor="email" className="sr-only">
            Enter your Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-s-xl ps-4 pe-8 h-full w-full focus:outline-none"
          />
          <button
            type="submit"
            className={`bg-blue-700 text-white font-medium rounded-xl px-3 -ms-3 disabled:bg-gray-300 disabled:hover:bg-none transition-transform duration-300 transform hover:bg-blue-800 focus:outline-none disabled:text-gray-500`}
            disabled={isLoading}
          >
            {isLoading ? "Subscribe..." : "Subscribe"}
          </button>
        </div>
      </form>
      <p className="text-green-500 mt-3">{message}</p>
      {errorMessage && (
        <div className="flex justify-center items-center">
          <MdErrorOutline className="text-red-500" />
          <p className="text-red-500 ms-2">{errorMessage}</p>
        </div>
      )}
    </div>
  );
};

export default SectionNewsletter;
