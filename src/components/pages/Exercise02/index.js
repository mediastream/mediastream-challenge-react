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

import { useState } from "react";

import { List } from "./components/List/List";

import { useMovies } from "./hooks/useMovies";
import { useGenres } from "./hooks/useGenres";

import "./assets/styles.css";
import { Header } from "./components/Header/Header";

export default function Exercise02 () {
  const [order, setOrder] = useState('Descending')

  const { movies, loading } = useMovies()  
  const { filterByGenre, genres, setGenre } = useGenres()

  const orderMovies = ({ movies }) => {
    if(order !== 'Ascending') {
      return movies?.sort((a, b) => a.year - b.year)
    }

    if(order !== 'Descending') {
      return movies?.sort((a, b) => b.year - a.year)
    }
  }

  const moviesShow = orderMovies({ movies: filterByGenre({ movies }) || movies })

  return (
    <section className="movie-library">
      <Header setOrder={setOrder} order={order} genres={genres} setGenre={setGenre} />
      <List moviesShow={moviesShow} loading={loading} />
    </section>
  )
}