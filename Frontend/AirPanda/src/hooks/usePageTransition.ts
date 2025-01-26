import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const usePageTransition = (callback: () => void) => {
  const location = useLocation();
  const prevLocation = useRef(location.pathname);

  useEffect(() => {
    if (prevLocation.current !== location.pathname) {
      callback();
    }
    prevLocation.current = location.pathname;
  }, [location.pathname, callback]);
};

export default usePageTransition;
