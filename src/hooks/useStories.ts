import { useEffect, useState } from "react";
import fetchStories from "../api/fetchStories";
import Story from "../models/Story";

const useStories = () => {
  const [totalData, setTotalData] = useState<Story[]>([]);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const totalPages = Math.ceil(totalData.length / pageSize);

  const goToNextPage = () => setCurrentPage((prev) => prev + 1);
  const goToPrevPage = () => setCurrentPage((prev) => prev - 1);
  const gotToPage = (page: number) => setCurrentPage(page);

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
    currentData: totalData.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
    ),
    currentPage,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
    pageSize,
    goToNextPage,
    goToPrevPage,
    gotToPage,
  };
};

export default useStories;
