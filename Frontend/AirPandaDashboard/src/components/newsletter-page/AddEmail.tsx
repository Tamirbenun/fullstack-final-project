import React, { useState } from "react";
import Swal from "sweetalert2";
import { postEmail } from "../../services/newsletter-service";

interface Email {
  email: string;
  joiningDate: Date;
}

const AddEmail = ({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleEmailChange = (e) => {
    const value = e.target.value;

    if (regex.test(value)) {
      setEmail(value);
      setError(false);
    } else {
      setEmail(value);
      if (value.length > 2) {
        setError(true);
      }
    }

    if (!value) {
      setError(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !regex.test(email)) {
      return Swal.fire({
        title: "",
        text: "The email field is empty.",
        icon: "warning",
        confirmButtonText: "Ok",
        customClass: {
          popup: "custom-swal",
          confirmButton: "custom-confirm-button",
        },
      });
    }

    const now = new Date();
    const isoWithoutMilliseconds = now.toISOString().split(".")[0] + "Z";
    const dateTime = new Date(isoWithoutMilliseconds);

    const newEmail: Email = {
      email: email,
      joiningDate: dateTime,
    };

    try {
      const response = await postEmail(newEmail);
      console.log(response);
      if (!response.data.error) {
        Swal.fire({
          title: "Success",
          text: `${email} Added successfully`,
          icon: "success",
          confirmButtonText: "Ok",
          customClass: {
            popup: "custom-swal",
            confirmButton: "custom-confirm-button",
          },
        }).then((result) => {
          if (result.isConfirmed) {
            setIsOpen(false);
          }
        });
      } else if (response.data) {
        Swal.fire({
          title: "Error",
          text: response.data,
          icon: "error",
          confirmButtonText: "Ok",
          customClass: {
            popup: "custom-swal",
            confirmButton: "custom-confirm-button",
          },
        });
      }
    } catch (error) {
      console.error("Error add email:", error);
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
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="">
        <label htmlFor="emailAddress" className="sr-only">
          Email Address
        </label>
        <input
          id="emailAddress"
          type="email"
          value={email}
          onChange={handleEmailChange}
          maxLength={50}
          minLength={2}
          className={`transition-border duration-500 ease-in-out w-full p-3 rounded-2xl border border-gray-400 bg-white text-black dark:text-white/60 dark:bg-[#181818] dark:border-white/60 disabled:border-none dark:disabled:border-none disabled:bg-gray-100 dark:disabled:bg-[#2f2f2f] disabled:text-gray-400 dark:disabled:text-white/30 focus:outline-none focus:bg-blue-50 ps-8 ${
            error && "border-red-400 bg-red-50 focus:bg-red-50"
          } ${
            regex.test(email) &&
            "border-green-400 bg-green-50 focus:bg-green-50"
          }`}
        />
      </div>

      <div className="flex justify-center gap-2 mt-8">
        <button
          className="rounded-2xl p-2 text-black bg-gray-300 hover:bg-gray-400 dark:text-black/60 dark:bg-white/40 dark:hover:bg-white/60"
          type="button"
          onClick={() => setIsOpen(false)}
        >
          Cancel
        </button>
        <button
          className="rounded-2xl py-2 px-5 bg-blue-500 hover:bg-blue-600 text-white disabled:bg-gray-400"
          type="submit"
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default AddEmail;
