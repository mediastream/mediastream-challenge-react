import PropTypes from 'prop-types';
import { MovieType } from '../../types';
import MovieCard from '../MovieCard';
import './styles.css';
import { useEffect, useState } from 'react';
import { getDiscounts } from '../../../../api/getDiscounts';
import { formatPrice } from '../../../../utils/currency';

export default function MoviesList({ movies, isCart }) {
  const [discounts, setDiscounts] = useState([]);
  useEffect(() => {
    getDiscounts().then(response => {
      setDiscounts(response.data)
    })
  }, [])
  const getTotal = () => {
    const totalPrice = movies.reduce((totalPrice, movie) => (movie.price * movie.quantity) + totalPrice, 0)
    let discount = 0
    discounts.every((discountObj) => {
      const rule = discountObj.rule;
      if (rule.length === movies.length) {
        const moviesSet = new Set(movies.map(movie => movie.id));
        const differenceIds = rule.filter(id => !moviesSet.has(id));
        if (differenceIds.length === 0) {
          discount = discountObj.discount;
          return false;
        }
      }
      return true;
    })
    return { totalPrice: totalPrice - (totalPrice * discount), discount: discount * 100 }
  }

  const total = getTotal()

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
          <p>Total: {formatPrice(total.totalPrice)}</p>
          {total.discount > 0 && <p>Discount: {`${total.discount}%`}</p>}
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
