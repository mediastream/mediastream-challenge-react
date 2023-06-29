/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Exercise 02: Movie Library
 * We are trying to make a movie library for internal users. We are facing some issues by creating this, try to help us following the next steps:
 * !IMPORTANT: Make sure to run yarn movie-api for this exercise
 * 1. We have an issue fetching the list of movies, check why and fix it (handleMovieFetch)
 * 2. Create a filter by fetching the list of gender (http://localhost:3001/genres) and then loading
 * list of movies that belong to that gender (Filter all movies).
 * 3. Order the movies by year and implement a button that switch between ascending and descending order for the list
 * 4. Try to recreate the user interface that comes with the exercise (exercise02.png)
 *
 * You can modify all the code, this component isn't well designed intentionally. You can redesign it as you need.
 */

import "./assets/styles.css";
import { useEffect, useState } from "react";
import noimg from "./assets/mountains.jpeg";
export default function Exercise02() {
  const [movies, setMovies] = useState([]);
  const [moviesf, setMoviesf] = useState([]);
  const [genres, setGenres] = useState([]);
  const [fetchCount, setFetchCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isfiltered, setIsFiltered] = useState(false);

  const handleMovieFetch = () => {
    setLoading(true);
    setFetchCount(fetchCount + 1);
    console.log("Getting movies");
    fetch("http://localhost:3001/movies?_limit=50")
      .then((res) => res.json())
      .then((json) => {
        setMovies(json);
        setMoviesf(json);
        setLoading(false);
      })
      .catch(() => {
        console.log("Run yarn movie-api for fake api");
      });
  };
  const handleGenreFetch = () => {
    setLoading(true);
    console.log("Getting movies");
    fetch("http://localhost:3001/genres")
      .then((res) => res.json())
      .then((json) => {
        setGenres(json);
        setLoading(false);
      })
      .catch(() => {
        console.log("Run yarn movie-api for fake api");
      });
  };

  useEffect(() => {
    handleMovieFetch();
    handleGenreFetch();
  }, []);

  function searchBygender(gender) {
    setIsFiltered(true);
    var movieClone = [...movies];
    var filteredMovie = [];
    var genresSort = movieClone.forEach((item) => {
      genresSort = item.genres.sort();
      console.log(genresSort);
      genresSort.forEach((g) => {
        console.log(g);
        if (g === gender) {
          filteredMovie.push(item);
        }
      });
    });
    setMoviesf(filteredMovie);
  }

  return (
    <section className="movie-library">
      <h1 className="movie-library__title">Movie Library</h1>
      <div className="movie-library__actions">
        <select
          name="genre"
          placeholder="Search by genre..."
          onChange={(event) => searchBygender(event.currentTarget.value)}
        >
          {genres.map((item) => {
            return <option value={item}>{item}</option>;
          })}
        </select>
        <button>Descending</button>
      </div>
      {loading ? (
        <div className="movie-library__loading">
          <p>Loading...</p>
          <p>Fetched {fetchCount} times</p>
        </div>
      ) : (
        <div className="movie-library__list">
          {!isfiltered
            ? movies.map((movie) => (
                <div key={movie.id} className="movie-library__card">
                  <img
                    src={movie.posterUrl ? movie.posterUrl : noimg}
                    alt={movie.title}
                  />
                  <div>
                    <div className="movie-library-movieTitle">
                      {movie.title}
                    </div>
                    <div className="movie-library-genre">
                      {movie.genres.join(", ")}
                    </div>
                    <div className="movie-library-year">{movie.year}</div>
                  </div>
                </div>
              ))
            : moviesf?.map((movie) => (
                <div key={movie.id} className="movie-library__card">
                  <img
                    src={movie.posterUrl ? movie.posterUrl : noimg}
                    alt={movie.title}
                  />
                  <div>
                    <div className="movie-library-movieTitle">
                      {movie.title}
                    </div>
                    <div className="movie-library-genre">
                      {movie.genres.join(", ")}
                    </div>
                    <div className="movie-library-year">{movie.year}</div>
                  </div>
                </div>
              ))}
        </div>
      )}
    </section>
  );
}
