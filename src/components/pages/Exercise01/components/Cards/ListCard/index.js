import './styles.css';
import BasicCard from '../BasicCard';

export default function ListCard({ movie, onAddToCart }) {
  return (
    <li className="movies__list-card">
      <BasicCard movie={movie} />
      <button onClick={() => onAddToCart(movie)}>
        Add to cart
      </button>
    </li>
  );
}
