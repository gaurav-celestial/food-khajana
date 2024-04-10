import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import "./RecipeDetail.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchRecipeSummary } from "../utils/fetchRecipeSummary";
import Nav from "../small components/Nav";
import Ingredient from "../small components/Ingredient";
import { Box, CircularProgress } from "@mui/material";
const RecipeDetail = () => {
    const { id } = useParams();
    const { data, isPending, isError, error } = useQuery({
        queryKey: [id],
        queryFn: ({ signal }) => fetchRecipeSummary({ signal, id }),
    });
    console.log(data);
    const [currentIngsView, setCurrentIngsView] = useState("grid");
    const [currentIngsValues, setCurrentIngsValues] = useState("metric");
    useEffect(() => {
        setTimeout(() => {
            if (data)
                document.querySelector(".desc1").innerHTML = data?.[0]?.summary;
        }, 200);
        //because returned data is in html format
    }, [data]);
    return (_jsx(_Fragment, { children: data?.[0].code === 402 ? (_jsx("p", { children: "Your daily limit has been exhausted. Payment required" })) : isPending ? (_jsxs(Box, { className: "loading-container-center", textAlign: "center", children: [_jsx(CircularProgress, {}), " "] })) : isError ? (_jsx("p", { children: "Your daily limit has been exhausted. Payment required" })) : (_jsxs(_Fragment, { children: [_jsx(Nav, {}), _jsxs("div", { className: "recipe-detail", children: [_jsx("h1", { className: "recipe-title", children: data?.[0]?.title }), _jsx("section", { className: "hero-section", children: _jsx("div", { className: "row flex" }) }), _jsx("section", { className: "description", children: _jsx("div", { className: "desc1" }) }), _jsx("section", { className: "ingredients", children: _jsxs("div", { className: "ingredients-listing", children: [_jsx("h2", { children: "Ingredients" }), _jsxs("div", { className: "listing-type", children: [_jsxs("div", { className: "tabs flex", children: [_jsx("div", { className: `grid ${currentIngsView === "grid" ? "active-tab" : false}`, onClick: () => {
                                                            setCurrentIngsView("grid");
                                                        }, children: "grid" }), _jsx("div", { className: `list ${currentIngsView === "list" ? "active-tab" : false}`, onClick: () => {
                                                            setCurrentIngsView("list");
                                                        }, children: "list" }), _jsx("p", { children: "serving input" })] }), _jsxs("div", { className: "quantity-type tabs flex", children: [_jsx("div", { className: `metric ${currentIngsValues === "metric" ? "active-tab" : false}`, onClick: () => {
                                                            setCurrentIngsValues("metric");
                                                        }, children: "metric" }), _jsx("div", { className: `us ${currentIngsValues === "us" ? "active-tab" : false}`, onClick: () => {
                                                            setCurrentIngsValues("us");
                                                        }, children: "US" })] })] }), _jsxs("div", { className: "listing-data", children: [currentIngsView === "grid" && (_jsx("div", { className: "listing-data-grid", children: data?.[1]?.ingredients?.map((d) => {
                                                    return (_jsx(Ingredient, { data: d, values: currentIngsValues }, d.name));
                                                }) })), currentIngsView === "list" && (_jsx("div", { className: "listing-data-list", children: data?.[1]?.ingredients?.map((d) => {
                                                    return (_jsxs(_Fragment, { children: [_jsx(Ingredient, { data: d, values: currentIngsValues }, d.name), _jsx("hr", {})] }));
                                                }) }))] })] }) })] })] })) }));
};
export default RecipeDetail;
