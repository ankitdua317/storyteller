import { FC } from "react";
import styles from "./Sidebar.module.css";
import SIDE_BAR_ITEMS from "../../../constants/sidebar";

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: FC<SidebarProps> = ({ isOpen }) => {
  return (
    <nav
      className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}
      aria-label="Main Navigation"
    >
      {/* Sidebar Navigation - Currently a static list */}
      {Object.entries(SIDE_BAR_ITEMS).map(([category, items]) => (
        <ul
          key={category}
          className={`${styles.navigator} ${styles.separator}`}
        >
          {/* Loop through sidebar items */}
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
  );
};

export default Sidebar;
