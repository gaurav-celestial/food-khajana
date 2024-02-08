import "./RecipeDetail.css";
import logo from "/logo.png";

import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchRecipeSummary } from "../utils/fetchRecipeSummary";
import Nav from "../small components/Nav";
import Ingredient from "../small components/Ingredient";

const RecipeDetail = () => {
  const { id } = useParams();

  const { data, isPending, isError, error } = useQuery({
    queryKey: [id],
    queryFn: ({ signal }) => fetchRecipeSummary({ signal, id }),
  });

  console.log(data);

  const [currentIngsView, setCurrentIngsView] = useState("grid");
  const [currentIngsValues, setCurrentIngsValues] = useState("metric");
  return (
    <>
      <Nav />
      <div className="recipe-detail">
        <h1 className="recipe-title">{data?.title}</h1>
        <section className="hero-section">
          <div className="row flex"></div>
        </section>
        <section className="description">
          <div className="desc1">{data?.summary}</div>
        </section>

        <section className="ingredients">
          <div className="ingredients-listing">
            <h2>Ingredients</h2>
            <div className="listing-type">
              <div className="tabs flex">
                <div
                  className={`grid ${
                    currentIngsView === "grid" ? "active-tab" : false
                  }`}
                  onClick={() => {
                    setCurrentIngsView("grid");
                  }}
                >
                  grid
                </div>
                <div
                  className={`list ${
                    currentIngsView === "list" ? "active-tab" : false
                  }`}
                  onClick={() => {
                    setCurrentIngsView("list");
                  }}
                >
                  list
                </div>
                <p>serving input</p>
              </div>
              <div className="quantity-type tabs flex">
                <div
                  className={`metric ${
                    currentIngsValues === "metric" ? "active-tab" : false
                  }`}
                  onClick={() => {
                    setCurrentIngsValues("metric");
                  }}
                >
                  metric
                </div>
                <div
                  className={`us ${
                    currentIngsValues === "us" ? "active-tab" : false
                  }`}
                  onClick={() => {
                    setCurrentIngsValues("us");
                  }}
                >
                  US
                </div>
              </div>
            </div>

            <div className="listing-data">
              {currentIngsView === "grid" && (
                <div className="listing-data-grid">
                  {data?.ingredients.map((d) => {
                    return (
                      <Ingredient
                        key={d.name}
                        data={d}
                        values={currentIngsValues}
                      />
                    );
                  })}
                </div>
              )}

              {currentIngsView === "list" && (
                <div className="listing-data-list">
                  {data?.ingredients.map((d) => {
                    return (
                      <>
                        <Ingredient
                          key={d.name}
                          data={d}
                          values={currentIngsValues}
                        />
                        <hr />
                      </>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default RecipeDetail;
