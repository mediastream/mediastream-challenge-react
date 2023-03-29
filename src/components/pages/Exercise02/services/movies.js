export const getMovies = async (gender = "", order = "") => {
  console.log("Getting movies");
  const hasGender = gender === "" ? "" : `&genres_like=${gender}`;
  const hasOrder = order === "" ? "" : `&_sort=year&_order=${order}`;
  try {
    const resp = await fetch(
      `http://localhost:3001/movies?_limit=50${hasGender}${hasOrder}`
    );
    return await resp.json();
  } catch (error) {
    console.log("Run yarn movie-api for fake api", error);
  }
};
