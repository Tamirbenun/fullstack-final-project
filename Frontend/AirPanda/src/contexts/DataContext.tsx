import { createContext, useState, ReactNode, useEffect } from "react";

interface DataContextType {
  progressStage: string;
  setProgressStage: (stage: string) => void;
  selectedSeats: string[];
  setSelectedSeats: (stage: string[]) => void;
  accountView: string;
  setAccountView: (stage: string) => void;
  image: string;
  setImage: (stage: string) => void;
  notificationsCount: number;
  setNotificationsCount: (stage: number) => void;
}

export const DataContext = createContext<DataContextType | undefined>(
  undefined
);

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [progressStage, setProgressStage] = useState<string>(() => {
    const savedStage = localStorage.getItem("progressStage");
    return savedStage ? savedStage : "OutboundFlight";
  });

  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const [accountView, setAccountView] = useState<string>(
    JSON.parse(localStorage.getItem("accountView"))
  );

  useEffect(() => {
    localStorage.setItem("accountView", JSON.stringify(accountView));
  }, [accountView]);

  const [image, setImage] = useState<string>("");

  const [notificationsCount, setNotificationsCount] = useState<number>(
    JSON.parse(localStorage.getItem("notifications"))
  );

  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(notificationsCount));
  }, [notificationsCount]);

  return (
    <DataContext.Provider
      value={{
        progressStage,
        setProgressStage,
        selectedSeats,
        setSelectedSeats,
        accountView,
        setAccountView,
        image,
        setImage,
        notificationsCount,
        setNotificationsCount,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
