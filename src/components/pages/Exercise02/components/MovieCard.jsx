import PropTypes from 'prop-types'

function MovieCard({movie}) {
  return (
    <li key={movie.id} className="card">
        <img src={movie.posterUrl} alt={movie.title} className="movieImg" />
        <ul className="movieDetails">
          <li className="movieTitle">{movie.title}</li>
          <li>{movie.genres.join(', ')}</li>
          <li>{movie.year}</li>
        </ul>
    </li>
  )
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number,
    posterUrl: PropTypes.string,
    genres: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string,
    year: PropTypes.string
  })
}

export default MovieCard
