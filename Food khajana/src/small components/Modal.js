import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
const Modal = ({ showModal, handleApiKey }) => {
    const [apiKey, setApiKey] = useState();
    const [isPending, setIsPending] = useState(false);
    const [apiResponse, setApiResponse] = useState();
    const handleSubmit = function () {
        async function fetchApiTest() {
            setIsPending(true);
            const res = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}`);
            const data = await res.json();
            setIsPending(false);
            setApiResponse(data);
            if (data.code != 401) {
                handleApiKey(apiKey);
                localStorage.setItem("apiKey", apiKey);
            }
        }
        fetchApiTest();
    };
    useEffect(() => {
        if (!showModal) {
            setApiResponse("");
            setApiKey("");
        }
    }, [showModal]);
    return (_jsxs("div", { className: `modal ${showModal ? "modal-animate" : false}`, children: [_jsx("h3", { children: "Api Key" }), _jsxs("div", { children: [_jsx("input", { value: apiKey, onChange: (e) => {
                            setApiKey(e.target.value);
                        }, type: "text" }), isPending ? (_jsx(CircularProgress, {})) : (_jsx("button", { onClick: handleSubmit, children: "Submit" }))] }), apiResponse?.code === 401 && apiKey != undefined && (_jsx("p", { children: "Invalid api key" }))] }));
};
export default Modal;
