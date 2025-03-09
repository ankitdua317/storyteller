export interface ColumnConfig<T> {
  header: string;
  accessor: keyof T;
  render?: (item: T) => React.ReactNode; // Allows custom rendering for each column
  sorting?: boolean; // If the coloumn should allow sorting
}

export interface TableProps<T> {
  ariaLabel: string;
  loading: boolean;
  pageSize: number;
  columns: ColumnConfig<T>[];
  data: T[];
  goToPrevPage: VoidFunction;
  hasPrevPage: boolean;
  goToNextPage: VoidFunction;
  hasNextPage: boolean;
  onEdit: (item: T) => void;
  onDelete: (item: T) => void;
}
