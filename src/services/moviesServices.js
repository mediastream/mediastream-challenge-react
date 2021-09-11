export const fetchMovies = async() => {
  return  fetch("http://localhost:3001/movies?_limit=50")
    .then((res) => res.json())
    .catch(() => {
      console.log("Run yarn movie-api for fake api")
    })
}
