import React, { memo } from "react";
import MovieListItem from "./MovieListItem";

const MovieList = ({ movies = [] }) => (
  <ul className="movie-library__list">
    {movies.map((movie) => (
      <MovieListItem
        genres={movie.genres}
        id={movie.id}
        key={movie.id}
        posterUrl={movie.posterUrl}
        title={movie.title}
        year={movie.year}
      />
    ))}
  </ul>
);

export default memo(MovieList);
