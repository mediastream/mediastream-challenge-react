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
import { useEffect, useState } from "react"
import MovieLibrary from "./components/MovieLibrary"
import GenreSelect from "./components/GenreSelect"

export default function Exercise02 () {
  const [movies, setMovies] = useState([])
  const [fetchCount, setFetchCount] = useState(0)
  const [genres, setGenres] = useState([])
  const [loading, setLoading] = useState(false)
  const [filteredMovies, setFilteredMovies] = useState([])
  const [order, setOrder] = useState(false)

  useEffect(() => {
    handleMovieFetch()
    handleGenreFetch()
  }, [])

  const handleMovieFetch = () => {
    setLoading(true)
    setFetchCount(prev => prev + 1)
    fetch('http://localhost:3001/movies?_limit=50')
      .then(res => res.json())
      .then(json => {
        setMovies(json)
        setFilteredMovies(json)
        setLoading(false)
      })
      .catch(() => {
        console.log('Run yarn movie-api for fake api')
      })
  }
  
  const handleGenreFetch = () => {
    fetch('http://localhost:3001/genres')
      .then(res => res.json())
      .then(json => setGenres(json))  
  }

  useEffect(() => setOrder( (prev) => !prev) , [filteredMovies])

  const handleFilter = (e) => setFilteredMovies( movies.filter( movie => movie.genres.includes(e.target.value) )) 
  
  //I'm sure there's a better way to implement this sorting toggle.. curryng perhaps?
  const ascending = (a,b) => (a.year > b.year) ? -1 : ((b.year > a.year) ? 1 : 0)
  const descending = (a,b) => (a.year > b.year) ? 1 : ((b.year > a.year) ? -1 : 0)
  const sortMovies = () => setFilteredMovies([...filteredMovies].sort(order ? ascending : descending))

  return (
    <section className="movie-library">
      <h1 className="movie-library__title">
        Movie Library
      </h1>
      <div className="movie-library__actions btn-group " role="group">
        <GenreSelect genres={genres} handleFilter={handleFilter}/> 
        <button onClick={sortMovies} className="btn btnOrder roundRadius">Order Descending</button>
      </div>
        <MovieLibrary movies={filteredMovies} loading={loading} fetchCount={fetchCount} />
    </section>
  )
}


