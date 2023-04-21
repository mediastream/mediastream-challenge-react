async function getMoviesApi() {
  try {
    const response = await fetch("http://localhost:3001/movies?_limit=50");
    const json = await response.json();

    const mapMoviesJSON = json.map((movie) => ({
      id: movie.id,
      title: movie.title,
      genres: movie.genres,
      year: movie.year,
      posterUrl: movie.posterUrl,
      actors: movie.actors,
      director: movie.director,
      plot: movie.plot,
      runtime: movie.runtime,
    }));
    return mapMoviesJSON;
  } catch (e) {
    console.log("Run yarn movie-api for fake api");
    throw new Error("Run yarn movie-api for fake api");
  }
}

async function getGenresApi() {
  try {
    const response = await fetch("http://localhost:3001/genres");
    const genresJSON = await response.json();
    genresJSON.unshift("Todos");
    return genresJSON;
  } catch (e) {
    console.log("Run yarn movie-api for fake api");
    throw new Error("Run yarn movie-api for fake api");
  }
}



export { getMoviesApi, getGenresApi };
