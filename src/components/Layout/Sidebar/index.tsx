import { FC } from "react";
import styles from "./Sidebar.module.css";
import SIDE_BAR_ITEMS from "../../../constants/sidebar";

interface SidebarProps {
  isOpen: boolean;
}

/**
 * Sidebar Component
 *
 * @param {SidebarProps} props - Props for the Sidebar component.
 * @param {boolean} props.isOpen - Controls the visibility of the sidebar.
 * @returns {JSX.Element} - A semantic and accessible sidebar component.
 */
const Sidebar: FC<SidebarProps> = ({ isOpen }) => {
  return (
    <aside
      className={`${styles.sidebarContainer} ${isOpen ? styles.open : ""}`}
      aria-hidden={!isOpen}
      aria-label="Sidebar"
    >
      <nav className={styles.sidebar} aria-label="Main Navigation">
        {/* Dynamically render sidebar items */}
        {Object.entries(SIDE_BAR_ITEMS).map(([category, items]) => (
          <ul
            key={category}
            className={`${styles.navigator} ${styles.separator}`}
            aria-label={`${category} Section`}
          >
            {items.map((item) => (
              <li
                key={item.name}
                className={`${styles.item} ${
                  item.name === "Stories" ? styles.active : ""
                }`}
                aria-current={item.name === "Stories" ? "page" : undefined}
              >
                {item.name}
              </li>
            ))}
          </ul>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
