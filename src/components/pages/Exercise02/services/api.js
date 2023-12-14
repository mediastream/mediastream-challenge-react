export const getMovies = async () => {
  const response = await fetch("http://localhost:3001/movies?_limit=50");
  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }
  return response.json();
};

export const getGenres = async () => {
  const response = await fetch("http://localhost:3001/genres");
  if (!response.ok) {
    throw new Error("Error fetching genres");
  }
  return response.json();
};
