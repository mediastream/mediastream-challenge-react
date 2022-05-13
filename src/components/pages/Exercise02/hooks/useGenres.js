import { useEffect, useState } from 'react'
import getGenres from '../services/getGenres'

const useGenres = () => {
    const [genres, setGenres] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        (async () => {
            setLoading(true)
            try {
                const data = await getGenres()
                setGenres(data)
                setLoading(false)
            } catch (error) {
                setLoading(false)
            }
        })()
    }, [])

    return { genres, loading }
}

export default useGenres
