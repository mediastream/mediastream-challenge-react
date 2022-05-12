const getGenres = async () => {
    console.log('Getting movies')
    try {
        const response = await fetch('http://localhost:3001/genres')
        const data = await response.json()
        return data
    } catch (error) {
        throw error
    }
}

export default getGenres
