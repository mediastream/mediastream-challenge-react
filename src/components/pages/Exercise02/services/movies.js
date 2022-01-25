export const getMovies = ({ limit }) =>
  fetch(`http://localhost:3001/movies?_limit=${limit}`);
