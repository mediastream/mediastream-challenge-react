import './styles.css';

export default function MoviesList({ movies }) {
  return (
    <ul className="movie-library__list">
      {movies.map(movie => (
        <li key={movie.id} className="movie-library__card" style={{ backgroundImage: `url(${movie.posterUrl})` }}>
          <ul>
            <li><span className="movie-library__card__title">{movie.title}</span></li>
            <li>{movie.genres.join(', ')}</li>
            <li>{movie.year}</li>
          </ul>
        </li>
      ))}
    </ul>
  );
}
