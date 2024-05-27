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

import HeaderMovie from "./HeaderMovie";
import Movies from "./Movies";
import Pagination from "./Pagination";
import "./assets/styles.css";
import { useEffect, useState } from "react";


export default function Exercise02 () {
  const [movies, setMovies] = useState([])

  const [fetchCount, setFetchCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [genres, setGenres] = useState()
  const [genreSelected, setGenreSelected] = useState('All Genres')
  const [order, setOrder] = useState('Order Ascending')

 


const handleMovieFetch = () => {
  setLoading(true)
  setFetchCount(fetchCount + 1)
  if(genreSelected !== 'All Genres'){     
  const URL = 'http://localhost:3001/movies'    
  fetch(URL)    
  .then(res => res.json())
  .then(json => {
    let moviesG = json.sort((a, b)=> a.year - b.year).filter(movie => movie.genres.includes(genreSelected))
    setOrder('Order Ascending')
    setMovies(moviesG)
    setLoading(false)
    }).catch((err) => {
      console.log(err)
    });
}else {
  setLoading(true)
    setFetchCount(fetchCount + 1)
    console.log('Getting movies')
    fetch(`http://localhost:3001/movies`)
      .then(res => res.json())
      .then(json => {
        setMovies(json.sort((a, b) => a.year - b.year))
        setOrder('Order Ascending')
        setLoading(false)
      })
      .catch(() => {
        console.log('Run yarn movie-api for fake api')
      })
}}

 const handleMovieGenre = () => {
    fetch(`http://localhost:3001/genres`)
    .then(res => res.json())
    .then(json => {
      setGenres(json)
    })
    .catch((err) => console.log(err))
}

useEffect(() => {
  handleMovieFetch()
 }, [genreSelected])



useEffect(() => {
  handleMovieGenre()
},[])
const handleChange = e =>{    
  setGenreSelected(e.target.value) 
  setPage(1) 
}

const handleClick = () => {
  if(order === 'Order Ascending'){
    setOrder('Order Descending')
    setMovies(movies.sort((a, b) => b.year - a.year))
  }else {
    setOrder('Order Ascending')
    setMovies(movies.sort((a, b) => a.year - b.year))
  }
}

  const [page, setPage] = useState(1)
  const [moviePerPage, setMoviePerPage] = useState(8)
  const initialPage = (page - 1) * moviePerPage
  const finalPage = page * moviePerPage
  const maxPage = movies && Math.ceil(movies.length / moviePerPage)


  return (

    <>
    <HeaderMovie
    order={order}
    setGenreSelected={setGenreSelected}
    setMovies={setMovies}
    setOrder={setGenres}
    genres={genres}
    movies={movies}/>
    <div className="movie-library__actions">
        <select name="genre" placeholder="Search by genre..." onChange={handleChange}>
          <option value="All Genres">All Genres</option>
          {
            genres?.map((genre, index) =>(
              <option key={index}>{genre}</option>
            ))
          }
        </select>
        <button onClick={handleClick}>{order === 'Order Ascending' ? 'Order Descending': 'Order Ascending' }</button>
      </div>

      <Pagination 
      page={page}
      maxPage={maxPage}
      setPage={setPage}/>
    <Movies
    movies={movies}
    loading={loading}
    fetchCount={fetchCount}
    initialPage={initialPage}
    finalPage={finalPage}/>
    
    </>
    

    
  )
}