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

export default function Exercise02 () {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [loading, setLoading] = useState(false);
  const [ascending, setAscending] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetch('http://localhost:3001/genres')
      .then(res => res.json())
      .then(json => {
        setGenres(json);
        setSelectedGenre(json[0]);
        handleMovieFetch();
      });
  }, []);

  const handleMovieFetch = () => {
    fetch('http://localhost:3001/movies?_limit=50')
      .then(res => res.json())
      .then(json => {
        setMovies(json);
        setLoading(false);
      });
  };

  return (
    <section className="movie-library">
      <h1 className="movie-library__title">
        Movie Library
      </h1>
      <div className="movie-library__actions">
        <select
          name="genre"
          placeholder="Search by genre..."
          value={selectedGenre}
          onChange={ev => setSelectedGenre(ev.target.value)}>
          {genres.map(genre =>
            <option value={genre}>{genre}</option>
          )}
        </select>
        <button style={{ backgroundColor: 'limeGreen', border: 'none' }} onClick={() => setAscending(!ascending)}>
          Year {ascending ? 'Ascending' : 'Descending'}
        </button>
      </div>
      {loading ? (
        <div className="movie-library__loading">
          <p>Loading...</p>
        </div>
      ) : (
        <ul className="movie-library__list">
          {movies.sort((a, b) => ascending ? a.year - b.year : b.year - a.year).map(movie => {
            if (!movie.genres.includes(selectedGenre)) return;

            return (
              <li key={movie.id} className="movie-library__card">
                <div className="movieContainer">
                  <img src={movie.posterUrl} alt={movie.title} />
                  <ul>
                    <li>ID: {movie.id}</li>
                    <li>Title: {movie.title}</li>
                    <li>Year: {movie.year}</li>
                    <li>Runtime: {movie.runtime}</li>
                    <li>Genres: {movie.genres.join(', ')}</li>
                  </ul>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  )
}