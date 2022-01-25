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

import "./assets/styles.css"
import { useCallback, useEffect, useMemo, useState } from "react"
import Catalogue from "../../Catalogue/Catalogue"
import GenderSelector from "../../GenderSelector/GenderSelector"
import { fetchGender } from "../../../services/genderService"
import { fetchMovies } from "../../../services/moviesServices"
export const DEFAULT_OPTION = "--none--"

export default function Exercise02() {
  const [movies, setMovies] = useState([])
  const [fetchCount, setFetchCount] = useState(0)
  const [genres, setGenres] = useState([])
  const [genreSelected, setGenreSelected] = useState("")
  const [loading, setLoading] = useState(false)
  const [order, setOrder] = useState("")

  const buttonText = useMemo(() => {
    return order === "ASC" ? "Year Decending" : "Year Ascending"
  }, [order])

  const orderMovies = useCallback(() => {
    if (order === "ASC") {
      setMovies((prevState) => {
        return prevState.sort((a, b) => b.year - a.year)
      })
    } else {
      setMovies((prevState) => prevState.sort((a, b) => a.year - b.year))
    }
  }, [order])

  const handleChangeOrder = useCallback(() => {
    setOrder((prevState) => (prevState === "ASC" ? "DSC" : "ASC"))
    orderMovies()
  }, [orderMovies])

  const handleGenderSelected = useCallback((event) => {
    const newGenre =
      event.target.value !== DEFAULT_OPTION ? event.target.value : ""
    setGenreSelected(newGenre)
  }, [])

  const handleGendersFetch = useCallback(async () => {
    setLoading(true)
    const genderData = await fetchGender()
    setGenres([DEFAULT_OPTION, ...genderData])
    setLoading(false)
  }, [])

  const handleMovieFetch = useCallback(async () => {
    setLoading(true)
    setFetchCount((prevState) => prevState + 1)
    const moviesData = await fetchMovies()
    setMovies(moviesData)
    setLoading(false)
  }, [])

  useEffect(() => {
    handleMovieFetch()
  }, [handleMovieFetch])

  useEffect(() => {
    handleGendersFetch()
  }, [handleGendersFetch])

  return (
    <section className="movie-library">
      <section>
        <div className="top" />
        <div className="top-content">
          <h1 className="movie-library__title">Movie Library</h1>
          <div className="movie-library__actions">
            <GenderSelector
              handleChange={handleGenderSelected}
              genres={genres}
            />
            <button onClick={handleChangeOrder}>{buttonText}</button>
          </div>
        </div>
      </section>
      <section className="movie-library__body">
        {loading ? (
          <div className="movie-library__loading">
            <p>Loading...</p>
            <p>Fetched {fetchCount} times</p>
          </div>
        ) : (
          <Catalogue filter={genreSelected} movies={movies} order={order} />
        )}
      </section>
    </section>
  )
}
