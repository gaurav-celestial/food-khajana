import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import pizzaImg from "/pizza2.jpg";
import "./login.css";
import { useState } from "react";
import Modal from "../small components/Modal";
const Login = ({ handleApiKey }) => {
    const [showModal, setShowModal] = useState(false);
    console.log(showModal);
    return (_jsxs("div", { className: "header", children: [_jsx("img", { className: "pizza-img", src: pizzaImg, alt: "pizza image" }), _jsx("h1", { className: "hero-heading", children: "All Your Food. One Place." }), _jsxs("div", { className: "start-now-btn", onClick: () => {
                    setShowModal((prev) => !prev);
                }, children: [_jsx("h1", { children: "Start Now!" }), _jsx("p", { children: "(yup, it's free)" })] }), _jsx(Modal, { handleApiKey: handleApiKey, showModal: showModal }), _jsx("div", { onClick: () => {
                    setShowModal(false);
                }, className: `modal-overlay ${showModal ? "overlay-animate" : false}` })] }));
};
export default Login;
