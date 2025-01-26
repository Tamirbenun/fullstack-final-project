import SearchContainer from "../components/home-page/SearchContainer";
import SectionReviews from "../components/home-page/SectionReviews";
import SectionPayments from "../components/home-page/SectionPayments";
import SectionDestinations from "../components/home-page/SectionDestinations";
import { useEffect } from "react";
import SectionNewsletter from "../components/home-page/SectionNewslatter";
import ScrollToTop from "../components/ScrollToTop";

const Home = () => {
  useEffect(() => {
    ScrollToTop();
    localStorage.setItem("progressStage", "OutboundFlight");
    localStorage.removeItem("searchData");
    localStorage.removeItem("OutboundFlight");
    localStorage.removeItem("OutboundFlightSeats");
    localStorage.removeItem("ReturnFlight");
    localStorage.removeItem("ReturnFlightSeats");
    localStorage.removeItem("Passengers");
    localStorage.removeItem("Tickets");
    localStorage.removeItem("outboundSeatsPrice");
    localStorage.removeItem("returnSeatsPrice");
  }, []);

  return (
    <main className="md:px-10 md:pb-10 grid grid-cols-1 gap-y-20 pt-0">
      <section id="hero">
        <div className="bg-gray-100 md:rounded-3xl">
          <div className="p-5 md:p-10 pt-16 md:pt-28">
            <h1 className="text-center text-4xl md:text-5xl xl:text-6xl mb-8">
              Where are you <b className="text-darkblue">Flying</b> to?
            </h1>

            <p className="text-lg text-center mb-20">
              Your journey begins with Us where excellence takes off.
              <br />
              Our commitment to provide you with an exceptional travel
              experience
              <br />
              with an emphasis on comfort, reliability and customer
              satisfaction.
            </p>

            <div className="flex justify-center">
              <SearchContainer />
            </div>
          </div>
        </div>
      </section>

      <section className="">
        <SectionDestinations />
      </section>
      <section className="">
        <SectionPayments />
      </section>
      <section className="">
        <SectionReviews />
      </section>
      <section className="">
        <SectionNewsletter />
      </section>
    </main>
  );
};

export default Home;
