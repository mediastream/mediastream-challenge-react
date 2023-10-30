import PropTypes from 'prop-types';
import { MovieType } from '../../types';
import MovieCard from '../MovieCard';
import './styles.css';

export default function MoviesList({ movies, isCart }) {
  const getTotal = () => {
    return movies.reduce((totalPrice, movie) => (movie.price * movie.quantity) + totalPrice, 0);
  }

  return (
    <div className="movies__list">
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            <MovieCard movie={movie} isCartElement={isCart} />
          </li>
        ))}
      </ul>
      {isCart &&
        <div className="movies__cart-total">
          <p>Total: ${getTotal()}</p>
        </div>
      }
    </div>
  )
}

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape(MovieType)),
  isCart: PropTypes.bool
}

MoviesList.defaultProps = {
  movies: [],
  isCart: false
}
