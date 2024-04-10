import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./components/Homepage";
import RecipeDetail from "./components/RecipeDetail";
import Login from "./components/Login";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
const queryClient = new QueryClient();
function App() {
    const [apiKey, setApiKey] = useState("");
    const handleApiKey = function (val) {
        setApiKey(val);
    };
    useEffect(() => {
        const apiKeyLocalStorage = localStorage.getItem("apiKey");
        setApiKey(apiKeyLocalStorage);
    }, []);
    return (_jsx(QueryClientProvider, { client: queryClient, children: _jsx(Router, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: apiKey ? _jsx(Homepage, {}) : _jsx(Login, { handleApiKey: handleApiKey }) }), _jsx(Route, { path: "/:id", element: _jsx(RecipeDetail, {}) })] }) }) }));
}
export default App;
