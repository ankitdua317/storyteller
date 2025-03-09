import { ColumnConfig } from "../models/Table";
import Story from "../models/Story";

/** Table column configurations for the Stories table */
const STORY_COLUMNS: ColumnConfig<Story>[] = [
  {
    header: "Title",
    accessor: "title",
    render: ({ title, published_date }) => (
      <>
        <div style={{ color: "#1c62eb" }}>{title}</div>
        <div>{published_date ? published_date : "(No publish date set)"}</div>
      </>
    ),
    sorting: true,
  },
  { header: "Last Modified", accessor: "last_modified" },
  {
    header: "Status",
    accessor: "status",
    render: (item) => (
      <span className={`pill pill-${item.status}`}>{item.status}</span>
    ),
  },
  { header: "Live From", accessor: "live_from" },
  { header: "Ends", accessor: "ends" },
];

export default STORY_COLUMNS;
