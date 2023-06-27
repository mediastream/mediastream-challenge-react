import './styles.css'
import ListCard from '../Cards/ListCard';

export default function MoviesList({ movies, onAddToCart }) {
  return (
    <div className="movies__list">
      <ul>
        {movies.map(movie => (
          <ListCard movie={movie} onAddToCart={onAddToCart} />))}
      </ul>
    </div>
  );
}
