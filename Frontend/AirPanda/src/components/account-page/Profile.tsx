import { useContext, useEffect, useState } from "react";
import { MdEdit, MdOutlineInfo } from "react-icons/md";
import { MutatingDots } from "react-loader-spinner";
import { DataContext } from "../../contexts/DataContext";
import { getUserById, updateUserById } from "../../services/user-service";
import { IoClose } from "react-icons/io5";
import Swal from "sweetalert2";
import { JwtDecodedID } from "../../services/jwt-service";
import ImgModal from "./ImageModal";

interface User {
  id: string;
  userName: string;
  email: string;
  image: string;
  role: string;
}

const Profile = () => {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState<boolean>(false);
  const [openToEdit, setOpenToEdit] = useState<boolean>(true);
  const [disabledBtn, setDisabledBtn] = useState<boolean>(true);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [firstNameError, setFirstNameError] = useState<string>("");
  const [lastNameError, setLastNameError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [PasswordError, setPasswordError] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");
  const { image, setImage } = useContext(DataContext);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const img00: string = "https://i.postimg.cc/hPx0tY04/avatar-00.jpg";

  const fetchUser = async () => {
    setLoading(true);
    try {
      const response = await getUserById(JwtDecodedID());
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (user) {
      setFirstName(user?.userName?.trim()?.split(" ")[0] || "");
      setLastName(user?.userName?.trim()?.split(" ")[1] || "");
      setEmail(user?.email || "");
      setImage(user?.image || "");
    }
  }, [user]);

  const handleFirstNameChange = (e) => {
    const value = e.target.value;
    setFirstName(value);

    const regex = /^[a-zA-Z]*$/;
    if (!regex.test(value)) {
      setFirstNameError("Only letters A-Z");
    } else {
      setFirstNameError("");
    }
  };

  const handleLastNameChange = (e) => {
    const value = e.target.value;
    setLastName(value);

    const regex = /^[a-zA-Z]*$/;
    if (!regex.test(value)) {
      setLastNameError("Only letters A-Z");
    } else {
      setLastNameError("");
    }
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regex.test(value)) {
      setEmailError("Bad Email!");
    } else {
      setEmailError("");
    }
  };

  const handlePassChange = (event) => {
    const value = event.target.value;
    setPassword(value);

    const regex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

    if (!regex.test(value)) {
      setPasswordError(
        "Password must be: 8-20 characters, one uppercase letter, one lowercase letter, one number, and one special character"
      );
    } else {
      setPasswordError("");
    }
  };

  const handleConfirmPassChange = (event) => {
    const value = event.target.value;
    setConfirmPassword(value);

    if (value !== password) {
      setConfirmPasswordError("Passwords must match");
    } else {
      setConfirmPasswordError("");
    }
  };

  useEffect(() => {
    const validateForm = () => {
      const passwordRegex =
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

      if (!firstName || !lastName || !email || openToEdit) {
        return true;
      }

      if (password && !passwordRegex.test(password)) {
        return true;
      }

      if (confirmPassword !== password) {
        return true;
      }

      return false;
    };

    setDisabledBtn(validateForm());
  }, [firstName, lastName, email, password, confirmPassword, openToEdit]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    interface RequestData {
      userName: string;
      email: string;
      image: string;
      password?: string;
    }

    const userToUpdate: RequestData = {
      userName: firstName + " " + lastName,
      email: email,
      image: image,
    };

    if (password && confirmPassword !== "" && password === confirmPassword) {
      userToUpdate.password = password;
    }
    try {
      const response = await updateUserById(JwtDecodedID(), userToUpdate);
      setUser(response.data);
      if (response.data) {
        Swal.fire({
          title: "success",
          text: "User update successfully",
          icon: "success",
          confirmButtonText: "Ok",
          customClass: {
            popup: "custom-swal",
            confirmButton: "custom-confirm-button",
          },
        });
      }
    } catch (error) {
      console.error("Error fetching users:", error);
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

    fetchUser();
    setOpenToEdit(true);
  };

  const handleEdit = () => {
    setOpenToEdit(!openToEdit);
    setFirstNameError("");
    setLastNameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    if (!openToEdit) {
      fetchUser();
    }
  };

  return (
    <>
      {!loading ? (
        <div className="relative flex-1 px-10 pt-10">
          <button
            className={`transition-border duration-500 ease-in-out absolute right-0 rounded-full border ${
              openToEdit
                ? "border-blue-500 hover:bg-blue-500 text-blue-500"
                : "border-red-500 hover:bg-red-500 text-red-500"
            } hover:text-white p-2`}
            onClick={() => handleEdit()}
          >
            {openToEdit ? (
              <MdEdit className="text-lg" />
            ) : (
              <IoClose className="text-lg" />
            )}
          </button>

          <div className="flex justify-center gap-6 items-center">
            <div className="relative mb-3">
              <img
                className="h-[100px] md:h-[130px] dark:opacity-90 rounded-full ring-2 ring-blue-400"
                src={image[0] === "h" ? image : img00}
                alt="profil img"
              />
              <button
                className={`absolute bottom-1 right-1 md:bottom-2 md:right-2 rounded-full bg-blue-500 text-white p-1 ${
                  openToEdit && "hidden"
                }`}
                onClick={() => setIsOpen(true)}
              >
                <MdEdit />
              </button>
            </div>

            <div>
              <p className="text-2xl font-medium">{user?.userName}</p>
              <p
                className={`w-[80px] p-1 text-xs text-center font-meium border rounded-full ${
                  user?.role === "admin" &&
                  "border-[#ab996d] bg-[#fff5dd] text-[#ab996d] dark:bg-[#fff5dd]/20"
                } ${
                  user?.role === "member" &&
                  "border-blue-400 bg-blue-50 text-blue-400 dark:bg-blue-50/20"
                }`}
              >
                {user?.role}
              </p>
            </div>
          </div>

          <div className="mt-10">
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-5"
            >
              <div>
                <label
                  htmlFor="firstName"
                  className="transition-border duration-500 ease-in-out block ms-2.5 mb-2 text-gray-400 dark:text-white/60"
                >
                  First Name
                </label>
                <div className="relative">
                  <input
                    id="firstName"
                    type="text"
                    disabled={openToEdit}
                    value={firstName}
                    maxLength={10}
                    minLength={2}
                    onChange={handleFirstNameChange}
                    className="transition-border duration-500 ease-in-out w-full p-3 rounded-2xl border border-gray-400 bg-white text-black dark:text-white/60 dark:bg-[#181818] dark:border-white/60 disabled:border-none dark:disabled:border-none disabled:bg-gray-100 dark:disabled:bg-white/10 disabled:text-gray-400 dark:disabled:text-white/30 focus:outline-none focus:bg-blue-50"
                  />
                  {firstNameError && (
                    <p className="flex items-center gap-1 text-red-500 ms-3 mt-1">
                      <MdOutlineInfo />
                      {firstNameError}
                    </p>
                  )}
                  <div
                    className={`absolute right-3 top-3.5 p-1 rounded-full bg-blue-500 text-white ${
                      openToEdit && "hidden"
                    }`}
                  >
                    <MdEdit className="text-sm" />
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="transition-border duration-500 ease-in-out block ms-2.5 mb-2 text-gray-400 dark:text-white/60"
                >
                  Last Name
                </label>
                <div className="relative">
                  <input
                    id="lastName"
                    type="text"
                    disabled={openToEdit}
                    value={lastName}
                    onChange={handleLastNameChange}
                    maxLength={10}
                    minLength={2}
                    className="transition-border duration-500 ease-in-out w-full p-3 rounded-2xl border border-gray-400 bg-white text-black dark:text-white/60 dark:bg-[#181818] dark:border-white/60 disabled:border-none dark:disabled:border-none disabled:bg-gray-100 dark:disabled:bg-white/10 disabled:text-gray-400 dark:disabled:text-white/30 focus:outline-none focus:bg-blue-50"
                  />
                  {lastNameError && (
                    <p className="flex items-center gap-1 text-red-500 ms-3 mt-1">
                      <MdOutlineInfo />
                      {lastNameError}
                    </p>
                  )}
                  <div
                    className={`absolute right-3 top-3.5 p-1 rounded-full bg-blue-500 text-white ${
                      openToEdit && "hidden"
                    }`}
                  >
                    <MdEdit className="text-sm" />
                  </div>
                </div>
              </div>

              <div className="md:col-span-2">
                <label
                  htmlFor="email"
                  className="transition-border duration-500 ease-in-out block ms-2.5 mb-2 text-gray-400 dark:text-white/60"
                >
                  Email
                </label>
                <div className="relative">
                  <input
                    id="email"
                    type="text"
                    disabled={openToEdit}
                    value={email}
                    onChange={handleEmailChange}
                    maxLength={50}
                    minLength={5}
                    className="transition-border duration-500 ease-in-out w-full p-3 rounded-2xl border border-gray-400 bg-white text-black dark:text-white/60 dark:bg-[#181818] dark:border-white/60 disabled:border-none dark:disabled:border-none disabled:bg-gray-100 dark:disabled:bg-white/10 disabled:text-gray-400 dark:disabled:text-white/30 focus:outline-none focus:bg-blue-50"
                  />
                  {emailError && (
                    <p className="flex items-center gap-1 text-red-500 ms-3 mt-1">
                      <MdOutlineInfo />
                      {emailError}
                    </p>
                  )}
                  <div
                    className={`absolute right-3 top-3.5 p-1 rounded-full bg-blue-500 text-white ${
                      openToEdit && "hidden"
                    }`}
                  >
                    <MdEdit className="text-sm" />
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="transition-border duration-500 ease-in-out block ms-2.5 mb-2 text-gray-400 dark:text-white/60"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type="password"
                    disabled={openToEdit}
                    value={password}
                    onChange={handlePassChange}
                    maxLength={10}
                    minLength={2}
                    className="transition-border duration-500 ease-in-out w-full p-3 rounded-2xl border border-gray-400 bg-white text-black dark:text-white/60 dark:bg-[#181818] dark:border-white/60 disabled:border-none dark:disabled:border-none disabled:bg-gray-100 dark:disabled:bg-white/10 disabled:text-gray-400 dark:disabled:text-white/30 focus:outline-none focus:bg-blue-50"
                  />
                  {PasswordError && (
                    <p className="flex items-center gap-1 text-red-500 ms-3 mt-1">
                      <MdOutlineInfo />
                      {PasswordError}
                    </p>
                  )}
                  <div
                    className={`absolute right-3 top-3.5 p-1 rounded-full bg-blue-500 text-white ${
                      openToEdit && "hidden"
                    }`}
                  >
                    <MdEdit className="text-sm" />
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="transition-border duration-500 ease-in-out block ms-2.5 mb-2 text-gray-400 dark:text-white/60"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type="password"
                    disabled={openToEdit}
                    value={confirmPassword}
                    onChange={handleConfirmPassChange}
                    maxLength={10}
                    minLength={2}
                    className="transition-border duration-500 ease-in-out w-full p-3 rounded-2xl border border-gray-400 bg-white text-black dark:text-white/60 dark:bg-[#181818] dark:border-white/60 disabled:border-none dark:disabled:border-none disabled:bg-gray-100 dark:disabled:bg-white/10 disabled:text-gray-400 dark:disabled:text-white/30 focus:outline-none focus:bg-blue-50"
                  />
                  {confirmPasswordError && (
                    <p className="flex items-center gap-1 text-red-500 ms-3 mt-1">
                      <MdOutlineInfo />
                      {confirmPasswordError}
                    </p>
                  )}
                  <div
                    className={`absolute right-3 top-3.5 p-1 rounded-full bg-blue-500 text-white ${
                      openToEdit && "hidden"
                    }`}
                  >
                    <MdEdit className="text-sm" />
                  </div>
                </div>
              </div>

              <div className="flex justify-center col-span-1 md:col-span-2 mb-10">
                <button
                  className="transition-colors duration-500 ease-in-out w-1/2 p-3 rounded-2xl text-white bg-blue-400 hover:bg-blue-500 disabled:bg-gray-100 disabled:text-gray-400 dark:disabled:bg-white/30 dark:disabled:text-white/40"
                  disabled={disabledBtn}
                  type="submit"
                >
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="flex justify-center mt-10 h-screen flex-1">
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
      )}
      <ImgModal setIsOpen={setIsOpen} isOpen={isOpen} />
    </>
  );
};

export default Profile;
