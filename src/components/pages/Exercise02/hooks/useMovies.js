import { useEffect, useState } from "react";

export function useFetchMovies(filters) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const filtersQueryParams = [
      filters.gender && `genres_like=${filters.gender}`,
      `_sort=year&_order=${filters.orderBy}`,
    ].filter(Boolean);

    fetch(
      `http://localhost:3001/movies?_limit=50&${filtersQueryParams.join("&")}`
    )
      .then((res) => res.json())
      .then(setMovies)
      .catch(() => alert("Failed to fetch movies"))
      .finally(() => setLoading(false));
  }, [filters.orderBy, filters.gender]);

  return { isLoading, movies };
}
