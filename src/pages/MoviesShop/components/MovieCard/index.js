import { MovieType } from '../../types';
import './styles.css';

export default function MovieCard({ id, name, price }) {
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
      <button onClick={() => console.log('Add to cart', id)}>
        Add to cart
      </button>
    </div>
  )
}

MovieCard.propTypes = MovieType
