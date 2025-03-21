import { createContext, useEffect, useState, ReactNode } from "react";

interface ViewportContextType {
  isMobile: boolean;
}

const ViewportContext = createContext<ViewportContextType | undefined>(
  undefined
);

export const ViewportProvider = ({ children }: { children: ReactNode }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 820);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 820);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <ViewportContext.Provider value={{ isMobile }}>
      {children}
    </ViewportContext.Provider>
  );
};

export default ViewportContext;
