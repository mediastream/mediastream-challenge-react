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
import { useCallback, useEffect, useMemo, useState } from "react";
import MovieCard from "./components/MovieCard/MovieCard";
const MOCK_API_URI = 'http://localhost:3001/';

export default function Exercise02 () {

  // initial component state
  const [movies, setMovies] = useState([])
  const [fetchCount, setFetchCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [genres, setGenres] = useState([])
  const [genre, setGenre] = useState(null)
  const [sortingBy, setSortingBy] = useState(null)

  const fetchData = async (uri = '') => {
    setLoading(true)
    const response = await fetch(`${MOCK_API_URI}${uri}`).catch(() => {
      console.log('Run yarn movie-api for fake api');
    })
    const json = await response.json();
    setLoading(false)
    return json;
  }

  // fetch genres
  const handleGenresFetch = async () => {
    const data = await fetchData(`genres`).catch(() => {
      console.log('Run yarn movie-api for fake api');
    })
    setGenres(data);
  };

  // fetch and logical for movies
  const handleMovieFetch = useCallback( async () => {
    setFetchCount(prevCount => prevCount+1)
    const sortParam = sortingBy ? `&_sort=year&_order=${sortingBy}` : '';
    const genreParam = genre ? `&genres_like=${genre}` : '';
    const data = await fetchData(`movies?_limit=50${sortParam}${genreParam}`)
    setMovies(data);
  }, [sortingBy, genre])

  const handleSorting = async () => {
    setSortingBy((sortingBy) => sortingBy === 'asc' ? 'desc': 'asc')
  }

  const sortByYearButton = useMemo(() => {
    return sortingBy === 'asc' ? 'Year Descending' : 'Year Ascending'
  }, [sortingBy])

  useEffect(() => {
    handleMovieFetch();
    handleGenresFetch();
  }, [handleMovieFetch])

  useEffect(async () => {
    if(sortingBy || genre) {
      setFetchCount(prevCount => prevCount + 1)
      const sortParam = sortingBy ? `&_sort=year&_order=${sortingBy}` : '';
      const genreParam = genre ? `&genres_like=${genre}` : '';
      const data = await fetch(`${MOCK_API_URI}movies?_limit=50${sortParam}${genreParam}`).then((response) =>
        response.json()
      );
      setMovies(data);
    }
  }, [sortingBy, genre]);

  return (
    <div className="movie-container">
      <div className="movie-container__header"></div>
      <section className="movie-library">
        <h1 className="movie-library__title">
          Movie Library
        </h1>
        <div className="movie-library__actions">
          <select name="genre" placeholder="Search by genre..." disabled={loading} onChange={(evt) => setGenre(evt.target.value)}>
            <option value="">Select an option</option>
            {genres.map(genre => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>
          <button onClick={handleSorting}>{sortByYearButton}</button>
        </div>
        {loading ? (
          <div className="movie-library__loading">
            <p>Loading...</p>
            <p>Fetched {fetchCount} times</p>
          </div>
        ) : (
          <div className="movie-library__list">
            {movies.map(movie => (
              <MovieCard movie={movie} key={movie.id}/>
            ))}
          </div>
        )}
      </section>
      </div>
  )
}