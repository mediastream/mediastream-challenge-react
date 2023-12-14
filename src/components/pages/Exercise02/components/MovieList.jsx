import React, { useEffect } from "react";
import { fetchMoviesRequest } from "../store/moviesActions";
import { MovieCard } from "./MovieCard";
import { useDispatch, useSelector } from "react-redux";

const MovieList = ({ selectedGenre, ascendingOrder }) => {
  const dispatch = useDispatch();
  const { movies, loading, fetchCount } = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(fetchMoviesRequest());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <div className='movie-library__loading'>
          <p>Loading...</p>
          <p>Fetched {fetchCount} times</p>
        </div>
      ) : (
        <ul className='movie-library__list'>
          {movies
            .filter(
              (movie) =>
                selectedGenre === "" || movie.genres.includes(selectedGenre)
            )
            .sort((a, b) =>
              ascendingOrder ? a.year - b.year : b.year - a.year
            )
            .map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
        </ul>
      )}
    </>
  );
};

export default MovieList;
