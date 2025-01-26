import { Navigate } from "react-router-dom";
import { FCP } from "../../@types";
import useAuth from "../../hooks/useAuth";

const ProtectedRoute: FCP = ({ children }) => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
