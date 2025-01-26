import CubeOne from "../components/dashboard-page/CubeOne";
import CubeTwo from "../components/dashboard-page/CubeTwo";
import CubeThree from "../components/dashboard-page/CubeThree";
import CubeFive from "../components/dashboard-page/CubeFive";
import CubeFour from "../components/dashboard-page/CubeFour";
import Footer from "../components/Footer";

const Dashboard = () => {
  return (
    <div className="transition-colors duration-500 ease-in-out dark:bg-[#212121] dark:text-white/60 lg:h-[calc(100vh-80px)]">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mx-10 mb-5">
        <CubeOne />
        <CubeTwo />
        <CubeThree />
        <CubeFour />
        <CubeFive />
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
