const Ingredient = ({ data, values }) => {
  console.log(values);

  const weight =
    values === "us" ? data.metric.weight / 250 : data.metric.weight;
  const unit = values === "us" ? "cups" : "grams";

  return (
    <div className="ingredient">
      <p>
        {weight} {unit}
      </p>
      <img src={`/ingredients/${data.image}`} width="60" alt="ing1" />
      <p>{data.name}</p>
    </div>
  );
};

export default Ingredient;
