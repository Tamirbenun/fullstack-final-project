import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { auth } from "../services/auth-service";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import { ThreeDots } from "react-loader-spinner";
import ScrollToTop from "../components/ScrollToTop";

const Login = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    ScrollToTop();
  }, []);

  const validationSchema = Yup.object({
    email: Yup.string().email("Bad Email!").required("The email is required"),
    password: Yup.string().required().min(1).max(20),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  return (
    <main className="min-h-[90vh] px-10">
      <div className="flex justify-between md:bg-gray-100 rounded-3xl p-3">
        <div className="hidden md:block flex-1">
          <div className="flex justify-center items-center h-full">
            <div className="text-center">
              <p className="text-5xl font-bold">Welcome Back!</p>
              <p className="text-lg mt-2">
                To keep connected with us login with your personal info
              </p>
              <p className="text-lg mb-4 -mt-1">Don't have an account?</p>
              <Link
                to="/register"
                className="px-4 py-2 rounded-2xl border border-gray-400 hover:border-blue-500 hover:text-blue-500"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
        <div className="relative bg-white rounded-2xl min-h-[83vh] w-full md:w-1/2 px-10 lg:px-20 pt-10">
          <div className="text-center">
            <h1 className="text-5xl font-medium mb-5">Login</h1>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (o) => {
              setIsLoading(true);
              try {
                const response = await auth.login(o.email, o.password);
                login(response.data.token);
                navigate("/");
              } catch (error) {
                console.error(error);
                if (!error.response) {
                  Swal.fire({
                    title: "Error",
                    text: "Unable to reach the server. Please check your connection.",
                    icon: "error",
                    confirmButtonText: "Ok",
                    customClass: {
                      popup: "custom-swal",
                      confirmButton: "custom-confirm-button",
                    },
                  });
                } else {
                  Swal.fire({
                    title: "Error",
                    text:
                      error.response.data?.message ||
                      "An unexpected error occurred.",
                    icon: "error",
                    confirmButtonText: "Ok",
                    customClass: {
                      popup: "custom-swal",
                      confirmButton: "custom-confirm-button",
                    },
                  });
                }
              } finally {
                setIsLoading(false);
              }
            }}
          >
            {({ errors, isValidating, values }) => (
              <Form className="flex flex-col items-center">
                <div className="font-extralight form-group flex flex-col gap-1 w-full mx-auto text-lg my-4">
                  <label htmlFor="email" className="font-medium text-gray-300">
                    Email
                  </label>
                  <Field
                    name="email"
                    type="email"
                    disabled={isLoading}
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

                <div className="font-extralight form-group flex flex-col gap-1 w-full mx-auto text-lg my-4">
                  <label
                    htmlFor="password"
                    className="font-medium text-gray-300"
                  >
                    Password
                  </label>
                  <Field
                    name="password"
                    type="password"
                    disabled={isLoading}
                    id="password"
                    className="rounded-xl hover:border-2 border-2 px-2 py-2 focus:outline-none focus:ring-4 focus:ring-gray-50"
                  />
                  <div className="h-[10px]">
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-base"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={
                    !!errors.email ||
                    !!errors.password ||
                    isValidating ||
                    !values.email ||
                    !values.password ||
                    isLoading
                  }
                  className="button px-10 py-2 w-1/2 rounded-full hover:ring-4 ring-blue-400/30 disabled:bg-black/40 disabled:ring-0 mt-3"
                >
                  Login
                </button>
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
              </Form>
            )}
          </Formik>
          <div className="absolute bottom-0 left-0 w-full flex justify-center items-center p-4">
            <p className="me-1">Don't Have an Account? </p>
            <Link to="/Register" className="text-blue-600 font-medium">
              Register
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
