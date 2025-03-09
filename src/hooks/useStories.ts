import { useEffect, useMemo, useState } from "react";
import fetchStories from "../api/fetchStories";
import Story from "../models/Story";
import {
  PAGINATOR_ROWS_OPTIONS,
  STATUS_OPTIONS,
} from "../constants/selectOptions";
import { Option } from "../components/Input/Select";
import useDebounce from "./useDebounce";
import { SortBy } from "../models/Table";

const useStories = () => {
  // State management
  const [totalData, setTotalData] = useState<Story[]>([]);
  const [pageOption, setPageOption] = useState<Option>(
    PAGINATOR_ROWS_OPTIONS[0]
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [status, setStatus] = useState<Option>(STATUS_OPTIONS[0]);
  const [filterText, setFilterText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const pageSize = Number(pageOption.value); // Ensure `pageSize` is a number

  // Filters data based on search text and status selection
  const filteredData = useMemo(() => {
    return totalData
      .filter(({ title }) => title.toLowerCase().includes(filterText))
      .filter(({ status: itemStatus }) =>
        status.value === "all" ? true : itemStatus === status.value
      );
  }, [status.value, totalData, filterText]);

  // Paginates the filtered data
  const paginatedData = useMemo(() => {
    return filteredData.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
    );
  }, [currentPage, pageSize, filteredData]);

  const totalPages = Math.ceil(filteredData.length / pageSize);

  // Pagination controls
  const goToNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const goToPrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  // Changes page size and resets pagination
  const changePageSize = (option: Option) => {
    setPageOption(option);
    setCurrentPage(1);
  };

  // Handles search input with debouncing to improve performance
  const debouncedSearch = useDebounce((value: string) => {
    setFilterText(value);
    setCurrentPage(1);
  }, 500);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    debouncedSearch(value);
  };

  // Handles status filter change
  const handleStatusChange = (option: Option) => {
    setStatus(option);
    setCurrentPage(1);
  };

  // Handles sorting
  const handleSortClick = (accessor: keyof Story, sortBy: SortBy) => {
    const sortedData = [...totalData].sort((a, b) => {
      const valueA = a[accessor];
      const valueB = b[accessor];

      if (typeof valueA === "string" && typeof valueB === "string") {
        return sortBy === "inc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }

      if (typeof valueA === "number" && typeof valueB === "number") {
        return sortBy === "inc" ? valueA - valueB : valueB - valueA;
      }

      return 0; // Fallback if values are not sortable
    });

    setTotalData(sortedData);
  };

  // Handles deleting of record
  const handleDelete = (item: Story) => {
    setTotalData((prev) => prev.filter((story) => story.id !== item.id));
  };

  // Fetches story data on component mount
  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const response = await fetchStories();
        setTotalData(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  return {
    loading,
    totalPages,
    totalRecords: filteredData.length,
    data: paginatedData,
    currentPage,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
    pageOption,
    searchQuery,
    status,
    showingFrom: (currentPage - 1) * 10 + 1,
    showingTo: Math.min(currentPage * 10, filteredData.length),
    goToNextPage,
    goToPrevPage,
    changePageSize,
    handleSearch,
    handleStatusChange,
    handleSortClick,
    handleDelete,
  };
};

export default useStories;
