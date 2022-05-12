const getMovies = async () => {
    console.log('Getting movies')
    try {
        const response = await fetch('http://localhost:3001/movies?_limit=50')
        const data = await response.json()
        return data
    } catch (error) {
        console.log('Run yarn movie-api for fake api', error)
        throw error
    }
}

export default getMovies
