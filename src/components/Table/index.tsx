import React, { useState } from "react";
import { SortBy, TableProps } from "../../models/Table";
import Spinner from "../Spinner";
import Pagination from "./Paginaton";
import styles from "./Table.module.css";
import { useViewport } from "../../hooks/useViewport";

const Table = <T,>({
  ariaLabel,
  loading,
  columns,
  data,
  currentPage,
  totalPages,
  hasPrevPage,
  hasNextPage,
  pageOption,
  goToPrevPage,
  goToNextPage,
  changePageSize,
  onEdit,
  onDelete,
  onSortClick,
}: TableProps<T>) => {
  const { isMobile } = useViewport();
  const [sortBy, setSortBy] = useState<SortBy | null>(null);

  const handleSortClick = (accessor: keyof T, sort: SortBy) => {
    onSortClick!(accessor, sort);
    setSortBy(sort);
  };

  if (loading) return <Spinner />;

  return (
    <div className={styles.wrapper}>
      {/* Table Container */}
      <div className={styles.tableContainer}>
        <table className={styles.table} aria-label={ariaLabel}>
          {/* Table Header */}
          <thead>
            <tr>
              {columns.map(({ header, accessor, sorting }, index) => (
                <th
                  key={typeof accessor === "string" ? accessor : `col-${index}`}
                  scope="col"
                  style={{ width: isMobile ? "100px" : "auto" }}
                >
                  <span>
                    {header}
                    {sorting && onSortClick ? (
                      <>
                        <span
                          // replace this false with sorting flag to make it active
                          className={`${styles.arrow} ${
                            sortBy === "inc" ? styles.active : ""
                          }`}
                          onClick={() => handleSortClick(accessor, "inc")}
                        >
                          ⬆
                        </span>
                        <span
                          // replace this false with sorting flag to make it active
                          className={`${styles.arrow} ${
                            sortBy === "dec" ? styles.active : ""
                          }`}
                          onClick={() => handleSortClick(accessor, "dec")}
                        >
                          ⬇
                        </span>
                      </>
                    ) : null}
                  </span>
                </th>
              ))}
              <th scope="col" style={{ width: isMobile ? "100px" : "auto" }} />
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index}>
                  {columns.map(({ accessor, render }) => (
                    <td key={String(accessor)}>
                      {render
                        ? render(item)
                        : (item[accessor] as React.ReactNode)}
                    </td>
                  ))}
                  <td className={styles.actionButtons}>
                    <button
                      className={styles.deleteButton}
                      onClick={() => onDelete(item)}
                    >
                      Delete
                    </button>
                    <button
                      className={styles.editButton}
                      onClick={() => onEdit(item)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + 1} className={styles.noData}>
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Component */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        hasPrevPage={hasPrevPage}
        hasNextPage={hasNextPage}
        pageOption={pageOption}
        goToPrevPage={goToPrevPage}
        goToNextPage={goToNextPage}
        changePageSize={changePageSize}
      />
    </div>
  );
};

export default Table;
