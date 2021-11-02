import MovieCard from './MovieCard'
import PropTypes from 'prop-types'

function MovieLibrary({movies, loading, fetchCount}){
  return !loading ? (
    <ul className="cardList">
      {movies.map(movie => (
        <MovieCard movie={movie} key={movie.id}/>
      ))}
    </ul>
  ) : (
    <div className="movie-library__loading">
      <p>Loading...</p>
      <p>Fetched {fetchCount} times</p>
    </div>
  )
}

MovieLibrary.propTypes = {
  movies : PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
  fetchCount: PropTypes.number,
}

export default MovieLibrary
