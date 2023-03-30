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

export default function Exercise02() {
  const [allMovies, setAllMovies] = useState([]);
  const [sortDes, setSortDes] = useState(true);
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [actualGenres, setActualGenres] = useState("");

  const [loading, setLoading] = useState(false);

  const handleMovieFetch = async () => {
    setLoading(true);
    await fetch("http://localhost:3001/movies")
      .then((res) => res.json())
      .then((json) => {
        setAllMovies(json);
        setLoading(false);
      })
      .catch(() => {
        console.log("Run yarn movie-api for fake api");
      });
  };

  const handleGenresFetch = async () => {
    await fetch("http://localhost:3001/genres")
      .then((res) => res.json())
      .then((json) => {
        setGenres(json);
        setActualGenres(json[0]);
        setLoading(false);
      })
      .catch(() => {
        console.log("Run yarn movie-api for fake api");
      });

    await handleMovieFetch();
  };

  const handleChangeGenre = (e) => {
    console.info("e", e.target.value);
    setActualGenres(e.target.value);
  };

  const handleChangeOrder = () => {
    setSortDes(!sortDes)
    setMovies(movies.reverse())
  }

  useEffect(() => {
    handleGenresFetch();
  }, []);

  useEffect(() => {
    if (actualGenres) {
      const newMovies = allMovies.filter((movie) => {
        return movie.genres.includes(actualGenres);
      });
      newMovies.sort((a, b) => b.year - a.year);
      setSortDes(true)
      setMovies(newMovies);
    }
  }, [actualGenres, allMovies]);

  return (
    <section className="movie-library">
      <div >
        <h1 className="movie-library__title">Movie Library</h1>
        <div className="movie-library__actions">
          <select
            name="genre"
            onChange={handleChangeGenre}
            placeholder="Search by genre..."
          >
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
          <button onClick={handleChangeOrder}>{`Year ${sortDes ? 'Descending' : 'Ascending'}`}</button>
        </div>
      </div>
      {loading ? (
        <div className="movie-library__loading">
          <p>Loading...</p>
        </div>
      ) : (
        <ul className="movie-library__list">
          {movies.map((movie) => (
            <li key={movie.id} className="movie-library__card">
              <img src={movie.posterUrl} alt={movie.title} />
              <ul>
                <li>
                  <span>{movie.title}</span>
                </li>
                <li>{movie.genres.join(", ")}</li>
                <li>{movie.year}</li>
              </ul>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
