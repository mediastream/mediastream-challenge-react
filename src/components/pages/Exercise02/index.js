/**
 * Exercise 02: Movie Library
 * We are trying to make a movie library for internal users. We are facing some issues by creating this, try to help us following the next steps:
 * !IMPORTANT: Make sure to run yarn movie-api for this exercise
 * 1. We have an issue fetching the list of movies, check why and fix it (handleMovieFetch)
 * 2. Create a filter by fetching the list of gender (http://localhost:3001/genres) and then loading
 * list of movies that belong to that gender (Filter all movies).
 * 3. Order the movies by year and implement a button that switch between ascending and descending order for the list
 * 4. Try to recreate the user interface that comes with the exercise (exercise02.png)
 * 
 * You can modify all the code, this component isn't well designed intentionally. You can redesign it as you need.
 */

import useMovies from './hooks/useMovies'
import useGenres from './hooks/useGenres'
import './assets/styles.css'
import Filters from './components/filters'
import Card from './components/card'
import CardList from './components/card-list'
import Loading from './components/loading'
import Title from './components/title'

const Exercise02 = () => {
  const { movies, loading, fetchCount, setOrder, order, genre, setGenre } = useMovies()
  const { genres, loading: loadingGenres } = useGenres()

  const handleOrder = () => {
    if (order === 'desc') setOrder('asc')
    else setOrder('desc')
  }

  const handleChange = (e) => {
    setGenre(e.target.value)
  }

  return (
    <section className="movie-library">
      <Title />
      <Filters
        loadingGenres={loadingGenres}
        genres={genres}
        genre={genre}
        onChange={handleChange}
        onClick={handleOrder}
        loading={loading}
        order={order}
      />
      {loading ? (
        <Loading fetchCount={fetchCount} />
      ) : (
        <CardList>
          {movies.map(movie => (
            <Card key={movie.id} movie={movie} />
          ))}
        </CardList>
      )}
    </section>
  )
}

export default Exercise02
