import { useEffect, useState } from "react";
import getMovies from "../services/getMovies"

const useMovies = () => {
    const [movies, setMovies] = useState([])
    const [fetchCount, setFetchCount] = useState(0)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        (async () => {
            setLoading(true)
            setFetchCount(fetchCount + 1)
            try {
                const data = await getMovies()
                setMovies(data)
                setLoading(false)
            } catch (error) {
                setLoading(false)
            }
        })()
    }, [])
    return { movies, loading, fetchCount }
}

export default useMovies
