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
import { useEffect, useState } from "react";
import LibraryActions from "./components/LibraryActions";
import LibraryList from "./components/LibraryList";
import "./assets/styles.css";

export default function MovieLibrary() {
  const [movies, setMovies] = useState([])
  const [genres, setGenres] = useState([])
  const [filters, setFilters] = useState({})
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    handleFetchApi('movies?_limit=50', (json) => setMovies(handleFilterMovies(json)))
    handleFetchApi('genres', (json) => setGenres(json))
  }, [])

  const handleFilterMovies = (movies) => {
    const searchParams = new URLSearchParams(window.location.search);
    let resultMovies = movies
    let filters = {}
    let order = "desc"
    if (searchParams.size > 0) {
      order = searchParams.get("order") || order
      for (const [key, value] of searchParams) {
        filters = { ...filters, [key]: value }
        resultMovies = resultMovies.filter(movie => {
          const movieValue = movie[key];
          if (key === "order") {
            return movie
          } else if (Array.isArray(movieValue)) {
            return movieValue.includes(value)
          } else {
            return movieValue === value
          }
        })
      }
      setFilters(filters)
    }
    return resultMovies.sort((a, b) => {
      if (a.year > b.year) {
        return order === "desc" ? -1 : 1
      } else {
        return order === "desc" ? 1 : -1
      }
    });
  }
  const handleFetchApi = (api, onSuccess) => {
    setLoading(true)
    fetch(`http://localhost:3001/${api}`)
      .then(res => res.json())
      .then(json => {
        onSuccess(json)
        setLoading(false)
      })
      .catch(() => {
        console.log('Run yarn movie-api for fake api')
      })
  }

  return (
    <section className="movie-library">
      <h1 className="movie-library__title">
        Movie Library
      </h1>
      <LibraryActions genres={genres} filters={filters} />
      {loading ? (
        <div className="movie-library__loading">
          <p>Loading...</p>
        </div>
      ) : (
        <LibraryList movies={movies} />
      )}
    </section>
  )
}