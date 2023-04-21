import React, { useEffect, useState, useRef } from "react";

import MovieCard from "./MovieCard";

function MoviesList({ currentGenre, orderMovies, movies }) {
  const KeyCompareMovies = "year";
  const [moviesFilter, setMoviesFilter] = useState([]);
  const moviesRef = useRef(movies);
  const currentGenreRef = useRef(currentGenre);
  const orderMoviesRef = useRef(orderMovies);

  useEffect(() => {
    moviesRef.current = movies;
    currentGenreRef.current = currentGenre;
    orderMoviesRef.current = orderMovies;
  });

  const compareValues = (key, order = "Ascending") => {
    return function innerSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // la propiedad no existe en ningún objeto
        return 0;
      }

      const varA = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
      const varB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return order === "Descending" ? comparison * -1 : comparison;
    };
  };

  useEffect(() => {
    if (currentGenreRef.current === "Todos") {
      let copy = [...moviesRef.current];
      setMoviesFilter(
        copy.sort(compareValues(KeyCompareMovies, orderMoviesRef.current))
      );
    } else {
      if (moviesRef.current[0]) {
        setMoviesFilter(
          moviesRef.current
            .filter((movie) =>
              movie["genres"].includes(currentGenreRef.current)
            )
            .sort(compareValues(KeyCompareMovies, orderMoviesRef.current))
        );
      }
    }
  }, [currentGenre, orderMovies]);

  return (
    <div className="movie-library__list">
      {moviesFilter.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

export default MoviesList;
