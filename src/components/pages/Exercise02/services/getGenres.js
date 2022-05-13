import constatns from '../common/constants'

const getGenres = async () => {
    console.log('Getting movies')
    try {
        const response = await fetch(`${constatns.API_URL}/genres`)
        const data = await response.json()
        if (!Array.isArray(data)) throw new Error('Error API')
        return data
    } catch (error) {
        throw error
    }
}

export default getGenres
