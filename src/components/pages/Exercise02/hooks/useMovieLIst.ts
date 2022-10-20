
import { useEffect, useState } from "react";
import { movieFetch, genresFetch } from "../api/moviesApi";

const useMovieList = () => {

  const [movies, setMovies] = useState([])
  const [genres, setGenres] = useState([])
  const [fetchCount, setFetchCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [selectedGenre, setSelectedGenre] = useState('')
  const [order, setOrder] = useState('Ascending')
  
  const getGenres = async () => {
    setLoading(true)
    setFetchCount((f) => f + 1)
    const json = await genresFetch();
    setGenres(json)
    setLoading(false)
  }

  const getMovie = async () => {
    setLoading(true)
    setFetchCount((f) => f + 1)
    const json = await movieFetch({ selectedGenre, order });
    setMovies(json)
    setLoading(false)
  }

  useEffect( () =>{
    getGenres()
  }, [])

  useEffect( () =>{
    getMovie()
    if(selectedGenre === "all_genres")setSelectedGenre("");
  }, [selectedGenre, order])

  return {
    movies,
    fetchCount,
    loading,
    genres,
    order,
    setOrder,
    selectedGenre,
    setSelectedGenre  
  }
}

export default useMovieList;