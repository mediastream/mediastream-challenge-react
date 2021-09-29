/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Exercise 02: Movie Library
 * We are trying to make a movie library for internal users. We are facing some issues by creating this, try to help us following the next steps:
 * !IMPORTANT: Make sure to run yarn movie-api for this exercise
 * 1. We have an issue fetching the list of movies, check why and fix it (handleMovieFetch) --DONE
 *
 * 2. Create a filter by fetching the list of gender (http://localhost:3001/genres) and then loading
 * list of movies that belong to that gender (Filter all movies). --DONE
 * 3. Order the movies by year and implement a button that switch between ascending and descending order for the list --DONE
 * 4. Try to recreate the user interface that comes with the exercise (exercise02.png)
 *
 * You can modify all the code, this component isn't well designed intentionally. You can redesign it as you need.
 */

import "./assets/styles.css";
import useFetchData from "./hooks/useFetchData";
import mountains from "../Exercise02/assets/mountains.jpeg";
import MovieCard from "./components/MovieCard";
export default function Exercise02() {
  /*
All the functionalities are working fine. 
I could not do the design requested, I dont know CSS and not have experience designing on React, 
only on React Native where I consider myself a pro. But I could learn CSS if neccesary. 
Thanks.
*/
  const {
    movies,
    loading,
    genres,
    descending,
    filterByGenre,
    setSelectedGenre,
    changeOrder,
  } = useFetchData();

  return (
    <section
      className="movie-library"
      style={{
        backgroundImage: "url(" + mountains + ")",
        backgroundSize: "auto",
      }}
    >
      <h1 className="movie-library__title">Movie Library</h1>

      <div className="movie-library__actions">
        <select
          name="genre"
          onChange={(e) => {
            setSelectedGenre(e.target.value);
            filterByGenre();
          }}
        >
          {genres.map((genre, index) => {
            return (
              <option
                defaultValue="adas"
                value={genre}
                key={`${genre}-${index}`}
              >
                {genre}
              </option>
            );
          })}
        </select>
        <button onClick={changeOrder}>
          {descending ? "Year descending" : "Year ascending"}
        </button>
      </div>
      {loading ? (
        <div className="movie-library__loading">
          <p>Loading...</p>
        </div>
      ) : (
        <MovieCard movies={movies} />
      )}
    </section>
  );
}
