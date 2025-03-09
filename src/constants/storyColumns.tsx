import { ColumnConfig } from "../models/Table";
import Story from "../models/Story";

/** Table column configurations for the Stories table */
const STORY_COLUMNS: ColumnConfig<Story>[] = [
  {
    header: "Title",
    accessor: "title",
    render: (item) => (
      <>
        <div style={{ color: "#1c62eb" }}>{item.title}</div>
        <div>{item.published_date}</div>
      </>
    ),
    sorting: true,
  },
  { header: "Last Modified", accessor: "last_modified" },
  {
    header: "Status",
    accessor: "status",
    render: (item) => (
      <span className={`pill pill-${item.status.toLowerCase()}`}>
        {item.status}
      </span>
    ),
  },
  { header: "Live From", accessor: "live_from" },
  { header: "Published", accessor: "published_date" },
  { header: "Ends", accessor: "ends" },
];

export default STORY_COLUMNS;
