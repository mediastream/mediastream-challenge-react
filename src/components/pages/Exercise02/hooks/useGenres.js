import { useEffect, useState } from "react";
import getGenres from "../services/getGenres";

const useGenres = () => {
    const [genres, setGenres] = useState([])
    const [fetchCount, setFetchCount] = useState(0)
    const [loading, setLoading] = useState(false)
    const [genre, setGenre] = useState('')
    useEffect(() => {
        (async () => {
            setLoading(true)
            setFetchCount(fetchCount + 1)
            try {
                const data = await getGenres()
                setGenres(data)
                setGenre(data[0])
                setLoading(false)
            } catch (error) {
                setLoading(false)
            }
        })()
    }, [])

    const handleChange = (e) => {
        setGenre(e.target.value)
    }

    return { genres, loading, fetchCount, genre, handleChange }
}

export default useGenres
