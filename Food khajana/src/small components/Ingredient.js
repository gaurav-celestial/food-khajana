import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
const Ingredient = ({ data, values }) => {
    console.log(values, data);
    const weight = values === "us" ? data.amount.us.value : data.amount.metric.value;
    const unit = values === "us" ? data.amount.us.unit : data.amount.metric.unit;
    return (_jsxs("div", { className: "ingredient", children: [_jsxs("p", { children: [weight, " ", unit] }), _jsx("img", { src: `https://spoonacular.com/recipeImages/${data.image}`, width: "60", alt: "ing1" }), _jsx("p", { children: data.name })] }));
};
export default Ingredient;
