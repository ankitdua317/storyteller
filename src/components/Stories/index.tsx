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
    currentData,
    hasNextPage,
    hasPrevPage,
    pageSize,
    goToNextPage,
    goToPrevPage,
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
            <Search />
            <Select selected={STATUS_OPTIONS[0]} options={STATUS_OPTIONS} />
            {!isMobile && (
              <span className={styles.pageInfo}>Showing 1 to 20 of 176</span>
            )}
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
          data={currentData}
          loading={loading}
          columns={STORY_COLOUMNS}
          hasNextPage={hasNextPage}
          hasPrevPage={hasPrevPage}
          pageSize={pageSize}
          goToNextPage={goToNextPage}
          goToPrevPage={goToPrevPage}
          onEdit={(item) => console.log("Edit clicked", item)}
          onDelete={(item) => console.log("Delete clicked", item)}
        />
      </section>
    </div>
  );
};

export default Stories;
