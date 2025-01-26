import { createContext, useState, ReactNode, useEffect } from "react";

interface DataContextType {
  view: string;
  setView: (stage: string) => void;
  userSelected: string[];
  setUserSelected: (stage: string[]) => void;
  image: string;
  setImage: (stage: string) => void;
  flightSelected: string;
  setFlightSelected: (stage: string) => void;
  seatsTaken: string[];
  setSeatsTaken: React.Dispatch<React.SetStateAction<string[]>>;
  destinationSelected: string;
  setDestinationSelected: (stage: string) => void;
  emailSelected: string;
  setEmailSelected: (stage: string) => void;
}

export const DataContext = createContext<DataContextType | undefined>(
  undefined
);

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [view, setView] = useState<string>(() => {
    const savedView = localStorage.getItem("view") || "";
    return savedView;
  });

  useEffect(() => {
    localStorage.setItem("view", view);
  }, [view]);

  const [userSelected, setUserSelected] = useState<string[]>(
    JSON.parse(localStorage.getItem("userSelected"))
  );

  useEffect(() => {
    localStorage.setItem("userSelected", JSON.stringify(userSelected));
  }, [userSelected]);

  const [flightSelected, setFlightSelected] = useState<string>(
    JSON.parse(localStorage.getItem("flightSelected"))
  );

  useEffect(() => {
    localStorage.setItem("flightSelected", JSON.stringify(flightSelected));
  }, [flightSelected]);

  const [image, setImage] = useState<string>("");

  const [seatsTaken, setSeatsTaken] = useState<string[]>(
    JSON.parse(localStorage.getItem("seatsTaken"))
  );

  useEffect(() => {
    localStorage.setItem("seatsTaken", JSON.stringify(seatsTaken));
  }, [seatsTaken]);

  const [destinationSelected, setDestinationSelected] = useState<string>(
    JSON.parse(localStorage.getItem("destinationSelected"))
  );

  useEffect(() => {
    localStorage.setItem(
      "destinationSelected",
      JSON.stringify(destinationSelected)
    );
  }, [destinationSelected]);

  const [emailSelected, setEmailSelected] = useState<string>(
    JSON.parse(localStorage.getItem("emailSelected"))
  );

  useEffect(() => {
    localStorage.setItem("emailSelected", JSON.stringify(emailSelected));
  }, [emailSelected]);

  return (
    <DataContext.Provider
      value={{
        view,
        setView,
        userSelected,
        setUserSelected,
        image,
        setImage,
        flightSelected,
        setFlightSelected,
        seatsTaken,
        setSeatsTaken,
        destinationSelected,
        setDestinationSelected,
        emailSelected,
        setEmailSelected,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
