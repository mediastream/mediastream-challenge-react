import { baseUrl } from './baseUrl';


export const movieFetch = async ({limit = 50, selectedGenre = "", order = ""} ) => {
  const data = await (await fetch(`${baseUrl}/movies?_limit=${limit}&genres_like=${selectedGenre}&_sort=year&_order=${order === "Ascending" ? "asc" : "desc"}`)).json()
  return data      
  
}

export const genresFetch = async () => {
  const data = await (await fetch(`${baseUrl}/genres`)).json()
  return data      
  
}