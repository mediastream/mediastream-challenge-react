import constatns from '../common/constants'

const getMovies = async (order, genre) => {
    console.log('Getting movies')
    try {
        const likeGenre = genre === '' ? '' : `&genres_like=${genre}`
        const response = await fetch(`${constatns.API_URL}/movies?_limit=50&_sort=year&_order=${order}${likeGenre}`)
        const data = await response.json()
        if (!Array.isArray(data)) throw new Error('Error API')
        return data
    } catch (error) {
        console.log('Run yarn movie-api for fake api', error)
        throw error
    }
}

export default getMovies
