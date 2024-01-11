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
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import Filters from "./components/filters";
import Listing from "./components/listing";

export default function Exercise02() {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false)
  const [fetchCount, setFetchCount] = useState(0)
  const [movies, setMovies] = useState([])
  const [genres, setGenres] = useState([])
  const [moviesFiltered, setMoviesFiltered] = useState([])


  const handleMovieFetch = () => {
    setLoading(true)
    setFetchCount(fetchCount + 1)
    fetch('http://localhost:3001/movies?_limit=50')
      .then(res => res.json())
      .then(json => {
        setMovies(json)
        setMoviesFiltered(json)
        setLoading(false)
      })
      .catch(() => {
        console.log('Run yarn movie-api for fake api')
      })
  }
  const handleGenreFetch = () => {
    setLoading(true)
    setFetchCount(fetchCount + 1)
    fetch('http://localhost:3001/genres')
      .then(res => res.json())
      .then(json => {
        setGenres(json)
        setLoading(false)
      })
      .catch(() => {
        console.log('Run yarn movie-api for fake api')
      })
  }

  useEffect(() => {
    handleMovieFetch()
    handleGenreFetch()
  }, [])

  useEffect(() => {
    const order = searchParams.get('order')
    const genre = searchParams.get('genre')

    const moviesFilteredAndOrdered = movies
      .filter(movie => (genre && genre !== 'All') ? movie.genres.includes(genre) : true)
      .sort((a, b) => {
        if (order === 'desc') {
          return b.year - a.year
        } else if (order === 'asc') {
          return a.year - b.year
        }
        return 0
      })
    setMoviesFiltered(moviesFilteredAndOrdered)
  }, [searchParams])
  //TODO: pass main tag to Layout component
  return (
    <main className="movie-library__main">
      <div className="movie-library__header" />
      <section className="movie-library">
        <h1 className="movie-library__title">
          Movie Library
        </h1>
        <Filters genres={genres} />
        {loading ? (
          <div className="movie-library__loading">
            <p>Loading...</p>
            <p>Fetched {fetchCount} times</p>
          </div>
        ) : (
          <Listing movies={moviesFiltered} />
        )}
      </section>
    </main>
  )
}