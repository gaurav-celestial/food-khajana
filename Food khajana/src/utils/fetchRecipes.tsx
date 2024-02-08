import {
  processDietFilters,
  processRangeFilters,
  processReadyInFilters,
} from "./processDietFilters";

export const fetchRecipes = async function ({
  signal,
  searchTerm,
  queryData,
  rangeQueryData,
  pageParam,
}) {
  const dietFilterData = processDietFilters(queryData);
  const rangeFilterData = processRangeFilters(rangeQueryData);
  const readyInFilterData = processReadyInFilters(queryData);

  const dietFilterDataFinal = dietFilterData ? "&diet=" + dietFilterData : "";
  const rangeFilterDataFinal = rangeFilterData ? "&" + rangeFilterData : "";
  const readyInFilterDataFinal = readyInFilterData
    ? "&ready_in=" + readyInFilterData
    : "";
  const searchTermFinal = searchTerm ? "&searchTerm=" + searchTerm : "";
  const pageNum = pageParam ? "&page=" + pageParam : "";

  const url = `http://localhost:5000/api/fetchRecipes?apiKey=abc${dietFilterDataFinal}${rangeFilterDataFinal}${readyInFilterDataFinal}${searchTermFinal}${pageNum}`;

  const res = await fetch(url, signal);

  if (!res.ok) {
    const error = new Error("An error occured while fetching the data");
    error.code = res.status;
    error.info = await res.json();
    throw error;
  }

  const resData = await res.json();
  return resData;
};
