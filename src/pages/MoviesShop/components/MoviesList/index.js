import PropTypes from 'prop-types';
import { MovieType } from '../../types';
import MovieCard from '../MovieCard';
import './styles.css';

export default function MoviesList({ movies }) {
  const getTotal = () => {

  }

  return (
    <div className="movies__list">
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            <MovieCard {...movie} />
          </li>
        ))}
      </ul>
      <div className="movies__cart-total">
        <p>Total: ${getTotal()}</p>
      </div>
    </div>
  )
}

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape(MovieType))
}
