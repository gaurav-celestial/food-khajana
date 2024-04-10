const processDietFilters = function (queryData) {
    const dietFilters = [];
    Object.entries(queryData).forEach((data) => {
        if (data[0] === "diet") {
            const temp = Object.entries(data[1]).filter((dataInner) => {
                return dataInner[1];
            });
            dietFilters.push(...temp);
        }
    });
    const finalDiets = dietFilters.map((data) => {
        return data[0];
    });
    finalDiets.join("&");
    return finalDiets.join(",");
};
const processReadyInFilters = function (queryData) {
    const readyInFilter = [];
    Object.entries(queryData).forEach((data) => {
        if (data[0] === "ready_in") {
            const temp = Object.entries(data[1]).filter((dataInner) => {
                return dataInner[1];
            });
            readyInFilter.push(...temp);
        }
    });
    const finalReadyIn = readyInFilter.map((data) => {
        return Number(data[0].split("_")[1]);
    });
    return Math.max(...finalReadyIn, 0);
};
const processRangeFilters = function (rangeQueryData) {
    const finalRange = Object.entries(rangeQueryData).filter((data) => {
        return data[1];
    });
    const finalRange2 = finalRange.map((data) => {
        return `${data[0]}=${data[1]}`;
    });
    return finalRange2.join("&");
};
export { processDietFilters, processRangeFilters, processReadyInFilters };
