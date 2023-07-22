/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"

export const useGenres = () => {
    const [genres, setGenres] = useState([])
    const [genre, setGenre] = useState('All')

    const handleGenresFetch = async () => {
        try {
        const getGenres = await fetch('http://localhost:3001/genres');
        const results = await getGenres.json()

        setGenres(['All', ...results])
        } catch(error) {
            console.error(error)
        }
    }

    const filterByGenre = ({ movies }) => {
        const filtered = movies.filter((movie) => movie.genres.find((genreSelected) => genreSelected === genre))
    
        if(genre === 'All') {
          return null;
        }
    
        return filtered
    }

    useEffect(() => {
        handleGenresFetch()
    }, [])

    return {
        genres,
        setGenre,
        filterByGenre
    }
}