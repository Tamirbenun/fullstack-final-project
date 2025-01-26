import "./css/App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import About from "./routes/About";
import Register from "./routes/Register";
import Login from "./routes/Login";
import Booking from "./routes/Booking";
import NotFound from "./routes/NotFound";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/ProtectedRoute";
import NoAuthRoute from "./components/NoAuthRoute";
import Account from "./routes/Account";
import Accessibility from "./routes/Accessibility";
import AccessibilityButton from "./components/AccessibilityButton";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import { DataProvider } from "./contexts/DataContext";
import ContactUs from "./routes/ContactUs";

function App() {
  return (
    <DataProvider>
      <ScrollToTop />
      <header>
        <NavBar />
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/booking"
          element={
            <ProtectedRoute>
              <Booking />
            </ProtectedRoute>
          }
        />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/register"
          element={
            <NoAuthRoute>
              <Register />
            </NoAuthRoute>
          }
        />
        <Route
          path="/login"
          element={
            <NoAuthRoute>
              <Login />
            </NoAuthRoute>
          }
        />
        <Route path="/accessibility" element={<Accessibility />} />
        <Route path="*" element={<NotFound />} />
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
      <AccessibilityButton />
    </DataProvider>
  );
}

export default App;
