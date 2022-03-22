import { useState, useEffect, useCallback } from 'react'
import { getGenres } from '../api/moviesClient'

const useGenre = () => {
  const [areGenresLoading, setAreGenresLoading] = useState(false)
  const [genres, setGenres] = useState([])

  const initGenres = useCallback(async () => {
    try {
      setAreGenresLoading(true)
      const { data } = await getGenres()
      setGenres(data)
    } catch (error) {
      console.error(error)
    }
    setAreGenresLoading(false)
  }, [])

  useEffect(() => {
    initGenres()
  }, [initGenres])

  return {
    genres,
    areGenresLoading
  }
}

export default useGenre