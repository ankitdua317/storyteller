import { FC } from "react";
import styles from "./Stories.module.css";
import Table from "../Table";
import useStories from "../../hooks/useStories";
import { useViewport } from "../../hooks/useViewport";
import STORY_COLOUMNS from "../../constants/storyColumns";
import { STATUS_OPTIONS } from "../../constants/selectOptions";
import Story from "../../models/Story";
import Search from "../Input/Search";
import Select from "../Input/Select";

const Stories: FC = () => {
  const { isMobile } = useViewport();
  const {
    loading,
    data,
    pageOption,
    currentPage,
    totalPages,
    hasNextPage,
    hasPrevPage,
    searchQuery,
    status,
    totalRecords,
    showingFrom,
    showingTo,
    goToNextPage,
    goToPrevPage,
    changePageSize,
    handleSearch,
    handleStatusChange,
    handleSortClick,
    handleDelete,
  } = useStories();

  return (
    <div className={styles.container}>
      {/* Page Header */}
      <div className={styles.subContainer}>
        <div className="spaced-flex">
          <h1 id="stories-title" className={styles.title}>
            Stories
          </h1>
          {/* Show Add Button on Mobile */}
          {isMobile && (
            <button className={styles.addButton}>+ New Story</button>
          )}
        </div>

        {/* Filters & Controls */}
        <div className="spaced-flex">
          <div className={styles.filters}>
            <Search
              value={searchQuery}
              onSearch={(query) => handleSearch(query)}
            />
            <Select
              selected={status}
              options={STATUS_OPTIONS}
              onChange={(option) => handleStatusChange(option)}
            />
            {!isMobile && totalRecords ? (
              <span
                className={styles.pageInfo}
              >{`Showing ${showingFrom} to ${showingTo} of ${totalRecords}`}</span>
            ) : null}
          </div>

          {/* Show Add Button on Desktop */}
          {!isMobile && (
            <button className={styles.addButton}>+ New Story</button>
          )}
        </div>
      </div>

      {/* Stories Table */}
      <section aria-labelledby="stories-title">
        <Table<Story>
          ariaLabel="Stories"
          data={data}
          loading={loading}
          currentPage={currentPage}
          totalPages={totalPages}
          columns={STORY_COLOUMNS}
          hasNextPage={hasNextPage}
          hasPrevPage={hasPrevPage}
          pageOption={pageOption}
          goToNextPage={goToNextPage}
          goToPrevPage={goToPrevPage}
          changePageSize={changePageSize}
          onEdit={(item) => console.log("Edit clicked", item)}
          onDelete={handleDelete}
          onSortClick={handleSortClick}
        />
      </section>
    </div>
  );
};

export default Stories;
