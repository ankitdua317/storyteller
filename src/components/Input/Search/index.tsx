import { useState } from "react";
import styles from "./Search.module.css";

interface SearchProps {
  onSearch: (query: string) => void;
}

const Search = ({ onSearch }: SearchProps) => {
  const [query, setQuery] = useState("");

  // Handles search when clicking the button or pressing Enter
  const handleSearch = () => {
    const trimmedQuery = query.trim();
    if (trimmedQuery) {
      onSearch(trimmedQuery);
    }
  };

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        placeholder="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        className={styles.searchInput}
        aria-label="Search table"
      />
      <button
        onClick={handleSearch}
        className={styles.searchButton}
        aria-label="Search"
      >
        🔍
      </button>
    </div>
  );
};

export default Search;
