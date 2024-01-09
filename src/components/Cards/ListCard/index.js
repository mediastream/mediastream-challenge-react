import './styles.css';
import MovieCard from '../MovieCard';

export default function ListCard({ movie, onAddToCart }) {
  return (
    <li className="movies__list-card">
      <MovieCard movie={movie} />
      <button onClick={() => onAddToCart(movie)}>
        Add to cart
      </button>
    </li>
  );
}