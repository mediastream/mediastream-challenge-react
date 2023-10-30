import PropTypes from 'prop-types';
import { MovieType } from '../../types';
import './styles.css';

export default function LibraryList({ movies }) {
  return (
    <ul className="movie-library__list">
      {movies.map(movie => (
        <li key={movie.id} className="movie-library__card">
          <img src={movie.posterUrl} alt={movie.title} />
          <ul>
            <li>ID: {movie.id}</li>
            <li>Title: {movie.title}</li>
            <li>Year: {movie.year}</li>
            <li>Runtime: {movie.runtime}</li>
            <li>Genres: {movie.genres.join(', ')}</li>
          </ul>
        </li>
      ))}
    </ul>
  )
}
LibraryList.propTypes = {
  movies: PropTypes.arrayOf(MovieType)
}

LibraryList.defaultProps = {
  movies: []
}