import PropTypes from 'prop-types';
import { MovieType } from '../../types';
import './styles.css';

export default function LibraryList({ movies }) {
  return (
    <ul className="movie-library__list">
      {movies.map(movie => (
        <li key={movie.id} className="movie-library__card">
          <img src={movie.posterUrl} alt={movie.title} />
          <ul className="movie-library__card-info">
            <li className="movie-library__card-title">{movie.title}</li>
            <li className="movie-library__card-genres">{movie.genres.join(', ')}</li>
            <li className="movie-library__card-year">{movie.year}</li>
          </ul>
        </li>
      ))}
    </ul>
  )
}
LibraryList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape(MovieType))
}

LibraryList.defaultProps = {
  movies: []
}