import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { auth } from "../../services/auth-service";
import Swal from "sweetalert2";
import { ThreeDots } from "react-loader-spinner";
import { FaCheck } from "react-icons/fa";
import { PiEyeClosedBold, PiEyeBold } from "react-icons/pi";

const Register = ({ setIsOpen }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [stepOne, setStepOne] = useState<string>("current");
  const [stepTwo, setStepTwo] = useState<string>("next");
  const [stepThree, setStepThree] = useState<string>("next");
  const [stepFour, setStepFour] = useState<string>("next");
  const [showPass, setShowPass] = useState<boolean>(false);

  const handleShowPass = () => {
    if (!showPass) {
      setShowPass(true);
    } else if (showPass) {
      setShowPass(false);
    }
  };

  const baseStyle: string =
    "flex justify-center items-center rounded-full w-[40px] h-[40px] aspect-square";
  const lineBaseStyle: string = "w-[50px] h-[2px] mx-3 rounded-full";
  const current: string = "bg-darkblue";
  const done: string = "bg-green-400";
  const next: string = "bg-gray-200 text-gray-400";

  const validationSchema = Yup.object({
    email: Yup.string().email("Bad Email!").required("The email is required"),
    firstName: Yup.string()
      .required("First name is required")
      .min(2, "First name must be at least 2 characters")
      .max(10, "First name must be at most 10 characters")
      .matches(/^[a-zA-Z]+$/, "First name must contain only English letters"),
    lastName: Yup.string()
      .required("Last name is required")
      .min(2, "Last name must be at least 2 characters")
      .max(10, "Last name must be at most 10 characters")
      .matches(/^[a-zA-Z]+$/, "Last name must contain only English letters"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password must be at most 20 characters")
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_-]).{8,30}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
    confirmPassword: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });

  const initialValues = {
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  };

  const handleNextStep = (step: number) => {
    if (step === 1) {
      setStepOne("done");
      setStepTwo("current");
    } else if (step === 2) {
      setStepTwo("done");
      setStepThree("current");
    } else if (step === 3) {
      setStepThree("done");
      setStepFour("current");
    }
  };

  const handleBackStep = (step: number) => {
    if (step === 2) {
      setStepTwo("next");
      setStepOne("current");
    } else if (step === 3) {
      setStepThree("next");
      setStepTwo("current");
    } else if (step === 4) {
      setStepFour("next");
      setStepThree("current");
    }
  };

  return (
    <>
      <div className="flex justify-center items-center text-white my-8">
        <div
          className={`${baseStyle} ${stepOne === "current" && current}
               ${stepOne === "next" && next} ${stepOne === "done" && done}`}
        >
          {stepOne === "done" ? <FaCheck /> : <p className="font-bold">1</p>}
        </div>

        <div
          className={`${lineBaseStyle} ${stepOne === "done" ? done : next}`}
        ></div>

        <div
          className={`${baseStyle} ${stepTwo === "current" && current}
               ${stepTwo === "next" && next} ${stepTwo === "done" && done}`}
        >
          {stepTwo === "done" ? <FaCheck /> : <p className="font-bold">2</p>}
        </div>

        <div
          className={`${lineBaseStyle} ${stepTwo === "done" ? done : next}`}
        ></div>

        <div
          className={`${baseStyle} ${stepThree === "current" && current}
               ${stepThree === "next" && next} ${stepThree === "done" && done}`}
        >
          {stepThree === "done" ? <FaCheck /> : <p className="font-bold">3</p>}
        </div>

        <div
          className={`${lineBaseStyle} ${stepThree === "done" ? done : next}`}
        ></div>

        <div
          className={`${baseStyle} ${
            stepFour === "current" && !isLoading ? current : "done"
          }
               ${stepFour === "next" && next} ${isLoading && done}`}
        >
          {isLoading ? <FaCheck /> : <p className="font-bold">4</p>}
        </div>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnChange={true}
        validateOnBlur={true}
        onSubmit={(o) => {
          setIsLoading(true);
          auth
            .register(
              o.email,
              o.firstName + " " + o.lastName,
              o.password,
              "image"
            )
            .then((response) => {
              if (response) {
                Swal.fire({
                  title: "success",
                  text: "User created successfully",
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
              }
            })
            .catch((error) => {
              console.log(error);
              setIsLoading(false);
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
            })
            .finally(() => {
              setIsLoading(false);
            });
        }}
      >
        {({ errors, isValidating, values }) => (
          <Form className="items-center">
            <div className={`${stepOne === "done" && "hidden"}`}>
              <div className="font-extralight form-group flex flex-col gap-1 w-full mx-auto text-lg my-4">
                <label
                  htmlFor="firstName"
                  className="font-medium text-gray-300"
                >
                  First Name
                </label>
                <Field
                  name="firstName"
                  type="text"
                  id="firstName"
                  className="rounded-xl hover:border-2 border-2 px-2 py-2 focus:outline-none focus:ring-4 focus:ring-gray-50"
                />
                <div className="h-[10px]">
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className="text-red-500 text-base"
                  />
                </div>
              </div>

              <div className="font-extralight form-group flex flex-col gap-1 w-full mx-auto text-lg my-4">
                <label htmlFor="lastName" className="font-medium text-gray-300">
                  Last Name
                </label>
                <Field
                  name="lastName"
                  type="text"
                  id="lastName"
                  className="rounded-xl hover:border-2 border-2 px-2 py-2 focus:outline-none focus:ring-4 focus:ring-gray-50"
                />
                <div className="h-[10px]">
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    className="text-red-500 text-base"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => handleNextStep(1)}
                  type="button"
                  disabled={
                    !!errors.firstName ||
                    !!errors.lastName ||
                    isValidating ||
                    !values.firstName ||
                    !values.lastName
                  }
                  className="button px-10 py-2  rounded-full hover:ring-4 ring-blue-400/30 disabled:bg-black/40 disabled:ring-0 mt-3"
                >
                  Next
                </button>
              </div>
            </div>

            <div className={`${stepTwo !== "current" && "hidden"}`}>
              <div className="font-extralight form-group flex flex-col gap-1 w-full mx-auto text-lg my-4">
                <p className="text-justify">
                  Please enter your email address correctly, so you can receive
                  important updates and information about flight changes.
                </p>
                <label
                  htmlFor="email"
                  className="font-medium text-gray-300 mt-5"
                >
                  Email Address
                </label>
                <Field
                  name="email"
                  type="email"
                  id="email"
                  className="rounded-xl hover:border-2 border-2 px-2 py-2 focus:outline-none focus:ring-4 focus:ring-gray-50"
                />
                <div className="h-[10px]">
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-base"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => handleBackStep(2)}
                  type="button"
                  className="bg-gray-100 text-gray-400 px-10 py-2 rounded-full hover:bg-gray-200 disabled:bg-black/40 disabled:ring-0 mt-3 me-5"
                >
                  back
                </button>
                <button
                  onClick={() => handleNextStep(2)}
                  type="button"
                  disabled={!!errors.email || isValidating || !values.email}
                  className="button px-10 py-2 rounded-full hover:ring-4 ring-blue-400/30 disabled:bg-black/40 disabled:ring-0 mt-3"
                >
                  Next
                </button>
              </div>
            </div>

            <div className={`${stepThree !== "current" && "hidden"}`}>
              <div className="font-extralight form-group flex flex-col gap-1 w-full mx-auto text-lg my-4">
                <label
                  htmlFor="password"
                  className="font-medium text-gray-300 mt-5"
                >
                  Password
                </label>
                <Field
                  name="password"
                  type="password"
                  id="password"
                  className="rounded-xl hover:border-2 border-2 px-2 py-2 focus:outline-none focus:ring-4 focus:ring-gray-50"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-base"
                />
              </div>

              <div className="font-extralight form-group flex flex-col gap-1 w-full mx-auto text-lg my-4">
                <label
                  htmlFor="confirmPassword"
                  className="font-medium text-gray-300 mt-5"
                >
                  Confirm Password
                </label>
                <Field
                  name="confirmPassword"
                  type="password"
                  id="confirmPassword"
                  className="rounded-xl hover:border-2 border-2 px-2 py-2 focus:outline-none focus:ring-4 focus:ring-gray-50"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500 text-base"
                />
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => handleBackStep(3)}
                  type="button"
                  className="bg-gray-100 text-gray-400 px-10 py-2 rounded-full hover:bg-gray-200 disabled:bg-black/40 disabled:ring-0 mt-3 me-5"
                >
                  back
                </button>
                <button
                  onClick={() => handleNextStep(3)}
                  type="button"
                  disabled={
                    !!errors.password ||
                    !!errors.confirmPassword ||
                    isValidating ||
                    !values.password ||
                    !values.confirmPassword
                  }
                  className="button px-10 py-2 rounded-full hover:ring-4 ring-blue-400/30 disabled:bg-black/40 disabled:ring-0 mt-3"
                >
                  Next
                </button>
              </div>
            </div>

            <div className={`${stepFour !== "current" && "hidden"}`}>
              <h3 className="font-medium text-lg text-center my-4">
                Make sure all the details are correct.
              </h3>
              <div className="bg-gray-100 rounded-3xl p-10">
                <div className="flex">
                  <div className="me-16">
                    <p className="font-medium text-gray-400">First Name</p>
                    <p className="">{values.firstName}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-400">Last Name</p>
                    <p className="">{values.lastName}</p>
                  </div>
                </div>
                <div className="mb-5">
                  <p className="font-medium text-gray-400 mt-5">Email</p>
                  <p className="">{values.email}</p>
                </div>
                <div className="">
                  <p className="font-medium text-gray-400 mt-5">Password</p>
                  <div className="flex items-center">
                    {!showPass ? (
                      <p className="">{"•".repeat(values.password.length)}</p>
                    ) : (
                      <p className="">{values.password}</p>
                    )}
                    <button
                      type="button"
                      onClick={handleShowPass}
                      className="ms-2 text-gray-400 hover:text-blue-700"
                    >
                      {!showPass ? <PiEyeClosedBold /> : <PiEyeBold />}
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex justify-center mt-5">
                <button
                  onClick={() => handleBackStep(4)}
                  type="button"
                  className="bg-gray-100 text-gray-400 px-10 py-2 rounded-full hover:bg-gray-200 disabled:bg-black/40 disabled:ring-0 mt-3 me-5"
                >
                  back
                </button>
                <button
                  disabled={isLoading}
                  type="submit"
                  className="button px-10 py-2 rounded-full hover:ring-4 ring-blue-400/30 disabled:bg-black/40 disabled:ring-0 mt-3"
                >
                  Register
                </button>
              </div>
              <div className="flex justify-center mt-5">
                {isLoading && (
                  <ThreeDots
                    visible={true}
                    height="80"
                    width="80"
                    color="#003268"
                    radius="9"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                  />
                )}
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Register;
