import PropTypes from 'prop-types';
import { MovieType } from '../../types';
import MovieCard from '../MovieCard';

export default function MoviesList({ movies }) {
  return (
    <div className="movies__list">
      <ul>
        {movies.map(movie => (
          <li id={movie.id}>
            <MovieCard {...movie} />
          </li>
        ))}
      </ul>
    </div>
  )
}

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(MovieType)
}
