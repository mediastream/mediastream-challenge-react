import { API_BASE_URL } from '../constants'

export const getMovies = async ({ genre, sort }) => {
    try {
        let params = ""

        if(genre) params += `genres_like=${genre}`
        if(sort) params += `&_sort=year&_order=${sort}`

        const response = await fetch(`${API_BASE_URL}/movies?${params}`)

        return response.json()
    } catch (error) {
        console.log('Run yarn movie-api for fake api')
    }
}

export const getGenres = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/genres`)

        return response.json()
    } catch (error) {
        console.log('Run yarn movie-api for fake api')
    }
}