import { createContext, useEffect, useState, ReactNode } from "react";

interface ViewportContextType {
  isMobile: boolean;
}

const ViewportContext = createContext<ViewportContextType | undefined>(
  undefined
);

export const ViewportProvider = ({ children }: { children: ReactNode }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
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

export default ViewportContext; // Export the context itself
