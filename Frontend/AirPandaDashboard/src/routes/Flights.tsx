import React, { useContext, useEffect } from "react";
import Footer from "../components/Footer";
import { DataContext } from "../contexts/DataContext";
import FlightsList from "../components/flights-page/FlightsList";
import FlightView from "../components/flights-page/FlightView";

const Flights = () => {
  const { view, setView } = useContext(DataContext);

  useEffect(() => {
    if (view !== "flightView") {
      setView("FlightsList");
    }
  }, []);

  return (
    <div>
      {view === "FlightsList" ? <FlightsList /> : <FlightView />}
      <Footer />
    </div>
  );
};

export default Flights;
