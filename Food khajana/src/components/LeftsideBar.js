import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import RangeSelector from "../small components/RangeSelector";
const LeftsideBar = ({ handleFilterChange, handleRangeFilterChange }) => {
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: "diet-filter filter", children: [_jsx("h2", { children: "Diet" }), _jsxs("div", { className: "input-group", children: [_jsx("input", { type: "checkbox", id: "gluten-free", name: "gluten-free", value: "gluten-free", onChange: () => {
                                    handleFilterChange("diet", "gluten_free");
                                } }), _jsx("label", { htmlFor: "gluten-free", children: " gluten free" })] }), _jsxs("div", { className: "input-group", children: [_jsx("input", { type: "checkbox", id: "vegetarian", name: "vegetarian", value: "vegetarian", onChange: () => {
                                    handleFilterChange("diet", "vegetarian");
                                } }), _jsx("label", { htmlFor: "vegetarian", children: " vegetarian" })] })] }), _jsxs("div", { className: "ready-in-filter filter", children: [_jsx("h2", { children: "Ready In" }), _jsxs("div", { className: "input-group", children: [_jsx("input", { type: "checkbox", id: "10mins", name: "10mins", value: "10 mins", onChange: () => {
                                    handleFilterChange("ready_in", "<_10_minutes");
                                } }), _jsx("label", { htmlFor: "10mins", children: " < 10 minutes" })] }), _jsxs("div", { className: "input-group", children: [_jsx("input", { type: "checkbox", id: "20mins", name: "20mins", value: "20 min", onChange: () => {
                                    handleFilterChange("ready_in", "<_20_minutes");
                                } }), _jsx("label", { htmlFor: "20mins", children: " < 20 minutes" })] }), _jsxs("div", { className: "input-group", children: [_jsx("input", { type: "checkbox", id: "30mins", name: "30mins", value: "30 min", onChange: () => {
                                    handleFilterChange("ready_in", "<_30_minutes");
                                } }), _jsx("label", { htmlFor: "30mins", children: " < 30 minutes" })] }), _jsxs("div", { className: "input-group", children: [_jsx("input", { type: "checkbox", id: "1hour", name: "1hour", value: "1 hour", onChange: () => {
                                    handleFilterChange("ready_in", "<_60_minutes");
                                } }), _jsx("label", { htmlFor: "1hour", children: " < 1 hour" })] }), _jsxs("div", { className: "input-group", children: [_jsx("input", { type: "checkbox", id: "1.5hours", name: "1.5hours", value: "1.5 hours", onChange: () => {
                                    handleFilterChange("ready_in", "<_90_minutes");
                                } }), _jsx("label", { htmlFor: "1.5hours", children: " < 1.5 hours" })] })] }), _jsx("div", { className: "calories-filter range-filter", children: _jsx(RangeSelector, { type: "Calories", handleRangeFilterChange: handleRangeFilterChange, min: 10, max: 1000 }) }), _jsx("div", { className: "protein-filter range-filter", children: _jsx(RangeSelector, { type: "Protein", handleRangeFilterChange: handleRangeFilterChange, min: 0.1, max: 100 }) }), _jsx("div", { className: "fat-filter range-filter", children: _jsx(RangeSelector, { type: "Fat", handleRangeFilterChange: handleRangeFilterChange, min: 0.1, max: 100 }) }), _jsx("div", { className: "carbs-filter range-filter", children: _jsx(RangeSelector, { type: "Carbs", handleRangeFilterChange: handleRangeFilterChange, min: 0.1, max: 100 }) })] }));
};
export default LeftsideBar;
