import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Slider } from "@mui/material";
import { useRef, useState } from "react";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
const RangeSelector = ({ type, handleRangeFilterChange, min, max }) => {
    const [value, setValue] = useState([min, max]);
    const handleChange = (event, newValue, activeThumb) => {
        setValue(newValue);
        //MATERIAL UI CODE
        const minDistance = min;
        if (activeThumb === 0) {
            setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
        }
        else {
            setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
        }
    };
    function valuetext(value) {
        return `${value}`;
    }
    const handleMouseLeave = function () {
        handleRangeFilterChange(type, value);
    };
    const minRef = useRef();
    const maxRef = useRef();
    return (_jsxs(_Fragment, { children: [_jsx("h2", { children: type }), _jsx(Slider, { getAriaLabel: () => "Calories range", value: value, onChange: handleChange, valueLabelDisplay: "auto", getAriaValueText: valuetext, max: max, min: min, sx: { width: "200px" }, disableSwap: true, onMouseLeave: handleMouseLeave }), _jsxs("div", { className: "minmax ", children: [_jsxs("div", { className: "min", children: [_jsx("p", { children: "Min" }), _jsx("input", { type: "number", ref: minRef, onChange: () => {
                                    setValue((prev) => {
                                        return [Number(minRef.current.value), prev[1]];
                                    });
                                }, max: max, min: min, value: value[0] })] }), _jsxs("div", { className: "max", children: [_jsx("p", { children: "Max" }), _jsx("input", { type: "number", ref: maxRef, onChange: () => {
                                    setValue((prev) => {
                                        return [prev[0], Number(maxRef.current.value)];
                                    });
                                }, max: max, min: min, value: value[1] })] }), _jsx("span", { children: _jsx(ArrowCircleRightOutlinedIcon, { onClick: handleMouseLeave, sx: { color: "#3f51b5" } }) })] })] }));
};
export default RangeSelector;
