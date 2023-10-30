import { useCartDispatch } from '../../../../hooks/cartHooks';
import { MovieType } from '../../types';
import './styles.css';

export default function MovieCard({ id, name, price }) {
  const dispatch = useCartDispatch()

  const handleAddToCart = () => {
    dispatch({
      type: 'added',
      movie: {
        id,
        name,
        price
      }
    })
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
      <button onClick={handleAddToCart}>
        Add to cart
      </button>
    </div>
  )
}

MovieCard.propTypes = MovieType
