import styles from "./Search.module.css";

interface SearchProps {
  value: string;
  onSearch: (query: string) => void;
}

const Search = ({ value, onSearch }: SearchProps) => {
  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        placeholder="Search"
        value={value}
        onChange={(e) => onSearch(e.target.value)}
        className={styles.searchInput}
        aria-label="Search"
      />
      <span className={styles.searchButton}>🔍</span>
    </div>
  );
};

export default Search;
