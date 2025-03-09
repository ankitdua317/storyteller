import React from "react";
import { TableProps } from "../../models/Table";
import Spinner from "../Spinner";
import Pagination from "./Paginaton";
import styles from "./Table.module.css";
import { useViewport } from "../../hooks/useViewport";

const Table = <T,>({
  ariaLabel,
  loading,
  columns,
  data,
  goToPrevPage,
  hasPrevPage,
  goToNextPage,
  hasNextPage,
  onEdit,
  onDelete,
}: TableProps<T>) => {
  const { isMobile } = useViewport();

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
                    {sorting && <span className={styles.arrow}>▲</span>}
                  </span>
                </th>
              ))}
              <th scope="col">Actions</th>
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
        hasPrevPage={hasPrevPage}
        hasNextPage={hasNextPage}
        goToPrevPage={goToPrevPage}
        goToNextPage={goToNextPage}
      />
    </div>
  );
};

export default Table;
