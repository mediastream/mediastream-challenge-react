export const getMovies = async ({ genres, order }) => {
  try {
    let url = "http://localhost:3001/movies?_limit=50";
    if (genres) {
      url += `&genres_like=${genres}`;
    }
    if (order) {
      url += `&_sort=year&_order=${order}`;
    }
    const resp = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await resp.json();
  } catch (error) {
    console.log("Run yarn movie-api for fake api");
    return null;
  }
};
