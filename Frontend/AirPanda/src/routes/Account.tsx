import { useContext, useEffect } from "react";
import ScrollToTop from "../components/ScrollToTop";
import UserNav from "../components/account-page/UserNav";
import { DataContext } from "../contexts/DataContext";
import Profile from "../components/account-page/Profile";
import Tickets from "../components/account-page/Tickets";
import Notifications from "../components/account-page/Notifications";

const Account = () => {
  const { accountView } = useContext(DataContext);

  useEffect(() => {
    ScrollToTop();
  }, []);

  return (
    <main className="md:flex mt-5 mx-5 md:mx-10">
      <UserNav />
      {accountView === "profile" && <Profile />}
      {accountView === "tickets" && <Tickets />}
      {accountView === "notifications" && <Notifications />}
    </main>
  );
};

export default Account;
