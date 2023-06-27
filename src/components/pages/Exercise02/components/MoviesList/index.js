import Card from '../Card';
import './styles.css';

export default function MoviesList({ movies }) {
  return (
    <div className="movie-library__list__container">
      <ul className="movie-library__list">
        {movies.map(movie => (
          <Card movie={movie} />
        ))}
      </ul>
    </div>
  );
}
