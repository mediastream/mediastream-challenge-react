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
import { FILTER_DEFAULT_OPTIONS } from "../../data";
import SelectInput from "../../components/SelectInput";
import MoviesList from "../../components/MoviesList";
import Typography from '@mui/material/Typography';

export default function Exercise02() {
  const [movies, setMovies] = useState([]);
  const [fetchCount, setFetchCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [filterOptions, setFilterOptions] = useState(FILTER_DEFAULT_OPTIONS);
  const [selectOption, setSelectOption] = useState(FILTER_DEFAULT_OPTIONS[0]);
  const [order, setOrder] = useState('desc');

  const handleMovieFetch = () => {
    setLoading(true)
    setFetchCount(fetchCount + 1)
    console.log('Getting movies')
    fetch(`http://localhost:3001/movies?_limit=50&&_sort=year&_order=${order}&&genres_like=${selectOption}`)
      .then(res => res.json())
      .then(json => {
        setMovies(json)
        setLoading(false)
      })
      .catch(() => {
        console.log('Run yarn movie-api for fake api')
      })
  }

  const handleFilterFetch = () => {
    fetch('http://localhost:3001/genres')
      .then(res => res.json())
      .then(json => {
        setFilterOptions(json)
      })
      .catch(() => {
        setFilterOptions(FILTER_DEFAULT_OPTIONS)
      })
  }

  const handleClickButton = () => {
    setOrder((prevState) => {
      if (prevState === 'desc') {
        return 'asc'
      }
      return 'desc'
    })
  }

  const handleSelectOption = (value) => {
    setSelectOption(value);
  };

  useEffect(() => {
    handleMovieFetch()
  }, [order, selectOption])

  useEffect(() => {
    handleFilterFetch()
  }, [])

  return (
    <section className="movie-library">
      <Typography variant="h3" sx={{ fontWeight: 'bold' }}>Movie Library</Typography>
      <SelectInput genderName={selectOption} onChange={(e) => handleSelectOption(e)} options={filterOptions} order={order} onClick={handleClickButton} />
      {loading ? (
        <div className="movie-library__loading">
          <p>Loading...</p>
          <p>Fetched {fetchCount} times</p>
        </div>
      ) : (
        <MoviesList movies={movies} />
      )}
    </section>
  )
}