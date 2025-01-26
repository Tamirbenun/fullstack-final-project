import { useEffect } from "react";
import { Link } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";

const NotFound = () => {

  useEffect(() => {
    ScrollToTop();
  }, []);
  
  return (
    <main className="flex justify-center items-center p-32 h-[80vh]">
      <div className="text-center">
        <h1 className="text-8xl font-bold mb-8">Oops!</h1>

        <h4 className="text-2xl">
          The page you were looking for was not found
        </h4>
        <Link to="/">
          <button className="button py-2 px-4 rounded-full hover:ring-4 ring-blue-400/30 mt-5">
            Back to Home Page
          </button>
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
