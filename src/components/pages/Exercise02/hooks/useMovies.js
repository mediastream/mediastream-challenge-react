import { useState, useCallback } from 'react'

import { getMovies } from '../api/moviesClient'

const useMovies = () => {
  const [movies, setMovies] = useState([])
  const [fetchCount, setFetchCount] = useState(0)
  const [loading, setLoading] = useState(false)

  const initMovies = useCallback(async (filterQuery) => {
    setLoading(true)
    setFetchCount(prevCount => prevCount + 1)

    try {
      console.log('Getting movies')
      const { data } = await getMovies(filterQuery)
      setMovies(data)
      setLoading(false)
    } catch (error) {
      console.error(error)
      console.log('Run yarn movie-api for fake api')
    }
  }, [])

  return {
    movies,
    fetchCount,
    loading,
    initMovies,
  }
}

export default useMovies