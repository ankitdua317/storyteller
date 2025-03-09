import { useState, useEffect, ReactNode } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import styles from "./Layout.module.css";
import { useViewport } from "../../hooks/useViewport";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { isMobile } = useViewport();
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);

  useEffect(() => {
    setIsSidebarOpen((prev) => (isMobile ? false : prev));
  }, [isMobile]);

  return (
    <div className={styles.dashboardWrapper}>
      {/* Header with sidebar toggle button */}
      <Header toggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />

      {/* Main layout structure */}
      <div className={styles.dashboardContainer}>
        <aside className={styles.sidebarContainer}>
          <Sidebar isOpen={isSidebarOpen} />
        </aside>

        <main className={styles.mainContent}>{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
