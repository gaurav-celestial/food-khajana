import "./Homepage.css";
import pizzaImg from "/pizza.jpg";

import RecipeItemCard from "./RecipeItemCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchRecipes } from "../utils/fetchRecipes.ts";
import { useNavigate } from "react-router-dom";
import Nav from "../small components/Nav";

import { useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import { useInView } from "react-intersection-observer";
import LeftsideBar from "./LeftsideBar.tsx";

const Homepage = () => {
  const navigate = useNavigate();

  const { ref, inView } = useInView();

  const [searchTerm, setSearchTerm] = useState("");

  const [rangeQueryData, setRangeQueryData] = useState({
    minCalories: "",
    maxCalories: "",
    minProtein: "",
    maxProtein: "",
    minFat: "",
    maxFat: "",
    minCarbs: "",
    maxCarbs: "",
  });

  const [queryData, setQueryData] = useState({
    diet: {
      gluten_free: false,
      vegetarian: false,
    },
    ready_in: {
      "<_10_minutes": false,
      "<_20_minutes": false,
      "<_30_minutes": false,
      "<_60_minutes": false,
      "<_90_minutes": false,
    },
  });

  const { data, status, error, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: [searchTerm, queryData, rangeQueryData],
    queryFn: ({ signal, pageParam }) =>
      fetchRecipes({
        signal,
        searchTerm,
        queryData,
        rangeQueryData,
        pageParam,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage?.length < 9 ? undefined : allPages.length + 1;

      return nextPage;
    },
  });

  console.log(error);

  const handleRecipeClick = function (id) {
    navigate(`/${id}`);
  };

  const handleRangeFilterChange = function (type, newValue) {
    if (type === "Calories") {
      setRangeQueryData((prev) => {
        return { ...prev, minCalories: newValue[0], maxCalories: newValue[1] };
      });
    }
    if (type === "Protein") {
      setRangeQueryData((prev) => {
        return { ...prev, minProtein: newValue[0], maxProtein: newValue[1] };
      });
    }
    if (type === "Fat") {
      setRangeQueryData((prev) => {
        return { ...prev, minFat: newValue[0], maxFat: newValue[1] };
      });
    }
    if (type === "Carbs") {
      setRangeQueryData((prev) => {
        return { ...prev, minCarbs: newValue[0], maxCarbs: newValue[1] };
      });
    }
  };

  const handleFilterChange = function (type, newValue) {
    if (type === "diet")
      setQueryData((prev) => {
        return {
          ...prev,
          diet: { ...prev.diet, [newValue]: !prev.diet[newValue] },
        };
      });

    if (type === "ready_in")
      setQueryData((prev) => {
        return {
          ...prev,
          ready_in: { ...prev.ready_in, [newValue]: !prev.ready_in[newValue] },
        };
      });
  };

  const putSearchTerm = function (val) {
    setSearchTerm(val);
  };

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  return (
    <>
      <div className="header">
        <img className="pizza-img" src={pizzaImg} alt="pizza image" />
        <Nav type="Homepage" putSearchTerm={putSearchTerm} />
      </div>
      <div className="main">
        <div className="sidebar">
          <LeftsideBar
            handleFilterChange={handleFilterChange}
            handleRangeFilterChange={handleRangeFilterChange}
          />
        </div>
        {data && (
          <div className="recipes">
            {data?.pages.map((page) =>
              page.results.map((recipeItem) => {
                return (
                  <RecipeItemCard
                    key={recipeItem.id}
                    imageUrl={recipeItem.image}
                    title={recipeItem.title}
                    onClick={() => {
                      handleRecipeClick(recipeItem.id);
                    }}
                  />
                );
              })
            )}
            <p ref={ref} className="fetch-more">
              {!hasNextPage ? "Looks like there's nothing more" : "Loading"}
            </p>
          </div>
        )}
        {status === "pending" && (
          <Box className="loading-container" textAlign="center">
            <CircularProgress />{" "}
          </Box>
        )}
        {status === "error" && (
          <p>Your daily limit has been exhausted. Payment required</p>
        )}
      </div>
    </>
  );
};

export default Homepage;
