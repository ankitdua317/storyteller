import { FC } from "react";
import styles from "./Table.module.css";
import { PAGINATOR_ROWS_OPTIONS } from "../../constants/selectOptions";
import Select, { Option } from "../Input/Select";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  pageOption: Option;
  goToPrevPage: VoidFunction;
  goToNextPage: VoidFunction;
  changePageSize: (option: Option) => void;
}

const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  hasPrevPage,
  hasNextPage,
  pageOption,
  goToPrevPage,
  goToNextPage,
  changePageSize,
}) => {
  return (
    <nav
      className={styles.pagination}
      role="navigation"
      aria-label="Pagination Navigation"
    >
      <div className={styles.pages}>
        Page{" "}
        <input
          type="text"
          readOnly
          value={currentPage}
          className={styles.pageInput}
        />{" "}
        of {totalPages || 1}
        <Select
          options={PAGINATOR_ROWS_OPTIONS}
          selected={pageOption}
          onChange={(option) => changePageSize(option)}
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
