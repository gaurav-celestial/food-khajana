export const fetchRecipeSummary = async function ({ signal, id }) {
  const url = `http://localhost:5000/api/fetchRecipes/${id}`;

  console.log(url);

  const res = await fetch(url, signal);

  if (!res.ok) {
    const error = new Error("An error occured while fetching the data");
    error.code = res.status;
    error.info = await res.json();
    throw error;
  }

  const resData = await res.json();
  return resData[0];
};
