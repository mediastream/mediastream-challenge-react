const API_URL = 'http://localhost:3001'

const httpClient = (endpoint, options) => fetch(`${API_URL}/${endpoint}`, {
  method: options.method,
  body: JSON.stringify(options.body)
})

export const getMovies = async (filterQuery = '') => {
  const response = await httpClient(`movies?_limit=50${filterQuery}`, { method: 'GET' })
  const jsonBody = await response.json()

  return { data: jsonBody, headers: response.headers }
}

export const getGenres = async (genre) => {
  const response = await httpClient('genres', { method: 'GET' })
  const jsonBody = await response.json()

  return { data: jsonBody, headers: response.headers }
}