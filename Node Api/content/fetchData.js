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

export { fetchRecipes };
