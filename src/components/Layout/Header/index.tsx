import styles from "./Header.module.css";

interface HeaderProps {
  toggleSidebar: VoidFunction;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  return (
    <header className={styles.header}>
      {/* Brand & Sidebar Toggle */}
      <div className={styles.brandContainer}>
        <button
          className={styles.menuButton}
          onClick={toggleSidebar}
          aria-label="Toggle Sidebar"
        >
          ☰
        </button>
        <div className={styles.brand}>Storyteller</div>
      </div>

      {/* User & Help Section */}
      <div className={styles.userContainer}>
        <div className={`${styles.help} center`} aria-label="Help">
          ?
        </div>
        <div className={`${styles.user} center`} aria-label="User Profile">
          AD
        </div>
      </div>
    </header>
  );
};

export default Header;
