function Movie(props) {
  const { movie } = props;

  return (
    <li key={movie.id} className="movie-library__card">
      <img src={movie.posterUrl} alt={movie.title} />
      <ul>
        <li className="movie-library__movie-title">{movie.title}</li>
        <li>{movie.genres.join(', ')}</li>
        <li>{movie.year}</li>
      </ul>
    </li>
  );
}

export default Movie;
