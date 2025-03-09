import { Option } from "../components/Input/Select";

export interface ColumnConfig<T> {
  header: string;
  accessor: keyof T;
  render?: (item: T) => React.ReactNode; // Allows custom rendering for each column
  sorting?: boolean; // If the coloumn should allow sorting
}

export type SortBy = "inc" | "dec";

export interface TableProps<T> {
  loading: boolean;
  data: T[];
  columns: ColumnConfig<T>[];
  pageOption: Option;
  currentPage: number;
  totalPages: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  ariaLabel?: string;
  goToPrevPage: VoidFunction;
  goToNextPage: VoidFunction;
  changePageSize: (option: Option) => void;
  onEdit: (item: T) => void;
  onDelete: (item: T) => void;
  onSortClick?: (accessor: keyof T, sortBy: SortBy) => void;
}
