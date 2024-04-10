import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const RecipeItemCard = ({ imageUrl, title, onClick }) => {
    return (_jsxs("div", { className: "recipe-item", onClick: onClick, children: [_jsx("img", { src: imageUrl, alt: title }), _jsx("h2", { children: title })] }));
};
export default RecipeItemCard;
