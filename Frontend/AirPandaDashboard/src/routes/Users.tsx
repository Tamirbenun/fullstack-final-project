import { useContext, useEffect } from "react";
import UsersList from "../components/user-page/UsersList";
import { DataContext } from "../contexts/DataContext";
import UserView from "../components/user-page/UserView";
import Footer from "../components/Footer";

const Users = () => {
  const { view, setView } = useContext(DataContext);

  useEffect(() => {
    setView("UsersList");
  }, []);

  return (
    <div className="h-screen">
      {view === "UsersList" ? <UsersList /> : <UserView />}
      <Footer />
    </div>
  );
};

export default Users;
