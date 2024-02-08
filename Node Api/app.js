const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/fetchRecipes", async (req, res) => {
  const {
    minCalories = 10,
    maxCalories = 1000,
    minProtein = 0.1,
    maxProtein = 100,
    minFat = 0.1,
    maxFat = 100,
    minCarbs = 0.1,
    maxCarbs = 100,
    diet,
    apiKey,
    ready_in,
    searchTerm,
    page,
  } = req.query;

  console.log(page);

  fs.readFile("./content/all-recipes.json", "utf8", (err, data) => {
    if (err) {
      console.log("error reading file", err);
      return;
    }

    const finalData = JSON.parse(data).results.filter((s) => {
      if (searchTerm) return s.title.includes(searchTerm);
      return s;
    });

    const finalDataProcess1 = finalData.filter((d) => {
      return (
        d.calories >= minCalories &&
        d.calories <= maxCalories &&
        d.fat >= minFat &&
        d.fat <= maxFat &&
        d.carbs >= minCarbs &&
        d.carbs <= maxCarbs &&
        d.protein >= minProtein &&
        d.protein <= maxProtein
      );
    });

    const finalDataProcess2 = finalDataProcess1.filter((f1) => {
      if (ready_in) {
        // console.log(ready_in.split(","));
        return ready_in.split(",").includes(f1.readyIn);
      }
      return f1;
    });

    const finalDataProcess3 = finalDataProcess2.filter((f) => {
      if (diet) return f.diet === diet;
      return f;
    });

    const finalDataProcess4 = finalDataProcess3.slice((page - 1) * 9, page * 9);

    setTimeout(() => {
      if (finalDataProcess4.length)
        return res.status(200).json(finalDataProcess4);
      else {
        return res.status(404).json("Page does not exist");
      }
    }, 1000);
  });

  //   res.end("No data available");
});

app.get("/api/fetchRecipes/:id", async (req, res) => {
  const { id } = req.params;

  fs.readFile("./content/recipesSummary.json", "utf8", (err, data) => {
    if (err) {
      console.log("error reading file", err);
      return;
    }

    const selectedItem = JSON.parse(data).results.filter((d) => {
      return d.id === Number(id);
    });

    return res.status(200).json(selectedItem);
  });

  //   res.end("No data available");
});

app.listen(5000, () => {
  console.log("listening on port 5000");
});
