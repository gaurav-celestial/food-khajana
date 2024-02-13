const fetchRecipes = async function () {
  try {
    const res = await fetch(
      "https://api.spoonacular.com/recipes/complexSearch?apiKey=d9a6815e0b804cfb8aa5bef32c30187d&number=1000"
    );

    if (!res.ok) throw new Error("Error Occured");

    const data = await res.json();
    console.log(data);

    fs.writeFile("./content/all-recipes.txt", JSON.stringify(data), (err) => {
      if (err) {
        console.error("Error writing to file:", err);
        return;
      }
      console.log("File written successfully!");
    });
  } catch (err) {
    console.log(err);
  }
};

async function insertToRecipeSummary() {
  fs.readFile("./content/recipesSummary.json", "utf8", (err, data) => {
    if (err) {
      console.log("error reading file", err);
      return;
    }

    JSON.parse(data).results.map(async (s) => {
      console.log(s.summary);
      await pool.query(
        "INSERT INTO recipe_summary (id,title,image,summary,ingredients) VALUES($1,$2,$3,$4,$5) RETURNING *",
        [s.id, s.title, s.image, s.summary, JSON.stringify(s.ingredients)]
      );
    });
  });
}

export { fetchRecipes, insertToRecipeSummary };
