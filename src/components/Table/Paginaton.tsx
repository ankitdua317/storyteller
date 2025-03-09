import { FC } from "react";
import styles from "./Table.module.css";
import { PAGINATOR_ROWS_OPTIONS } from "../../constants/selectOptions";
import Select from "../Input/Select";

interface PaginationProps {
  hasPrevPage: boolean;
  hasNextPage: boolean;
  goToPrevPage: () => void;
  goToNextPage: () => void;
}

const Pagination: FC<PaginationProps> = ({
  hasPrevPage,
  hasNextPage,
  goToPrevPage,
  goToNextPage,
}) => {
  return (
    <nav
      className={styles.pagination}
      role="navigation"
      aria-label="Pagination Navigation"
    >
      <div className={styles.pages}>
        Page <input type="text" placeholder="1" className={styles.pageInput} />{" "}
        of 9
        <Select
          selected={PAGINATOR_ROWS_OPTIONS[0]}
          options={PAGINATOR_ROWS_OPTIONS}
        />
      </div>
      <div className="flex">
        <button
          onClick={goToPrevPage}
          disabled={!hasPrevPage}
          aria-label="Go to previous page"
        >
          ←
        </button>
        <button
          onClick={goToNextPage}
          disabled={!hasNextPage}
          aria-label="Go to next page"
        >
          →
        </button>
      </div>
    </nav>
  );
};

export default Pagination;
