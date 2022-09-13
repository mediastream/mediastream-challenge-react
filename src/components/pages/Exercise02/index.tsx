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

import './assets/styles.css'
import { useEffect, useState } from 'react'
import {
  useMoviesGetListGenderQuery,
  useMoviesGetListQuery,
} from './slices/movieApiSlice'
import { useAppDispatch, useAppSelector } from '../../../store/useRedux'
import {
  setMovieList,
  filterMovieListByGender,
  changeOrderAscendentMovieList,
  changeOrderDescendentMovieList,
} from './slices/movieSlice'
import BackgroundImage from './assets/mountains.jpeg'

export default function Exercise02() {
  const dispatch = useAppDispatch()

  const [order, setOrder] = useState<string>('descending')

  const { moviesFiltered } = useAppSelector((state) => state.movies)

  const { isLoading, data: movies, isFetching } = useMoviesGetListQuery()

  const {
    isLoading: isLoadingMoviesGender,
    data: moviesGender,
    isFetching: isFetchingMoviesGender,
  } = useMoviesGetListGenderQuery()

  useEffect(() => {
    if (movies) {
      dispatch(setMovieList(movies))
    }
  }, [movies])

  const filterMovieListByGenderAction = (gender: string) => {
    dispatch(filterMovieListByGender({ gender }))
  }

  const ascending = () => {
    dispatch(changeOrderAscendentMovieList())
    setOrder('ascending')
  }

  const descending = () => {
    dispatch(changeOrderDescendentMovieList())
    setOrder('descending')
  }

  return (
    <section className="movie-library">
      <h1 className="movie-library__title">Movie Library</h1>
      <div className="movie-library__actions">
        <select
          name="genre"
          placeholder="Search by genre..."
          onChange={(e) => filterMovieListByGenderAction(e.target.value)}
        >
          {!isLoadingMoviesGender &&
            !isFetchingMoviesGender &&
            moviesGender?.length! > 0 &&
            moviesGender?.map((e) => <option value={e}>{e}</option>)}
        </select>
        <button
          onClick={() => (order === 'ascending' ? descending() : ascending())}
        >
          {order === 'ascending' ? 'Year ascending' : 'Year descending'}
        </button>
      </div>
      {isLoading && isFetching ? (
        <div className="movie-library__loading">
          <p>Loading...</p>
        </div>
      ) : (
        <ul className="movie-library__list">
          {moviesFiltered?.length > 0 &&
            moviesFiltered.map((movie) => (
              <li key={movie.id} className="movie-library__card">
                <img src={movie.posterUrl} alt={movie.title} />
                <ul>
                  <li>ID: {movie.id}</li>
                  <li>Title: {movie.title}</li>
                  <li>Year: {movie.year}</li>
                  <li>Runtime: {movie.runtime}</li>
                  <li>Genres: {movie.genres.join(', ')}</li>
                </ul>
              </li>
            ))}
        </ul>
      )}
    </section>
  )
}
