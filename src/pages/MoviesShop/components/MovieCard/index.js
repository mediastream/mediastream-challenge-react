import PropTypes from 'prop-types';
import { useCartDispatch } from '../../../../hooks/cartHooks';
import { MovieType } from '../../types';
import './styles.css';

export default function MovieCard({ movie, isCartElement }) {
  const { id, name, price, quantity } = movie
  const dispatch = useCartDispatch()

  const handleAddToCart = () => {
    dispatch({
      type: 'added',
      movie
    })
  }

  const handleIncrementQuantity = () => {
    dispatch({
      type: 'updated',
      movie: {
        ...movie,
        quantity: quantity + 1
      }
    })
  }

  const handleDecrementQuantity = () => {
    if (quantity === 1) {
      dispatch({
        type: 'deleted',
        movieId: id
      })
    } else {
      dispatch({
        type: 'updated',
        movie: {
          ...movie,
          quantity: quantity - 1
        }
      })
    }
  }

  return (
    <div className="movies__list-card">
      <ul>
        <li>
          ID: {id}
        </li>
        <li>
          Name: {name}
        </li>
        <li>
          Price: ${price}
        </li>
      </ul>
      {!isCartElement &&
        <button onClick={handleAddToCart}>
          Add to cart
        </button>
      }
      {
        isCartElement &&
        <div className="movies__cart-card-quantity">
          <button onClick={handleDecrementQuantity} >
            -
          </button>
          <span>
            {quantity}
          </span>
          <button onClick={handleIncrementQuantity}>
            +
          </button>
        </div>
      }
    </div>
  )
}

MovieCard.propTypes = {
  movie: MovieType,
  isCartElement: PropTypes.bool
}
