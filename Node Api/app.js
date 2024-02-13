const express = require("express");
const cors = require("cors");
const pool = require("./db");

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

  try {
    const allRecipes = await pool.query("SELECT * FROM recipe");

    const finalData = allRecipes.rows.filter((s) => {
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
        return ready_in.split(",").includes(f1.readyIn);
      }
      return f1;
    });

    const finalDataProcess3 = finalDataProcess2.filter((f) => {
      if (diet) return f.diet === diet;
      return f;
    });

    const finalDataProcess4 = page
      ? finalDataProcess3.slice((page - 1) * 9, page * 9)
      : finalDataProcess3;

    setTimeout(() => {
      if (finalDataProcess4.length)
        return res.status(200).json(finalDataProcess4);
      else {
        return res.status(404).json("Page does not exist");
      }
    }, 1000);
  } catch (err) {
    res.status(400).json("not found");
    console.log(err);
  }
});

app.get("/api/fetchRecipes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await pool.query("SELECT * FROM recipe WHERE id=$1", [id]);
    return res.status(200).json(recipe.rows);
  } catch (err) {
    console.log(err);
  }
});

app.put("/api/fetchRecipes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    console.log(title, id);
    await pool.query("UPDATE recipe SET title = $1 WHERE id = $2", [title, id]);

    return res.status(200).json("recipe updated");
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/fetchRecipes/", async (req, res) => {
  try {
    const {
      id,
      title,
      image,
      imagetype,
      calories,
      fat,
      protein,
      carbs,
      diet,
      readyin,
    } = req.body;

    if (
      !(
        id &&
        title &&
        image &&
        imagetype &&
        calories &&
        fat &&
        protein &&
        carbs &&
        diet &&
        readyin
      )
    )
      return res.json("provide all data");

    await pool.query(
      "INSERT into recipe (id, title, image, imagetype, calories,fat,protein,carbs,diet,readyin) VALUES ($1, $2, $3, $4, $5,$6,$7,$8,$9,$10)",
      [
        id,
        title,
        image,
        imagetype,
        calories,
        fat,
        protein,
        carbs,
        diet,
        readyin,
      ]
    );

    return res.status(200).json("recipe created");
  } catch (err) {
    res.status(400).json("something went wrong");
    console.log(err);
  }
});

app.delete("/api/fetchRecipes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM recipe WHERE id = $1", [id]);
    return res.status(200).json("row deleted");
  } catch (err) {
    res.status(400).json("bad request");
    console.log(err);
  }
});

app.listen(5000, () => {
  console.log("listening on port 5000");
});
