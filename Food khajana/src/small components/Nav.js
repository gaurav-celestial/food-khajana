import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import logo from "/logo.png";
import Overlay from "./Overlay";
import { useNavigate } from "react-router-dom";
const Nav = ({ type, putSearchTerm }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [value, setValue] = useState("");
    const navigate = useNavigate();
    const inputRef = useRef();
    const handleFocus = function () {
        setIsFocused(true);
    };
    const handleBlur = function () {
        setIsFocused(false);
    };
    console.log(type);
    function handleKeyDown(e) {
        if (e.key === "Enter") {
            putSearchTerm(value);
            inputRef.current.blur();
        }
    }
    const handleChange = function (e) {
        setValue(e.target.value);
    };
    useEffect(() => {
        if (isFocused)
            document.body.style.overflow = "hidden";
        window.scrollTo({
            top: 0,
            behavior: "smooth", // Optional: Smooth scrolling animation
        });
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isFocused]);
    return (_jsxs("div", { onKeyDown: handleKeyDown, tabIndex: 0, className: type === "Homepage" ? "home-page-search-bar" : "normal-search-bar", children: [type === "Homepage" && (_jsx("div", { className: "title", children: _jsx("h2", { children: "Search, Save, and Share the Tastiest Food." }) })), _jsxs("div", { className: "container", children: [_jsxs("div", { className: "column1 flex", children: [_jsx("img", { src: logo, alt: "Food Khajana", className: type === "Homepage" ? "home-nav" : "normal-nav" }), _jsx("div", { className: "search-input-container", children: _jsx("input", { className: `search-input ${isFocused ? "input-animate" : false}`, ref: inputRef, type: "text", placeholder: "Search Food Khajana", onFocus: handleFocus, onBlur: handleBlur, onChange: handleChange, value: value }) })] }), _jsx("div", { className: "column2 flex", children: _jsx("div", { className: "profile", children: _jsx("p", { onClick: () => {
                                    localStorage.removeItem("apiKey");
                                    if (type === "Homepage") {
                                        location.reload(); //temporarily
                                    }
                                    else {
                                        console.log("here");
                                        navigate("/");
                                    }
                                }, children: "Log out" }) }) })] }), isFocused && _jsx(Overlay, {})] }));
};
export default Nav;
