import { useEffect, useState } from "react";
import ScrollToTop from "../components/ScrollToTop";
import { FaPaperPlane } from "react-icons/fa";
import { PiPhoneFill } from "react-icons/pi";
import { FaLocationDot } from "react-icons/fa6";
import Swal from "sweetalert2";
import { postEmail } from "../services/email-service";
import { ThreeDots } from "react-loader-spinner";

interface Email {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactUs = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    ScrollToTop();
  }, []);

  const handleNameChange = (e) => {
    const value = e.target.value;
    const regex = /^[a-zA-Z]*$/;
    if (regex.test(value)) {
      setName(value);
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
  };

  const handleSubjectChange = (e) => {
    const value = e.target.value;
    setSubject(value);
  };

  const handleMessageChange = (e) => {
    const value = e.target.value;
    setMessage(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    const newMail: Email = {
      name: name,
      email: email,
      subject: subject,
      message: message,
    };

    try {
      const response = await postEmail(newMail);
      if (response.data) {
        Swal.fire({
          title: "success",
          text: "Message sent successfully",
          icon: "success",
          confirmButtonText: "Ok",
          customClass: {
            popup: "custom-swal",
            confirmButton: "custom-confirm-button",
          },
        });
        setLoading(false);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      Swal.fire({
        title: "Error",
        text: error,
        icon: "error",
        confirmButtonText: "Ok",
        customClass: {
          popup: "custom-swal",
          confirmButton: "custom-confirm-button",
        },
      });
      setLoading(false);
    }
  };

  return (
    <main className="p-10 grid grid-cols-1 md:grid-cols-2">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 p-10">
        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            maxLength={20}
            minLength={2}
            placeholder="Enter your name"
            required
            onChange={handleNameChange}
            className="transition-border duration-500 ease-in-out w-full p-3 rounded-2xl border border-gray-400 bg-white ocus:outline-none focus:bg-blue-50 mt-2"
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            maxLength={20}
            minLength={5}
            placeholder="Enter your email"
            required
            onChange={handleEmailChange}
            className="transition-border duration-500 ease-in-out w-full p-3 rounded-2xl border border-gray-400 bg-white ocus:outline-none focus:bg-blue-50 mt-2"
          />
        </div>

        <div>
          <label htmlFor="subject">Subject</label>
          <input
            id="subject"
            type="text"
            value={subject}
            maxLength={20}
            minLength={2}
            placeholder="Enter your name"
            required
            onChange={handleSubjectChange}
            className="transition-border duration-500 ease-in-out w-full p-3 rounded-2xl border border-gray-400 bg-white ocus:outline-none focus:bg-blue-50 mt-2"
          />
        </div>

        <div>
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            value={message}
            onChange={handleMessageChange}
            placeholder="Write your message here"
            required
            className="transition-border duration-500 ease-in-out w-full p-3 rounded-2xl border border-gray-400 bg-white ocus:outline-none focus:bg-blue-50 mt-2"
          ></textarea>
        </div>

        <button
          type="submit"
          className="p-3 rounded-2xl bg-darkblue hover:bg-blue-500 text-white disabled:bg-green-400"
          disabled={loading}
        >
          {!loading ? (
            "Send Message"
          ) : (
            <div className="flex justify-center items-center">
              <ThreeDots
                visible={true}
                height="25"
                width="50"
                color="#ffffff"
                radius="9"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            </div>
          )}
        </button>
      </form>

      <div className="rounded-3xl bg-gray-100">
        <div className="px-10 pt-10 pb-3 grid grid-cols-1 gap-2">
          <h1 className="text-3xl md:text-5xl font-medium text-center mb-5">
            Contact Us
          </h1>
          <div className="flex items-center gap-2">
            <PiPhoneFill />
            <p>077-56546846</p>
          </div>
          <div className="flex items-center gap-2">
            <FaPaperPlane />
            <p>airpanda.airline@gmail.com</p>
          </div>
          <div className="flex items-center gap-2">
            <FaLocationDot />
            <p>BEN-GURION AIRPORT, Israel</p>
          </div>
        </div>

        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d20494.78626859795!2d34.88346390951797!3d31.997895252038113!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1502caad86c8945b%3A0x54230ad9cc8917e9!2z16DXntecINeU16rXoteV16TXlCDXkdefINeS15XXqNeZ15XXnw!5e0!3m2!1siw!2sil!4v1737834057227!5m2!1siw!2sil"
          className="border w-[95.5%] h-[35vh] rounded-2xl  m-3"
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </main>
  );
};

export default ContactUs;
