import { useEffect } from "react";
import ScrollToTop from "../components/ScrollToTop";
import { Link } from "react-router-dom";
import { TbError404, TbSmartHome } from "react-icons/tb";
import { RiAccountCircleLine } from "react-icons/ri";
import { LuTicketsPlane } from "react-icons/lu";
import { HiOutlineMail } from "react-icons/hi";
import { IoAccessibility } from "react-icons/io5";
import { MdOutlineStickyNote2 } from "react-icons/md";

const About = () => {
  useEffect(() => {
    ScrollToTop();
  }, []);

  return (
    <>
      <header className="bg-gray-100 rounded-3xl mx-5 md:mx-10 text-center p-10 md:p-20">
        <h1 className="text-3xl md:text-5xl font-medium mb-10">About</h1>
        <p>
          AirPanda was founded with the goal of providing a modern, comfortable,
          and reliable flying experience for all its passengers. On our website,
          you'll find all the necessary tools to book the perfect flight for
          you, along with comprehensive information and customization options
          for every step of the process.
        </p>
      </header>

      <main className="p-10">
        <h2 className="text-3xl font-semibold text-center">
          What will you find on our website?
        </h2>

        <div className="mt-8">
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-medium text-blue-600 hover:underline"
          >
            <TbSmartHome />
            Home Page
          </Link>
          <ul className="mt-2 text-justify space-y-4 ">
            <li>
              <p className="font-semibold">Custom Flight Search:</p>
              <p>
                In the search bar on the home page, you can choose where you
                want to fly from and to, set departure and return dates, and
                select the number of passengers. To search for flights, you must
                register on the site. Clicking on "Search" will redirect you to
                the login page if you're not registered. If you don't have an
                account, there is a button to go to the registration page. After
                registering, you can search for flights and book tickets.
              </p>
            </li>
            <li>
              <p className="font-semibold">Our Destinations:</p>
              <p>
                Our gallery showcases all the destinations the company flies to.
              </p>
            </li>
            <li>
              <p className="font-semibold">
                Supported Credit Cards Information:
              </p>
              <p>
                We support a wide range of credit cards and guarantee a secure
                and convenient payment experience. In this section, you'll find
                information about the types of cards we accept.
              </p>
            </li>
            <li>
              <p className="font-semibold">Customer Reviews:</p>
              <p>
                Thousands of passengers have already flown with us and enjoyed
                excellent service. In the reviews section, you can read
                recommendations and feedback from passengers like you.
              </p>
            </li>
            <li>
              <p className="font-semibold">Newsletter Sign-Up:</p>
              <p>
                Want to stay updated on the hottest deals and news? Sign up for
                our newsletter and receive updates directly to your email.
              </p>
            </li>
          </ul>
        </div>

        <div className="mt-10">
          <Link
            to="/account"
            className="flex items-center gap-2 text-2xl font-medium text-blue-600 hover:underline"
          >
            <RiAccountCircleLine />
            Account Page
          </Link>
          <ul className="mt-2 text-justify space-y-4">
            <li>
              <p className="font-semibold">User Profile and Notifications:</p>
              <p>
                In the top-left corner of the website (in the menu), your
                profile picture and a notification button will appear. Clicking
                on the notification button will take you to the notifications
                page. If you have unread notifications, a red circle will appear
                on the button with the number of unread messages. Clicking on
                your profile picture will open a menu with links to your account
                page.
              </p>
            </li>
            <li>
              <p className="font-semibold">Profile Page:</p>
              <p>
                On the profile page, all your details and profile picture will
                be displayed. In the top-right corner, there will be a button to
                edit all fields, allowing you to update details, including
                choosing a new profile picture from the website's image gallery.
                At the bottom of the page, there is a button to save changes.
              </p>
            </li>
            <li>
              <p className="font-semibold">Notifications Page:</p>
              <p>
                On the notifications page, you will see all the notifications
                you've received. Every new user gets a thank-you message for
                registering. You'll receive a new notification after each ticket
                purchase, confirming the purchase and providing arrival
                information. In the top-right corner of each notification, you
                can delete or mark it as read/unread. If you've contacted
                customer service, you may receive a message from the system or
                service managers in this section.
              </p>
            </li>
            <li>
              <p className="font-semibold">Tickets Page:</p>
              <p>
                On the tickets page, all your purchased tickets will be
                displayed. Each flight ticket has a QR code that, when scanned,
                will show the ticket's ID. This code is for use at the airport
                without the need to print the tickets. One of our advantages is
                that everything is digital and eco-friendly.
              </p>
            </li>
          </ul>
        </div>

        <div className="mt-10">
          <div className="flex md:items-center gap-2 text-2xl font-medium text-blue-600 hover:underline">
            <LuTicketsPlane className="mt-1 md:mt-0" />
            <Link to="booking">Booking Page and Booking Process</Link>
          </div>
          <ul className="mt-2 text-justify space-y-4">
            <li>
              <p className="font-semibold">Flight Search:</p>
              <p>
                After choosing your search criteria, all available outbound
                flight options will be displayed. You can select the flight that
                suits you.
              </p>
            </li>
            <li>
              <p className="font-semibold">Seat Selection:</p>
              <p>
                After selecting the outbound flight, you'll move on to select
                seats in the available classes. Then, you'll proceed to select
                seats for the return flight.
              </p>
            </li>
            <li>
              <p className="font-semibold">Passenger Details:</p>
              <p>
                On the passenger details page, you can enter all required
                information in a convenient and secure manner.
              </p>
            </li>
            <li>
              <p className="font-semibold">Summary Page:</p>
              <p>
                Before payment, you'll see a complete overview of the selected
                flights, your personal details, and the total price.
              </p>
            </li>
            <li>
              <p className="font-semibold">Secure Payment:</p>
              <p>
                On the payment page, you'll complete the booking process by
                entering your credit card details. You can return and change
                your selections at any stage as long as you haven't completed
                the payment. At the top of each page, the search details will
                appear with an "Edit" button and the option to start a new
                search.
              </p>
            </li>
          </ul>
        </div>

        <div className="mt-10">
          <Link
            to="Booking"
            className="flex items-center gap-2 text-2xl font-medium text-blue-600 hover:underline"
          >
            <HiOutlineMail />
            Contact Page
          </Link>
          <ul className="mt-2 text-justify space-y-4">
            <li>
              This page includes a form to send inquiries directly to the
              company's email. Additionally, for user convenience, phone and
              email contact information is displayed, along with a map showing
              the company's location.
            </li>
          </ul>
        </div>

        <div className="mt-10">
          <Link
            to="Accessibility"
            className="flex items-center gap-2 text-2xl font-medium text-blue-600 hover:underline"
          >
            <MdOutlineStickyNote2 />
            Accessibility Statement Page
          </Link>
          <ul className="mt-2 text-justify space-y-4">
            <li>
              You can access this page from the footer menu or the accessibility
              panel. This page includes the accessibility statement with a full
              description of all buttons and their functions.
            </li>
          </ul>
        </div>

        <div className="mt-10">
          <p className="flex items-center gap-2 text-2xl font-medium text-blue-600">
            <IoAccessibility />
            Accessibility Menu
          </p>
          <ul className="mt-2 text-justify space-y-4">
            <li>
              In the bottom-left corner, there is an accessibility button.
              Clicking it opens an accessibility panel with three options:
              <ol className="list-decimal list- ps-5 my-3">
                <li>Increase text size.</li>
                <li>Highlight links.</li>
                <li>Black-and-white colors.</li>
              </ol>
              <p>
                At the bottom of the panel, there is a link to the accessibility
                statement page.
              </p>
            </li>
          </ul>
        </div>

        <div className="mt-10">
          <Link
            to="*"
            className="flex items-center gap-2 text-2xl font-medium text-blue-600 hover:underline"
          >
            <TbError404 className="text-3xl" />
            Not Found Page
          </Link>
          <ul className="mt-2 text-justify space-y-4">
            <li>
              This page appears if an incorrect path is entered that doesn't
              exist on the site. The page includes a button to return to the
              home page.
            </li>
          </ul>
        </div>

        <p className="text-xl font-medium mt-10 text-justify">
          We're here for you at AirPanda
        </p>
        <p>
          We strive to provide the highest quality flight experience and
          customer service. We invite you to join our family and enjoy the most
          advanced services in the aviation world.
        </p>
      </main>
    </>
  );
};

export default About;
