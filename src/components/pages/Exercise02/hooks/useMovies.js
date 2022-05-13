import { useEffect, useState } from 'react'
import getMovies from '../services/getMovies'

const useMovies = () => {
    const [movies, setMovies] = useState([])
    const [fetchCount, setFetchCount] = useState(0)
    const [loading, setLoading] = useState(false)
    const [order, setOrder] = useState('desc')
    const [genre, setGenre] = useState('')
    useEffect(() => {
        (async () => {
            setLoading(true)
            setFetchCount((prev) => prev + 1)
            try {
                const data = await getMovies(order, genre)
                setMovies(data)
                setLoading(false)
            } catch (error) {
                setLoading(false)
            }
        })()
    }, [order, genre])

    return { movies, loading, fetchCount, setOrder, order, setGenre, genre }
}

export default useMovies
