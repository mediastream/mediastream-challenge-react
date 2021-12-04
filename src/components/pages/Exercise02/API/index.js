export const getGenres = () => {
  return fetch(`http://localhost:3001/genres`)
    .then((res) => res.json())
    .catch(() => {
      console.log("Run yarn movie-api for fake api");
    });
};

export const handleMovieFetch = (order) => {
  console.log("Getting movies");
  return fetch(
    `http://localhost:3001/movies?_limit=50&_sort=year&_order=${order}`
  )
    .then((res) => res.json())
    .catch(() => {
      console.log("Run yarn movie-api for fake api");
    });
};

export const getMoviesBygender = (gender, order) => {
  console.log("looking for", gender);
  const url = `http://localhost:3001/movies?genres_like=${gender}&_limit=50&_sort=year&_order=${order}`;
  return fetch(url)
    .then((res) => res.json())
    .catch(() => {
      console.log("Run yarn movie-api for fake api");
    });
};
