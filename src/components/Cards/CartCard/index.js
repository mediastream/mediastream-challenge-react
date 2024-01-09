import './styles.css';
import MovieCard from "../MovieCard";

export default function CartCard({ movie, onIncrement, onDecrement }) {
  return (
    <li className="movies__cart-card">
      <MovieCard movie={movie} />
      <div className="movies__cart-card-quantity">
        <button onClick={() => onDecrement(movie.id)}>
          -
        </button>
        <span>
          {movie.quantity}
        </span>
        <button onClick={() => onIncrement(movie.id)}>
          +
        </button>
      </div>
    </li>
  );
}