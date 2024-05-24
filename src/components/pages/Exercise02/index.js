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
import useMovies from "./hooks/useMovies";

const ORDER_ASC = "asc";

export default function Exercise02() {
  const {
    movies,
    genres,
    order,
    selectedGenre,
    setSelectedGenre,
    loading,
    handleToggleOrder,
  } = useMovies();

  return (
    <main className='movie-library__main'>
      <div className='movie-library__bg' />
      <section className='movie-library__section'>
        <h1 className='movie-library__title'>Movie Library</h1>
        <div className='movie-library__actions'>
          <select
            name='genre'
            placeholder='Search by genre...'
            value={selectedGenre}
            onChange={(event) => setSelectedGenre(event.target.value)}
          >
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
          <button onClick={handleToggleOrder}>
            Order {order === ORDER_ASC ? "Ascending" : "Descending"}
          </button>
        </div>
        {loading ? (
          <div className='movie-library__loading'>
            <p>Loading...</p>
          </div>
        ) : (
          <ul className='movie-library__list'>
            {movies.map((movie) => (
              <li key={movie.id} className='movie-library__card'>
                <img src={movie.posterUrl} alt={movie.title} />
                <ul className='movie-library__list__ul'>
                  <li>ID: {movie.id}</li>
                  <li>Title: {movie.title}</li>
                  <li>Year: {movie.year}</li>
                  <li>Runtime: {movie.runtime}</li>
                  <li>Genres: {movie.genres.join(", ")}</li>
                </ul>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
