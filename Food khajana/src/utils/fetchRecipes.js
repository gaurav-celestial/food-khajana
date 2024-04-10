import { processDietFilters, processRangeFilters, processReadyInFilters, } from "./processDietFilters";
export const fetchRecipes = async function ({ signal, searchTerm, queryData, rangeQueryData, pageParam, }) {
    const apiKey = localStorage.getItem("apiKey");
    const dietFilterData = processDietFilters(queryData);
    const rangeFilterData = processRangeFilters(rangeQueryData);
    const readyInFilterData = processReadyInFilters(queryData);
    const dietFilterDataFinal = dietFilterData ? "&diet=" + dietFilterData : "";
    const rangeFilterDataFinal = rangeFilterData ? "&" + rangeFilterData : "";
    const readyInFilterDataFinal = readyInFilterData
        ? "&maxReadyTime=" + readyInFilterData
        : "";
    const searchTermFinal = searchTerm ? "&query=" + searchTerm : "";
    const page = pageParam ? `&number=10&offset=${(pageParam - 1) * 10}` : "";
    const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}${dietFilterDataFinal}${rangeFilterDataFinal}${readyInFilterDataFinal}${searchTermFinal}${page}`;
    console.log(url);
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
