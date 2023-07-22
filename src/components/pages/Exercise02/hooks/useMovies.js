/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react"

export const useMovies = () => {
    const [movies, setMovies] = useState([])
    const [fetchCount, setFetchCount] = useState(0)
    const [loading, setLoading] = useState(false)

    const handleMovieFetch = async () => {
        setLoading(true)
        setFetchCount(fetchCount + 1)
    
        try {
          const getMovies = await fetch('http://localhost:3001/movies?_limit=50');
          const results = await getMovies.json()
    
          setMovies(results);
          setLoading(false);
        } catch(error) {
            console.error(error)
        }
    }

    useEffect(() => {
        handleMovieFetch();
    }, [])

    return {
        movies,
        loading
    }
}