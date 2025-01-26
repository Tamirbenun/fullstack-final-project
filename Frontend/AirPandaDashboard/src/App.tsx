import "./css/App.css";
import { Route, Routes } from "react-router-dom";
import { DataProvider } from "./contexts/DataContext";
import Dashboard from "./routes/Dashboard";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ProtectedRoute from "./components/protected/ProtectedRoute";
import NoAuthRoute from "./components/protected/NoAuthRoute";
import Login from "./routes/Login";
import Users from "./routes/Users";
import Destinations from "./routes/Destinations";
import Flights from "./routes/Flights";
import Navbar from "./components/Navbar";
import Newsletter from "./routes/Newsletter";

const App = () => {
  return (
    <DataProvider>
      <Header />
      <Routes>
        <Route
          path="/login"
          element={
            <NoAuthRoute>
              <Login />
              <Footer />
            </NoAuthRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <main className="flex" style={{ height: "calc(100vh - 80px)" }}>
                <Navbar />
                <div className="overflow-y-auto custom-scroll flex-1">
                  <Dashboard />
                </div>
              </main>
            </ProtectedRoute>
          }
        />
        <Route
          path="/Newsletter"
          element={
            <ProtectedRoute>
              <main className="flex" style={{ height: "calc(100vh - 80px)" }}>
                <Navbar />
                <div className="overflow-y-auto custom-scroll flex-1">
                  <Newsletter />
                </div>
              </main>
            </ProtectedRoute>
          }
        />
        <Route
          path="/flights"
          element={
            <ProtectedRoute>
              <main className="flex" style={{ height: "calc(100vh - 80px)" }}>
                <Navbar />
                <div className="overflow-y-auto custom-scroll flex-1">
                  <Flights />
                </div>
              </main>
            </ProtectedRoute>
          }
        />
        <Route
          path="/destinations"
          element={
            <ProtectedRoute>
              <main className="flex" style={{ height: "calc(100vh - 80px)" }}>
                <Navbar />
                <div className="overflow-y-auto custom-scroll flex-1">
                  <Destinations />
                </div>
              </main>
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <main className="flex" style={{ height: "calc(100vh - 80px)" }}>
                <Navbar />
                <div className="overflow-y-auto custom-scroll flex-1">
                  <Users />
                </div>
              </main>
            </ProtectedRoute>
          }
        />
        <Route
          path="*"
          element={
            <ProtectedRoute>
              <main className="flex" style={{ height: "calc(100vh - 80px)" }}>
                <Navbar />
                <div className="overflow-y-auto custom-scroll flex-1">
                  <Dashboard />
                </div>
              </main>
            </ProtectedRoute>
          }
        />
      </Routes>
    </DataProvider>
  );
};

export default App;
